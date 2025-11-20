import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_INSTRUCTION = `
You are Strapped AI, a sophisticated legal AI assistant demo designed for a law firm consultation website.
Your purpose is to demonstrate the capability of AI to summarize complex text and draft simple clauses.
IMPORTANT: You must NEVER provide actual legal advice.
Always append a short disclaimer to your responses stating: "This response is for demonstration purposes only and does not constitute legal advice."
Keep responses professional, concise, and formatted for easy reading (markdown).
Use a tone that is authoritative yet deferential to the attorney user.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers for development
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      console.error('Invalid prompt received:', typeof prompt);
      return res.status(400).json({ error: 'Prompt is required and must be a string' });
    }

    console.log('Processing chat request, prompt length:', prompt.length);

    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini';

    // Enhanced logging for debugging
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
      hasEndpoint: !!endpoint,
      endpoint: endpoint ? endpoint.substring(0, 30) + '...' : 'missing',
      deploymentName
    });

    if (!apiKey || !endpoint) {
      console.error('Azure OpenAI credentials not configured!');
      return res.status(500).json({ 
        error: 'Azure OpenAI credentials not configured. Please set AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT environment variables in Vercel.',
        debug: {
          hasApiKey: !!apiKey,
          hasEndpoint: !!endpoint,
          deploymentName
        }
      });
    }

    // Ensure endpoint doesn't have trailing slash
    const cleanEndpoint = endpoint.replace(/\/$/, '');
    
    // Construct the full API URL
    const apiUrl = `${cleanEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-15-preview`;
    
    console.log('Making request to Azure OpenAI:', apiUrl.substring(0, 50) + '...');

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

    console.log('Azure OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText.substring(0, 500)
      });
      
      // Parse error details if possible
      let errorDetails = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorDetails = errorJson.error?.message || errorJson.message || errorText;
      } catch (e) {
        // Keep original error text
      }
      
      return res.status(response.status).json({ 
        error: `Azure OpenAI API error (${response.status}): ${response.statusText}`,
        details: errorDetails 
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error('No content in Azure response:', data);
      return res.status(500).json({
        error: 'No content received from Azure OpenAI',
        details: 'The API responded successfully but did not return any content.'
      });
    }
    
    console.log('Successfully generated response, length:', content.length);
    return res.status(200).json({ content });
  } catch (error) {
    console.error("Error in chat API:", error);
    return res.status(500).json({ 
      error: "An error occurred while processing your request.",
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
