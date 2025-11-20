# Apex AI - Legal Intelligence Platform

A modern AI-powered legal consultation website with Azure OpenAI integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Azure OpenAI account with deployed model
- Vercel CLI (for local development with API): `npm install -g vercel`

### Setup Steps

1. **Clone and Install**
   ```bash
   cd apex-ai
   npm install
   ```

2. **Configure Azure OpenAI**
   
   Create `.env.local` in the **root directory** (not in apex-ai folder):
   ```bash
   AZURE_OPENAI_API_KEY=your_actual_key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
   ```
   
   See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed Azure setup.

3. **Run Locally**
   ```bash
   cd apex-ai
   npm run dev:vercel
   ```
   
   The site will be available at `http://localhost:3000`
   
   ⚠️ **Important:** Must use `vercel dev` (or `npm run dev:vercel`) for API routes to work locally!

## 📦 Project Structure

```
/workspace/
├── api/                      # Vercel serverless functions
│   └── chat.ts              # Azure OpenAI chat endpoint
├── apex-ai/                 # Frontend application
│   ├── components/          # React components
│   ├── services/           # API service layer
│   └── ...
├── .env.local              # Environment variables (create this)
└── vercel.json             # Vercel configuration
```

## 🚢 Deploy to Production

### Via Vercel Dashboard
1. Push code to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in project settings:
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_DEPLOYMENT_NAME`
4. Deploy!

### Via Vercel CLI
```bash
vercel --prod
```

## 🔧 Troubleshooting

### "Azure OpenAI credentials not configured"
- **Local**: Ensure `.env.local` exists in root directory with correct values
- **Local**: Make sure you're using `vercel dev`, not `npm run dev`
- **Production**: Add environment variables in Vercel dashboard

### API returns 404
- **Local**: Use `npm run dev:vercel` instead of `npm run dev`
- Check that `/api` folder exists at root level

### Chat not responding
- Check browser console for errors
- Verify Azure endpoint URL format: `https://NAME.openai.azure.com` (no trailing slash)
- Verify deployment name matches exactly what's in Azure Portal
- Test Azure credentials directly in Azure Portal

## 📚 Documentation

- [Detailed Setup Instructions](./SETUP_INSTRUCTIONS.md)
- [Frontend README](./apex-ai/README.md)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **AI**: Azure OpenAI
- **Deployment**: Vercel

## 📝 License

See project repository for license information.
