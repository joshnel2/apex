/**
 * Calls the secure serverless API endpoint to generate a legal demo response
 * This keeps API keys secure on the server side
 */
export const generateLegalDemoResponse = async (prompt: string): Promise<string> => {
  try {
    // Call our Vercel serverless function
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Chat API error:', response.status, errorData);
      return "An error occurred while processing your request. Please try again.";
    }

    const data = await response.json();
    return data.content || "I apologize, but I could not generate a response at this time.";
  } catch (error) {
    console.error("Error calling chat API:", error);
    return "An error occurred while processing your request. Please try again.";
  }
};
