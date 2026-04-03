# twitter-fact-checker

🛡️ Gemini Twitter Fact-Checker
An AI-powered Chrome Extension that brings real-time factual verification to your X (formerly Twitter) feed. Built with Google Gemini 3 Flash, this tool allows users to verify claims with a single click, providing instant visual feedback and contextual explanations.

✨ Features
On-Demand Verification: Save API credits and reduce noise by only checking tweets you are curious about. Just click any tweet to verify.

Gemini 3 Flash Integration: Leverages the latest multimodal AI to understand context, identify sarcasm, and cross-reference facts.

Visual Verdicts: * 🟩 Green Background: The claim is factually accurate.

🟥 Red Background: The claim is false or misleading.

Detailed Explanations: Hover over highlighted errors to see a brief reasoning provided by the AI.

Privacy-Focused: Only processes the specific tweet you interact with.

🚀 Getting Started
1. Prerequisites
A Chromium-based browser (Google Chrome, Brave, Microsoft Edge).

A Gemini API Key from Google AI Studio.

2. Installation (Developer Mode)
Since this extension is in development, follow these steps to load it:

Download/Clone this repository to your local machine.

Open Chrome and navigate to chrome://extensions/.

Enable "Developer mode" using the toggle in the top-right corner.

Click "Load unpacked".

Select the folder containing the project files (where manifest.json is located).

3. Setup your API Key
Open background.js in a text editor.

Replace 'YOUR_ACTUAL_API_KEY_HERE' with your secret key from Google AI Studio.

Go back to chrome://extensions/ and click the Refresh icon on the extension card.

🛠️ How to Use
Navigate to x.com.

Find a tweet containing a factual claim.

Click anywhere inside the tweet.

The tweet will dim slightly while the AI processes the text.

View the result! A green border confirms the truth, while a red border and yellow highlights indicate an error.

🏗️ Technical Architecture
The extension is built using Chrome Manifest V3 and follows a modular structure:

manifest.json: Defines permissions and script entry points.

content.js: Manages the Twitter DOM, listens for click events, and updates the UI based on AI responses.

background.js: Handles the secure communication with the Gemini API and manages result caching.

style.css: Provides the "Red Alert" and "Verified" styling for the injected elements.

⚖️ Disclaimer
This tool is intended for educational purposes. While Gemini 3 Flash is highly advanced, AI can occasionally produce inaccuracies (hallucinations). Always cross-reference critical information with primary sources.

🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you want to add features like:

Multimodal (Image) fact-checking.

Support for other social media platforms.

Customizable highlighting colors.
