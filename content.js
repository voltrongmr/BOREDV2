// Create the glowing green bar
let bar = document.createElement('div');
bar.id = 'glowBar';
bar.style.position = 'fixed';
bar.style.right = '20px';
bar.style.top = '10px';
bar.style.width = '30px';
bar.style.height = '5px';
bar.style.backgroundColor = 'green';
bar.style.boxShadow = '0px 0px 10px 2px green';
bar.style.transition = 'all 0.3s ease';
bar.style.cursor = 'pointer';
bar.style.zIndex = '10000';  // Ensure it appears on top
document.body.appendChild(bar);

// Create the dropdown menu
let menu = document.createElement('div');
menu.style.display = 'none';  // Initially hidden
menu.style.position = 'absolute';
menu.style.right = '0';
menu.style.top = '20px';
menu.style.backgroundColor = '#fff';
menu.style.border = '1px solid #ccc';
menu.style.padding = '10px';
menu.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
menu.innerHTML = `
  <button id="gamesBtn">Games</button>
  <button id="hacksBtn">Hacks</button>
  <button id="aiBtn">AI</button>
`;
bar.appendChild(menu);

// Create overlays for each button (initially hidden)
let overlays = {
  Games: createOverlay('Games Overlay'),
  Hacks: createOverlay('Hacks Overlay'),
  AI: createOverlay('AI Overlay')
};

// Function to create an overlay
function createOverlay(content) {
  let overlay = document.createElement('div');
  overlay.style.display = 'none';  // Initially hidden
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.color = '#fff';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';  // Ensure it appears on top
  overlay.innerHTML = `<h1>${content}</h1><button class="closeOverlay">Close</button>`;
  document.body.appendChild(overlay);

  // Add close button functionality
  overlay.querySelector('.closeOverlay').onclick = function() {
    overlay.style.display = 'none';
  };

  return overlay;
}

// Function to show overlay
function showOverlay(overlay) {
  for (let key in overlays) {
    overlays[key].style.display = 'none';  
  }
  overlay.style.display = 'flex';  
}

// Message listener to show, hide, or toggle overlay and bar
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showOverlay') {
    showOverlay(overlays[request.content]);
  } else if (request.action === 'hideOverlay') {
    for (let key in overlays) {
      overlays[key].style.display = 'none';  
    }
  } else if (request.action === 'toggleBar') {
    const glowBar = document.getElementById('glowBar');
    
    if (request.currentState === 'active') {
      glowBar.style.width = '5px';
      glowBar.style.backgroundColor = 'red';
      // Hide the menu when collapsing the bar
      menu.style.display = 'none';
    } else {
      glowBar.style.width = '30px';
      glowBar.style.backgroundColor = 'green';
    }
  }
});

// Keep the dropdown open while hovering
bar.addEventListener('mouseover', () => {
  menu.style.display = 'block';
});

bar.addEventListener('mouseout', () => {
  menu.style.display = 'none';
});

// Prevent menu from disappearing when hovering over it
menu.addEventListener('mouseover', () => {
  menu.style.display = 'block';
});

menu.addEventListener('mouseout', () => {
  menu.style.display = 'none';
});

// Button functionality
document.getElementById('gamesBtn').onclick = () => showOverlay(overlays.Games);
document.getElementById('hacksBtn').onclick = () => showOverlay(overlays.Hacks);
document.getElementById('aiBtn').onclick = () => showOverlay(overlays.AI);
