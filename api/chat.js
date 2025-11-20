"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const SYSTEM_INSTRUCTION = `
You are Strapped AI, a sophisticated legal AI assistant demo designed for a law firm consultation website.
Your purpose is to demonstrate the capability of AI to summarize complex text and draft simple clauses.
IMPORTANT: You must NEVER provide actual legal advice.
Always append a short disclaimer to your responses stating: "This response is for demonstration purposes only and does not constitute legal advice."
Keep responses professional, concise, and formatted for easy reading (markdown).
Use a tone that is authoritative yet deferential to the attorney user.
`;
const DEFAULT_DEPLOYMENT = 'gpt-4o-mini';
const DEFAULT_API_VERSION = '2024-02-15-preview';
const normalizeEndpoint = (endpoint) => {
    const trimmed = endpoint.replace(/\/+$/, '');
    return trimmed.toLowerCase().includes('/openai')
        ? trimmed
        : `${trimmed}/openai`;
};
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const { prompt } = req.body;
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        const apiKey = process.env.AZURE_OPENAI_API_KEY;
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || DEFAULT_DEPLOYMENT;
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION || DEFAULT_API_VERSION;
        if (!apiKey || !endpoint) {
            console.error('Azure OpenAI credentials not configured', {
                hasApiKey: !!apiKey,
                hasEndpoint: !!endpoint,
                endpoint: endpoint ? endpoint.substring(0, 20) + '...' : 'missing'
            });
            return res.status(500).json({
                error: 'Azure OpenAI credentials not configured',
                debug: {
                    hasApiKey: !!apiKey,
                    hasEndpoint: !!endpoint
                }
            });
        }
        const apiUrl = `${normalizeEndpoint(endpoint)}/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
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
                details: errorText,
                endpoint: apiUrl
            });
        }
        const data = await response.json();
        const content = data.choices[0]?.message?.content || "I apologize, but I could not generate a response at this time.";
        return res.status(200).json({ content });
    }
    catch (error) {
        console.error("Error in chat API:", error);
        return res.status(500).json({
            error: "An error occurred while processing your request.",
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
