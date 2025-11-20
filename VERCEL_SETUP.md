# Vercel Environment Variables Setup

## Required Environment Variables

To make the AI chat work on Vercel, you need to set the following environment variables in your Vercel project settings:

### Azure OpenAI Configuration

1. **AZURE_OPENAI_API_KEY** (Required)
   - Your Azure OpenAI API key
   - Example: `1234567890abcdef1234567890abcdef`

2. **AZURE_OPENAI_ENDPOINT** (Required)
   - Your Azure OpenAI endpoint URL
   - Format: `https://YOUR-RESOURCE-NAME.openai.azure.com`
   - Example: `https://my-openai-resource.openai.azure.com`
   - **Important**: Do NOT include a trailing slash

3. **AZURE_OPENAI_DEPLOYMENT_NAME** (Optional)
   - The name of your Azure OpenAI deployment
   - Default: `gpt-4o-mini` (if not specified)
   - Example: `gpt-4` or `gpt-35-turbo` or `gpt-4o-mini`

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Variable name: (e.g., `AZURE_OPENAI_API_KEY`)
   - Value: (your actual key/endpoint)
   - Environment: Select **Production**, **Preview**, and **Development** (all three)
5. Click **Save**
6. **Redeploy your application** for changes to take effect

## How to Get Azure OpenAI Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure OpenAI resource
3. In the left menu, click **Keys and Endpoint**
4. Copy:
   - **KEY 1** or **KEY 2** → Use as `AZURE_OPENAI_API_KEY`
   - **Endpoint** → Use as `AZURE_OPENAI_ENDPOINT`
5. For deployment name, go to **Model deployments** and note the name of your deployment

## Troubleshooting

### Chat returns error about credentials not configured
- Verify all environment variables are set in Vercel
- Make sure you've redeployed after adding the variables
- Check the Vercel function logs for detailed error messages

### Chat returns 404 error
- Ensure the `/api` folder is at the root of your repository
- Check that `chat.ts` is inside the `/api` folder
- Verify your `vercel.json` configuration

### Azure OpenAI API errors
- Verify your Azure OpenAI endpoint URL is correct (no trailing slash)
- Check that your deployment name matches your Azure deployment
- Ensure your Azure OpenAI API key is valid and not expired
- Verify your Azure subscription is active

## Testing Locally

To test the API locally using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Create a .env file in the root directory
cat > .env << EOF
AZURE_OPENAI_API_KEY=your-key-here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
EOF

# Run locally
vercel dev
```

## Checking Logs

To see detailed error messages:
1. Go to Vercel dashboard
2. Select your project
3. Go to **Deployments** → Click on your deployment
4. Click on the **Functions** tab
5. Click on `/api/chat` to view logs

The enhanced error handling will now show:
- Whether environment variables are set
- The exact Azure OpenAI API error messages
- Network connectivity issues
- Detailed stack traces for debugging
