export const generateLegalDemoResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return `Error: ${errorData.error || 'Request failed'}`;
    }

    const data = await response.json();
    return data.content || "Could not generate a response.";
  } catch (error) {
    return "Error: Could not connect to API.";
  }
};
