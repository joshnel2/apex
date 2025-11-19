<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Strapped AI - Legal Intelligence Platform

This contains everything you need to run your app locally and deploy it to Vercel.

## Environment Variables

You only need **three** environment variables for Azure OpenAI / Azure AI Foundry:

- **`AZURE_OPENAI_API_KEY`** – Your API key (Azure Portal → Keys & Endpoint → Key 1 or Key 2)
- **`AZURE_OPENAI_ENDPOINT`** – Endpoint URL, e.g. `https://your-resource-name.openai.azure.com`
- **`AZURE_OPENAI_DEPLOYMENT_NAME`** – The deployment name you assigned to the model (e.g. `gpt-4o-mini`)

> That’s it. With those three values in place, the chat API will connect to Azure AI Foundry.

**Advanced (optional)**

- `AZURE_OPENAI_API_VERSION` – override the default `2024-08-01-preview` if your resource mandates another version
- `AZURE_OPENAI_CHAT_COMPLETIONS_URL` – supply the fully qualified chat completions URL if you prefer copying the exact Foundry endpoint
- `AZURE_AI_FOUNDRY_*` variants – if your existing environment already uses names like `AZURE_AI_FOUNDRY_API_KEY`, the API will automatically pick them up, so you don’t need duplicates

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
