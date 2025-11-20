# Setup Instructions for Strapped AI Chat

## Environment Variables Required

The chat AI requires 3 Azure OpenAI environment variables to function:

### 1. AZURE_OPENAI_API_KEY
- Your Azure OpenAI API key
- Get from: Azure Portal → Your Resource → Keys and Endpoint
- Example: `abc123def456...`

### 2. AZURE_OPENAI_ENDPOINT
- Your Azure OpenAI endpoint URL
- Format: `https://your-resource-name.openai.azure.com`
- Example: `https://mycompany-openai.openai.azure.com`

### 3. AZURE_OPENAI_DEPLOYMENT_NAME
- The deployment name you created in Azure
- Common values: `gpt-4`, `gpt-35-turbo`, `gpt-4o-mini`, `gpt-4-turbo`
- Example: `gpt-4o-mini`

## Setup for Different Environments

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add all three variables:
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_DEPLOYMENT_NAME`
4. Redeploy your application

### For Local Development

1. Copy `.env.local` to your project root (already created)
2. Fill in your actual Azure OpenAI credentials
3. Run `npm run dev` in the `apex-ai` directory
4. The API endpoint at `/api/chat` will use these values

## Testing the Chat

After setting up the environment variables:

1. Navigate to the Demo section on your website
2. Try one of the sample prompts or enter your own query
3. The AI should respond within 2-5 seconds
4. Check browser console for any error messages if it doesn't work

## Troubleshooting

### Error: "Azure OpenAI credentials not configured"
- Environment variables are not set in Vercel
- Solution: Set all 3 variables in Vercel dashboard and redeploy

### Error: "404 Not Found" when calling /api/chat
- Vercel serverless function is not deploying correctly
- Solution: Check Vercel build logs

### Error: "Invalid deployment name"
- The deployment name doesn't match what's in Azure
- Solution: Verify the exact deployment name in Azure Portal

### Chat shows "An error occurred"
- Check browser console for detailed error message
- Verify all 3 environment variables are correct
- Test your Azure OpenAI credentials directly using curl:
  ```bash
  curl https://YOUR-ENDPOINT.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT/chat/completions?api-version=2024-02-15-preview \
    -H "Content-Type: application/json" \
    -H "api-key: YOUR-API-KEY" \
    -d '{"messages":[{"role":"user","content":"Hello"}]}'
  ```

## Current Architecture

```
User Input → Demo.tsx → azureService.ts → /api/chat.ts → Azure OpenAI API → Response
```

The `/api/chat.ts` serverless function:
- Keeps API keys secure on the backend
- Adds system instructions for legal AI persona
- Handles errors and provides detailed logging
- Returns formatted responses to the frontend

## Git Branch Status Note

⚠️ **Important**: The main branch is currently at commit `095a017`, not `99644c0`.
- Current HEAD is detached at `99644c0`
- To align with main: `git checkout main`
- To stay on 99644c0: `git checkout -b feature-branch 99644c0`
