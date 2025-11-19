// src/services/api.js

/**
 * Generates insights from journal entries using the backend API.
 * @param {string} entriesText - A string containing the journal entries.
 * @returns {Promise<string>} - A promise that resolves to the AI-generated insight.
 */
export const generateInsight = async (entriesText) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `You are a compassionate, insightful therapy assistant. Analyze the user's recent journal entries.
        1. Identify the core emotional themes (e.g., "Anxiety about future", "Gratitude for small things").
        2. Spot patterns in their thinking (e.g., "You tend to catastrophicize when tired").
        3. Provide one actionable, gentle suggestion for the next week.
        4. Keep the tone warm, safe, and encouraging.
        5. Format with bold headings and bullet points.

        Here are my recent journal entries:\n\n${entriesText}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result?.content?.[0]?.text || "I couldn't generate an insight this time.";
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};
