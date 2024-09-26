chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-bar' || command === 'toggle-back') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: toggleBar
      });
    });
  }
});

// Function to toggle the bar visibility state
function toggleBar() {
  const event = new KeyboardEvent('keydown', {
    key: ';',
    ctrlKey: true
  });
  document.dispatchEvent(event);
}
