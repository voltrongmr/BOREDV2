let barState = 'active'; // active or collapsed

// Function to show overlay by sending a message to the content script
function showOverlay(content) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showOverlay', content });
    });
}

// Function to hide overlay
function hideOverlay() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'hideOverlay' });
    });
}

// Function to toggle the glowing bar state
function toggleBar() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleBar', currentState: barState });
    });
}

// Event listeners for button clicks
document.getElementById('games-btn').addEventListener('click', () => showOverlay('Games'));
document.getElementById('hacks-btn').addEventListener('click', () => showOverlay('Hacks'));
document.getElementById('ai-btn').addEventListener('click', () => showOverlay('AI'));

// Listening for shortcut key commands
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === ';') {
        barState = 'collapsed'; // Update bar state
        toggleBar();
    }
    if (event.ctrlKey && event.key === ':') {
        barState = 'active'; // Update bar state
        toggleBar();
    }
});
