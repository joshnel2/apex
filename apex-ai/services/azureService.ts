/**
 * Calls the secure serverless API endpoint to generate a legal demo response
 * This keeps API keys secure on the server side
 */
export const generateLegalDemoResponse = async (prompt: string): Promise<string> => {
  try {
    console.log('Calling chat API with prompt:', prompt.substring(0, 50) + '...');
    
    // Call our Vercel serverless function - use absolute path for production
    const apiUrl = window.location.origin + '/api/chat';
    console.log('API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Chat API error:', response.status, errorData);
      
      // Provide more helpful error messages
      if (response.status === 500 && errorData.error) {
        if (errorData.error.includes('not configured')) {
          return "⚠️ Error: Azure OpenAI credentials are not configured on the server. Please check your Vercel environment variables:\n- AZURE_OPENAI_API_KEY\n- AZURE_OPENAI_ENDPOINT\n- AZURE_OPENAI_DEPLOYMENT_NAME (optional)";
        }
        if (errorData.details) {
          return `⚠️ API Error: ${errorData.error}\n\nDetails: ${errorData.details}`;
        }
      }
      
      if (response.status === 404) {
        return "⚠️ Error: API endpoint not found. The /api/chat endpoint may not be deployed correctly.";
      }
      
      return `⚠️ An error occurred (Status: ${response.status}). ${errorData.error || 'Please check the browser console for details.'}`;
    }

    const data = await response.json();
    console.log('API response received successfully');
    return data.content || "I apologize, but I could not generate a response at this time.";
  } catch (error) {
    console.error("Error calling chat API:", error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "⚠️ Network error: Unable to connect to the API. Please check your internet connection and ensure the API endpoint is deployed.";
    }
    return `⚠️ An error occurred while processing your request: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`;
  }
};
