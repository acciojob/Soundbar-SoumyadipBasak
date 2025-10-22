//your JS code here. If required.
// List of sound files present in the "sounds" directory.
// Update these names to match your actual files (e.g., "sound1.mp3", "sound2.mp3", etc.)
const soundFiles = [
  { name: "applause", file: "sounds/applause.mp3" },
  { name: "boo", file: "sounds/boo.mp3" },
  { name: "gasp",  file: "sounds/gasp.mp3" },
  { name: "ta-da", file: "sounds/tada.mp3" },
  { name: "victory", file: "sounds/victory.mp3" },
  { name: "wrong", file: "sounds/wrong.mp3" },
  { name: "stop", file: "sounds/stop.mp3" } // optional extra; you can omit if not needed
];

// Create a single Audio element to manage playback.
let currentAudio = null;

// Initialize the UI: create a button for each sound
function initButtons() {
  const container = document.getElementById("buttons");
  if (!container) return;

  // Create a button for each sound in the list
  soundFiles.forEach((s) => {
    // Skip if file path is not defined
    if (!s.file) return;

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = s.name;
    btn.dataset.sound = s.file;

    // On click, play the corresponding sound
    btn.addEventListener("click", () => playSound(s.file));
    container.appendChild(btn);
  });
}

// Play a specific sound. If another is playing, stop it first.
function playSound(file) {
  // Stop any current playback
  stopAll();

  // Create a new Audio object for this file
  currentAudio = new Audio(file);
  currentAudio.volume = 1.0;

  currentAudio.addEventListener("ended", () => {
    // Cleanup when finished
    currentAudio = null;
  });

  currentAudio.play().catch((err) => {
    // Handle autoplay restrictions or errors
    console.error("Playback failed:", err);
  });
}

// Stop playback of the current audio
function stopAll() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// Wire up the Stop button
function initStopButton() {
  const stopBtn = document.getElementById("stopBtn");
  if (stopBtn) {
    stopBtn.addEventListener("click", stopAll);
  }
}

// Initialize everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initButtons();
  initStopButton();
});
