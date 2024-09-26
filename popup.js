let barState = 'active'; // active or collapsed

document.getElementById('games-btn').addEventListener('click', () => showOverlay('Games'));
document.getElementById('hacks-btn').addEventListener('click', () => showOverlay('Hacks'));
document.getElementById('ai-btn').addEventListener('click', () => showOverlay('AI'));

function showOverlay(content) {
  const overlay = document.getElementById('overlay');
  overlay.textContent = content;
  overlay.classList.remove('hidden');
}

function hideOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('hidden');
}

function toggleBar() {
  const glowBar = document.getElementById('glow-bar');
  if (barState === 'active') {
    glowBar.style.width = '5px';
    glowBar.style.backgroundColor = 'red';
    hideOverlay();
    barState = 'collapsed';
  } else {
    glowBar.style.width = '30px';
    glowBar.style.backgroundColor = 'limegreen';
    barState = 'active';
  }
}

// Listening for shortcut key commands
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === ';') {
    toggleBar();
  }
  if (event.ctrlKey && event.key === ':') {
    toggleBar();
  }
});
