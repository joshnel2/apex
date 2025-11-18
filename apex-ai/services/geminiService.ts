import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Apex AI, a sophisticated legal AI assistant demo designed for a law firm consultation website.
Your purpose is to demonstrate the capability of AI to summarize complex text and draft simple clauses.
IMPORTANT: You must NEVER provide actual legal advice.
Always append a short disclaimer to your responses stating: "This response is for demonstration purposes only and does not constitute legal advice."
Keep responses professional, concise, and formatted for easy reading (markdown).
Use a tone that is authoritative yet deferential to the attorney user.
`;

export const generateLegalDemoResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Low temperature for more deterministic, professional responses
      }
    });

    return response.text || "I apologize, but I could not generate a response at this time.";
  } catch (error) {
    console.error("Error interacting with Gemini API:", error);
    return "An error occurred while processing your request. Please try again.";
  }
};