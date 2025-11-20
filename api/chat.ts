import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_INSTRUCTION = `
You are Strapped AI, a sophisticated legal AI assistant demo designed for a law firm consultation website.
Your purpose is to demonstrate the capability of AI to summarize complex text and draft simple clauses.
IMPORTANT: You must NEVER provide actual legal advice.
Always append a short disclaimer to your responses stating: "This response is for demonstration purposes only and does not constitute legal advice."
Keep responses professional, concise, and formatted for easy reading (markdown).
Use a tone that is authoritative yet deferential to the attorney user.
`;

const REQUIRED_ENV = {
  apiKeyName: 'AZURE_OPENAI_API_KEY',
  endpointName: 'AZURE_OPENAI_ENDPOINT',
  deploymentName: 'AZURE_OPENAI_DEPLOYMENT_NAME',
} as const;

const DEFAULT_API_VERSION = '2024-08-01-preview';

const getRequiredEnv = (name: keyof typeof REQUIRED_ENV) => {
  const envName = REQUIRED_ENV[name];
  const value = process.env[envName];
  if (!value) {
    throw new Error(`Missing required environment variable: ${envName}`);
  }
  return value.trim();
};

const getOptionalEnv = (name: string) => process.env[name]?.trim();

const appendApiVersion = (url: string, apiVersion: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}api-version=${apiVersion}`;
};

const buildChatUrl = (endpoint: string, deployment: string, apiVersion: string, directUrl?: string) => {
  if (directUrl) {
    return appendApiVersion(directUrl.replace(/\s/g, ''), apiVersion);
  }

  const normalizedEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  const hasDeploymentPath = /\/openai\/deployments\//i.test(normalizedEndpoint);
  const basePath = hasDeploymentPath
    ? normalizedEndpoint
    : `${normalizedEndpoint}/openai/deployments/${deployment}`;

  const hasChatPath = /\/chat\/completions$/i.test(basePath);
  const chatPath = hasChatPath ? basePath : `${basePath}/chat/completions`;

  return appendApiVersion(chatPath, apiVersion);
};

const parseBody = async (req: VercelRequest) => {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    if (Buffer.isBuffer(req.body)) {
      try {
        return JSON.parse(req.body.toString());
      } catch {
        return {};
      }
    }
    return req.body;
  }

  return new Promise<Record<string, unknown>>((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
      const body = await parseBody(req);
      const prompt = typeof body?.prompt === 'string' ? body.prompt : undefined;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = getRequiredEnv('apiKeyName');
    const endpoint = getRequiredEnv('endpointName');
    const deploymentName = getRequiredEnv('deploymentName');

    const apiVersion = getOptionalEnv('AZURE_OPENAI_API_VERSION') || DEFAULT_API_VERSION;
    const directChatUrl = getOptionalEnv('AZURE_OPENAI_CHAT_COMPLETIONS_URL');

    const apiUrl = buildChatUrl(endpoint, deploymentName, apiVersion, directChatUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: SYSTEM_INSTRUCTION,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Azure OpenAI API error:', response.status, errorText);
        return res.status(response.status).json({ 
          error: `Azure OpenAI API error: ${response.status}`,
          details: errorText 
        });
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || "I apologize, but I could not generate a response at this time.";
      
      return res.status(200).json({ content });
    } catch (error) {
      console.error("Error in chat API:", error);
      return res.status(500).json({ 
        error: "An error occurred while processing your request.",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
