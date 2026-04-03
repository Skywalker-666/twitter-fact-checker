// content.js

// 1. Listen for clicks on the entire document
document.addEventListener('click', async (event) => {
    // 2. Find if the user clicked inside a tweet
    const tweetElement = event.target.closest('article[data-testid="tweet"]');
    
    if (tweetElement) {
        // Prevent multiple checks on the same tweet if already colored
        if (tweetElement.dataset.checked === "true") return;

        const textNode = tweetElement.querySelector('[data-testid="tweetText"]');
        if (!textNode) return;

        const rawText = textNode.innerText;

        // 3. Visual Feedback: Show the user something is happening
        tweetElement.style.opacity = "0.5";
        tweetElement.style.cursor = "wait";

        // 4. Send to background.js
        chrome.runtime.sendMessage({ type: "CHECK_TWEET", text: rawText }, (response) => {
            tweetElement.style.opacity = "1";
            tweetElement.style.cursor = "default";

            if (chrome.runtime.lastError || !response) {
                console.error("Connection lost. Refresh the page.");
                return;
            }

            // 5. Decision Logic: Green for True, Red for False
            applyVerdictUI(tweetElement, textNode, response);
            tweetElement.dataset.checked = "true"; // Mark as processed
        });
    }
});

function applyVerdictUI(container, textNode, data) {
    container.style.transition = "all 0.4s ease";

    if (data.isFalse) {
        // FALSE: Red Background
        container.style.backgroundColor = "rgba(255, 0, 0, 0.15)";
        container.style.borderLeft = "8px solid #ff0000";
        
        // Highlight the specific error
        const regex = new RegExp(`(${escapeRegExp(data.errorPart)})`, "gi");
        textNode.innerHTML = textNode.innerHTML.replace(regex, `<span class="fact-false">$1</span>`);
    } else {
        // TRUE: Green Background
        container.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        container.style.borderLeft = "8px solid #00ba7c";
        
        // Add a small "Verified" checkmark
        const check = document.createElement('span');
        check.innerHTML = " ✅ Verified True";
        check.style.color = "#00ba7c";
        check.style.fontWeight = "bold";
        textNode.appendChild(check);
    }
}

function escapeRegExp(string) {
    return string ? string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : "";
}