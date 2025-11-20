# Setup Instructions for Apex AI Chat

## Azure OpenAI Configuration

The chat functionality requires Azure OpenAI credentials. You need to configure three environment variables.

### Step 1: Get Your Azure OpenAI Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure OpenAI resource
3. Go to "Keys and Endpoint" section
4. Copy:
   - **Endpoint** (format: `https://your-resource-name.openai.azure.com`)
   - **API Key** (Key 1 or Key 2)
5. Note your **Deployment Name** (the name you gave when deploying a model like GPT-4)

### Step 2: Local Development

1. Copy `.env.local.example` to `.env.local` in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your actual values (in the **root directory**, not in apex-ai):
   ```
   AZURE_OPENAI_API_KEY=your_actual_api_key
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
   ```
   
   ⚠️ **Important:** The `.env.local` file must be in the root directory (`/workspace/.env.local`), NOT in the `apex-ai` folder, because the serverless API function needs to access these variables.

3. Install Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

4. Run the development server using Vercel CLI (NOT npm run dev):
   ```bash
   cd apex-ai
   npm run dev:vercel
   ```
   
   Or directly:
   ```bash
   vercel dev
   ```
   
   This will:
   - Build and serve your frontend
   - Run the API serverless functions locally
   - Load your `.env.local` variables

### Step 3: Production Deployment (Vercel)

1. Push your code to GitHub/GitLab/Bitbucket

2. Import the project in [Vercel Dashboard](https://vercel.com/dashboard)

3. Go to your project Settings → Environment Variables

4. Add these three variables:
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_DEPLOYMENT_NAME`

5. Redeploy your application

## Troubleshooting

### Chat shows "Azure OpenAI credentials not configured"
- **Local**: Make sure `.env.local` exists with correct values and you're using `vercel dev`
- **Production**: Check that environment variables are set in Vercel dashboard

### API returns 404
- **Local**: Use `vercel dev` instead of `npm run dev`
- **Production**: Ensure `/api` folder is at the root level

### Connection timeout
- Verify your Azure OpenAI endpoint URL is correct
- Check that your deployment name matches exactly what's in Azure Portal
- Ensure your API key is valid and not expired

## Testing the Chat

Once configured, visit the demo section and try these example prompts:
- "Draft a standard confidentiality clause for an NDA involving trade secrets."
- "Explain the concept of Force Majeure in commercial real estate leases."
- "Summarize the key elements of GDPR compliance for a US tech company."
