let barVisible = true;
let overlayVisible = false;
let bar = document.createElement('div');

// Create the glowing green bar
bar.style.position = 'fixed';
bar.style.right = '20px';
bar.style.top = '10px';
bar.style.width = '30px';
bar.style.height = '5px';
bar.style.backgroundColor = 'green';
bar.style.boxShadow = '0px 0px 10px 2px green';
bar.style.transition = 'all 0.3s ease';
bar.style.cursor = 'pointer';
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

// Create the overlays
let gamesOverlay = createOverlay('Games');
let hacksOverlay = createOverlay('Hacks');
let aiOverlay = createOverlay('AI');

function createOverlay(content) {
  let overlay = document.createElement('div');
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.zIndex = '9999';
  overlay.style.color = '#fff';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `<h1>${content} Overlay</h1>`;
  document.body.appendChild(overlay);
  return overlay;
}

// Handle bar hover for dropdown menu
bar.addEventListener('mouseover', () => {
  if (barVisible && !overlayVisible) {
    menu.style.display = 'block';
  }
});

bar.addEventListener('mouseout', () => {
  menu.style.display = 'none';
});

// Add functionality to buttons
document.getElementById('gamesBtn').addEventListener('click', () => showOverlay(gamesOverlay));
document.getElementById('hacksBtn').addEventListener('click', () => showOverlay(hacksOverlay));
document.getElementById('aiBtn').addEventListener('click', () => showOverlay(aiOverlay));

function showOverlay(overlay) {
  gamesOverlay.style.display = 'none';
  hacksOverlay.style.display = 'none';
  aiOverlay.style.display = 'none';
  overlay.style.display = 'flex';
  overlayVisible = true;
}

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === ';') {
    // Shrink the bar and hide overlays
    bar.style.width = '5px';
    bar.style.backgroundColor = 'red';
    gamesOverlay.style.display = 'none';
    hacksOverlay.style.display = 'none';
    aiOverlay.style.display = 'none';
    overlayVisible = false;
    barVisible = false;
  } else if (e.ctrlKey && e.key === ':') {
    // Expand the bar and re-enable dropdown
    bar.style.width = '30px';
    bar.style.backgroundColor = 'green';
    barVisible = true;
  }
});

