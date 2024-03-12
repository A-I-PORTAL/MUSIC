// Initialize Tone.js
const synth = new Tone.Synth().toDestination();

// Create an array of sound configurations
const sounds = [
  { note: 'C4', duration: '8n' },
  { note: 'E4', duration: '8n' },
  { note: 'G4', duration: '8n' },
  // Add more sound configurations as needed
];

// Default sound parameters
let soundParameters = {
  volume: 0.5,
  attack: 0.2,
  // Add more parameters as needed
};

// Get the game board element
const gameBoard = document.getElementById('gameBoard');

// Add event listeners for touch/click events
gameBoard.addEventListener('touchstart', handleTouchStart, false);
gameBoard.addEventListener('touchmove', handleTouchMove, false);
gameBoard.addEventListener('touchend', handleTouchEnd, false);
gameBoard.addEventListener('click', handleClick, false);

// Event handler functions
function handleTouchStart(event) {
  event.preventDefault();
  handleTouch(event.touches, event.type);
}

function handleTouchMove(event) {
  event.preventDefault();
  handleTouch(event.touches, event.type);
}

function handleTouchEnd(event) {
  event.preventDefault();
  // Add any additional logic for touch end events
}

function handleClick(event) {
  const touch = { clientX: event.clientX, clientY: event.clientY };
  handleTouch([touch], event.type);
}

function handleTouch(touches, eventType) {
  touches.forEach(touch => {
    const rect = gameBoard.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Trigger sound and animation based on touch coordinates
    triggerSoundAndAnimation(x, y, eventType);
  });
}

function triggerSoundAndAnimation(x, y, eventType) {
  const soundIndex = Math.floor(Math.random() * sounds.length);
  const { note, duration } = sounds[soundIndex];

  // Apply sound parameters
  synth.set(soundParameters);

  synth.triggerAttackRelease(note, duration);

  // Create a new div element with the ripple animation
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  ripple.style.left = `${x - 50}px`; // Adjust position to center the animation
  ripple.style.top = `${y - 50}px`;
  gameBoard.appendChild(ripple);

  // Create a new div element with the current animation
  const current = document.createElement('div');
  current.classList.add('current');
  current.style.left = `${x - 100}px`; // Adjust position to center the animation
  current.style.top = `${y - 100}px`;
  gameBoard.appendChild(current);

  // Remove the ripple and current elements after the animations end
  setTimeout(() => {
    ripple.remove();
    current.remove();
  }, 2000); // Adjust the duration as needed

  // Additional logic based on event type
  if (eventType === 'touchmove') {
    // Handle touch move event (e.g., drag animation)
  }
}

// Reset button functionality
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);

function resetGame() {
  // Stop all sound sources
  synth.triggerRelease();

  // Reset sound parameters to default values
  soundParameters = {
    volume: 0.5,
    attack: 0.2,
    // Add more parameters as needed
  };

  // Reset any other game state or control values
  // ...
}

// Control image map click event handler
const controls = document.querySelectorAll('#controls area');
controls.forEach(control => {
  control.addEventListener('click', handleControlClick);
  control.addEventListener('touchstart', handleControlTouch);
  control.addEventListener('touchmove', handleControlTouch);
  control.addEventListener('touchend', handleControlTouchEnd);
});

function handleControlClick(event) {
  event.preventDefault();
  adjustSoundParameters(event.target);
}

function handleControlTouch(event) {
  event.preventDefault();
  adjustSoundParameters(event.target);
}

function handleControlTouchEnd(event) {
  event.preventDefault();
  // Add any additional logic for touch end events
}

function adjustSoundParameters(control) {
  const parameter = control.dataset.parameter;
  const value = parseFloat(control.dataset.value);

  if (parameter) {
    soundParameters[parameter] = value;
    console.log(`${parameter} updated to ${value}`);
  }
}
