<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Strapped AI - Legal Intelligence Platform

This contains everything you need to run your app locally and deploy it to Vercel.

## Environment Variables

You need the following environment variables for Azure OpenAI / Azure AI Foundry:

### Required:
- **`AZURE_OPENAI_API_KEY`** - Your Azure OpenAI API key
  - Get this from: Azure Portal > Your Resource > Keys and Endpoint > Key 1 or Key 2
  
- **`AZURE_OPENAI_ENDPOINT`** - Your Azure OpenAI endpoint URL
  - Format: `https://your-resource-name.openai.azure.com`
  - Get this from: Azure Portal > Your Resource > Keys and Endpoint

### Optional (recommended when using Azure AI Foundry project endpoints):
- **`AZURE_OPENAI_DEPLOYMENT_NAME`** - Your deployment name (defaults to `gpt-4`)
  - This is the name you gave your model deployment in Azure
  - Common values: `gpt-4`, `gpt-35-turbo`, `gpt-4-turbo`
- **`AZURE_OPENAI_API_VERSION`** - Override the API version if your resource requires a newer preview version (defaults to `2024-08-01-preview`)
- **`AZURE_OPENAI_CHAT_COMPLETIONS_URL`** - (Optional) Supply the *full* chat completions URL if you copied it from Azure AI Foundry and it already includes the deployment path. When set, this takes precedence over the endpoint/deployment combo.

> **Azure AI Foundry naming:** If your environment already uses the `AZURE_AI_FOUNDRY_*` variables, you don’t need to rename them.  
> The serverless function now automatically falls back to `AZURE_AI_FOUNDRY_API_KEY`, `AZURE_AI_FOUNDRY_ENDPOINT`, `AZURE_AI_FOUNDRY_DEPLOYMENT_NAME`, and `AZURE_AI_FOUNDRY_API_VERSION`.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the `apex-ai` directory:
   ```bash
   AZURE_OPENAI_API_KEY=your_api_key_here
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
   ```

3. For local development with API routes, use Vercel CLI:
   ```bash
   npm install -g vercel
   vercel dev
   ```
   
   Or run the dev server (API won't work locally without Vercel CLI):
   ```bash
   npm run dev
   ```

## Deploy to Vercel

This project is configured for easy deployment to Vercel.

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
   - `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint (e.g., `https://your-resource-name.openai.azure.com`)
   - `AZURE_OPENAI_DEPLOYMENT_NAME`: Your deployment name (optional, defaults to `gpt-4`)

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in project settings:
   - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
   - `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint
   - `AZURE_OPENAI_DEPLOYMENT_NAME`: Your deployment name (optional, defaults to `gpt-4`)
4. Deploy!

## Setting Up Azure OpenAI

1. **Create an Azure OpenAI resource:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Create a new "Azure OpenAI" resource
   - Choose your subscription and resource group

2. **Deploy a model:**
   - Go to your Azure OpenAI resource
   - Navigate to "Model deployments"
   - Click "Create" and deploy a model (e.g., GPT-4, GPT-3.5 Turbo)
   - Note the deployment name you give it

3. **Get your credentials:**
   - Go to "Keys and Endpoint" in your Azure OpenAI resource
   - Copy Key 1 or Key 2 (this is your `AZURE_OPENAI_API_KEY`)
   - Copy the Endpoint URL (this is your `AZURE_OPENAI_ENDPOINT`)
   - Note your deployment name (this is your `AZURE_OPENAI_DEPLOYMENT_NAME`)

## Project Features

The project is pre-configured with:
- ✅ SPA routing support (all routes serve `index.html`)
- ✅ Optimized build output (`dist/` directory)
- ✅ Asset caching headers for better performance
- ✅ Vite framework detection
- ✅ Secure serverless API routes (API keys never exposed to client)
- ✅ Microsoft Azure OpenAI integration
