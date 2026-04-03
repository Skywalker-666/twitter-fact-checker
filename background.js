// 1. Setup with your specific model from AI Studio
const GEMINI_API_KEY = 'Your API key'; //Add your API key here
const MODEL_NAME = 'gemini-3-flash-preview'; // Updated to match your code

// The 2026 Standard REST Endpoint
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CHECK_TWEET") {
    verifyWithGemini(request.text).then(sendResponse);
    return true; 
  }
});

async function verifyWithGemini(tweetText) {
  // We keep the prompt strict so it returns clean JSON
const prompt = `Analyze this tweet: "${tweetText}".
Is this tweet factually accurate? 
If it is TRUE, return: {"isFalse": false, "explanation": "Correct"}
If it is FALSE, return: {"isFalse": true, "errorPart": "the exact false phrase", "explanation": "why its wrong"}
Return ONLY JSON.`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: prompt }] 
        }],
        // Note: 'thinking_config' is for advanced reasoning, 
        // for a fast Chrome Extension, we keep it simple.
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error:", errorBody);
      return { isFalse: false };
    }

    const data = await response.json();
    
    // Defensive parsing for the new model output
    let resultText = data.candidates[0].content.parts[0].text;
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { isFalse: false };

  } catch (error) {
    console.error("Fact-Check Error:", error);
    return { isFalse: false };
  }
}
