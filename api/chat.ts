import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_INSTRUCTION = `
You are Strapped AI, a sophisticated legal AI assistant demo designed for a law firm consultation website.
Your purpose is to demonstrate the capability of AI to summarize complex text and draft simple clauses.
IMPORTANT: You must NEVER provide actual legal advice.
Always append a short disclaimer to your responses stating: "This response is for demonstration purposes only and does not constitute legal advice."
Keep responses professional, concise, and formatted for easy reading (markdown).
Use a tone that is authoritative yet deferential to the attorney user.
`;

const getEnv = (...keys: (keyof NodeJS.ProcessEnv)[]) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  return undefined;
};

const appendApiVersion = (url: string, apiVersion: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}api-version=${apiVersion}`;
};

const buildAzureChatUrl = (options: { endpoint?: string; deployment: string; apiVersion: string; directUrl?: string }) => {
  if (options.directUrl) {
    return appendApiVersion(options.directUrl.replace(/\s/g, ''), options.apiVersion);
  }

  const endpoint = options.endpoint?.trim();
  if (!endpoint) {
    return undefined;
  }

  const normalizedEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  const hasDeploymentPath = /\/openai\/deployments\//i.test(normalizedEndpoint);
  const baseUrl = hasDeploymentPath
    ? normalizedEndpoint
    : `${normalizedEndpoint}/openai/deployments/${options.deployment}/chat/completions`;

  return appendApiVersion(baseUrl, options.apiVersion);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = getEnv(
      'AZURE_OPENAI_API_KEY',
      'AZURE_OPENAI_KEY',
      'AZURE_AI_FOUNDRY_API_KEY',
      'AZURE_AI_FOUNDRY_KEY',
      'AZURE_AI_API_KEY'
    );
    const endpoint = getEnv(
      'AZURE_OPENAI_ENDPOINT',
      'AZURE_AI_FOUNDRY_ENDPOINT',
      'AZURE_AI_ENDPOINT'
    );
    const deploymentName =
      getEnv(
        'AZURE_OPENAI_DEPLOYMENT_NAME',
        'AZURE_OPENAI_CHAT_DEPLOYMENT',
        'AZURE_AI_FOUNDRY_DEPLOYMENT_NAME',
        'AZURE_AI_DEPLOYMENT_NAME'
      ) || 'gpt-4o-mini';

    const apiVersion =
      getEnv(
        'AZURE_OPENAI_API_VERSION',
        'AZURE_AI_FOUNDRY_API_VERSION'
      ) || '2024-08-01-preview';

    const directChatUrl = getEnv(
      'AZURE_OPENAI_CHAT_COMPLETIONS_URL',
      'AZURE_AI_FOUNDRY_CHAT_URL',
      'AZURE_AI_CHAT_COMPLETIONS_URL'
    );

    const apiUrl = buildAzureChatUrl({
      endpoint,
      deployment: deploymentName,
      apiVersion,
      directUrl: directChatUrl
    });

    if (!apiKey || !apiUrl) {
      console.error('Azure AI configuration issue', {
        hasApiKey: !!apiKey,
        hasEndpoint: !!endpoint,
        hasDirectUrl: !!directChatUrl,
        deploymentName,
        apiVersion
      });
      return res.status(500).json({
        error: 'Azure AI credentials not configured',
        details: 'Please confirm API key, endpoint (or direct chat URL), and deployment name environment variables.'
      });
    }

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
