<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Strapped AI - Legal Intelligence Platform

This contains everything you need to run your app locally and deploy it to Vercel.

## Environment Variables

You need the following environment variables:

### Required for Demo Chat:
- **`AZURE_OPENAI_API_KEY`** - Your Azure OpenAI API key
  - Get this from: Azure Portal > Your Resource > Keys and Endpoint > Key 1 or Key 2
  
- **`AZURE_OPENAI_ENDPOINT`** - Your Azure OpenAI endpoint URL
  - Format: `https://your-resource-name.openai.azure.com`
  - Get this from: Azure Portal > Your Resource > Keys and Endpoint

### Required for Contact Form:
- **`RESEND_API_KEY`** - Your Resend API key for sending contact form emails
  - Sign up at: [resend.com](https://resend.com)
  - Get your API key from: Resend Dashboard > API Keys
  - Form submissions will be sent to: **admin@strappedai.com**
  - Note: You'll need to verify your domain in Resend or use their testing domain

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
   RESEND_API_KEY=your_resend_api_key_here
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
   - `RESEND_API_KEY`: Your Resend API key for contact form emails

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in project settings:
   - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
   - `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint
   - `AZURE_OPENAI_DEPLOYMENT_NAME`: Your deployment name (optional, defaults to `gpt-4`)
   - `RESEND_API_KEY`: Your Resend API key for contact form emails
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

## Setting Up Resend (Contact Form Emails)

1. **Create a Resend account:**
   - Go to [resend.com](https://resend.com) and sign up
   - Verify your email address

2. **Get your API key:**
   - Navigate to "API Keys" in the Resend dashboard
   - Click "Create API Key"
   - Copy the API key (this is your `RESEND_API_KEY`)
   - Store it securely - you won't be able to see it again

3. **Domain setup (for production):**
   - To send emails from your domain (e.g., noreply@strappedai.com), you need to verify your domain
   - Go to "Domains" in Resend dashboard
   - Add your domain (strappedai.com)
   - Add the DNS records provided by Resend to your DNS provider
   - Wait for verification (usually takes a few minutes)
   
4. **For testing:**
   - Resend provides a testing domain `onboarding@resend.dev` that works immediately
   - You can use this for development and testing
   - Production should use your verified domain

5. **Email delivery:**
   - All contact form submissions will be sent to: **admin@strappedai.com**
   - Make sure this email address is valid and monitored
   - The email includes all form details: firm name, contact name, email, interest, and message

## Project Features

The project is pre-configured with:
- ✅ SPA routing support (all routes serve `index.html`)
- ✅ Optimized build output (`dist/` directory)
- ✅ Asset caching headers for better performance
- ✅ Vite framework detection
- ✅ Secure serverless API routes (API keys never exposed to client)
- ✅ Microsoft Azure OpenAI integration
