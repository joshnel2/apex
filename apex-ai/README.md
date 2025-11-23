<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Strapped AI - Enterprise AI Products for Law Firms

**Enterprise AI at a Fraction of the Cost**

We provide law firms with direct access to Microsoft Azure enterprise AI through four powerful products:
- **Firm-Wide LLM** - Private language model deployment
- **Redline Tool** - Automated document comparison
- **Document Analyzer** - Process thousands of pages instantly
- **Research AI** - Law library integration with AI analysis

**Pricing:** $3,000 installation + monthly maintenance based on firm size
**Integration:** 1 day

This contains everything you need to run your app locally and deploy it to Vercel.

## Environment Variables

You need the following environment variables:

### Required:
- **`AZURE_OPENAI_API_KEY`** - Your Azure OpenAI API key
  - Get this from: Azure Portal > Your Resource > Keys and Endpoint > Key 1 or Key 2
  
- **`AZURE_OPENAI_ENDPOINT`** - Your Azure OpenAI endpoint URL
  - Format: `https://your-resource-name.openai.azure.com`
  - Get this from: Azure Portal > Your Resource > Keys and Endpoint

### Optional:
- **`AZURE_OPENAI_DEPLOYMENT_NAME`** - Your deployment name (defaults to `gpt-4`)
  - This is the name you gave your model deployment in Azure
  - Common values: `gpt-4`, `gpt-35-turbo`, `gpt-4-turbo`

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

## Contact Form

The contact form uses Google Forms for submissions:
- The "Contact" section includes a button that opens the consultation request form in a new window
- Form submissions are automatically collected in Google Sheets
- No additional setup required - the form link is configured in the code

## Project Features

The project is pre-configured with:
- ✅ SPA routing support (all routes serve `index.html`)
- ✅ Optimized build output (`dist/` directory)
- ✅ Asset caching headers for better performance
- ✅ Vite framework detection
- ✅ Secure serverless API routes (API keys never exposed to client)
- ✅ Microsoft Azure OpenAI integration
- ✅ Google Forms integration for contact submissions
