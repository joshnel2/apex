<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it to Vercel.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

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
   - `GEMINI_API_KEY`: Your Gemini API key

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variable `GEMINI_API_KEY` in project settings
4. Deploy!

The project is pre-configured with:
- ✅ SPA routing support (all routes serve `index.html`)
- ✅ Optimized build output (`dist/` directory)
- ✅ Asset caching headers for better performance
- ✅ Vite framework detection
