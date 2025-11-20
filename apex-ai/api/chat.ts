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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini';

    if (!apiKey || !endpoint) {
      return res.status(500).json({ error: 'Azure OpenAI not configured' });
    }

    const apiUrl = `${endpoint.replace(/\/$/, '')}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-15-preview`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Azure API error', details: errorText });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Could not generate response.";
    
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Request failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
