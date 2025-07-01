// DOM elements
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Stopwatch variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Format time to display with leading zeros
function formatTime(time, digits = 2) {
    return time.toString().padStart(digits, '0');
}

// Update the display with current time
function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;
    
    const milliseconds = Math.floor((currentTime % 1000) / 10);
    const seconds = Math.floor((currentTime / 1000) % 60);
    const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
    
    millisecondsElement.textContent = formatTime(milliseconds);
    secondsElement.textContent = formatTime(seconds);
    minutesElement.textContent = formatTime(minutes);
}

// Start the timer
function startTimer() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        
        // Update button states
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

// Pause the timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    
    // Reset display
    millisecondsElement.textContent = '00';
    secondsElement.textContent = '00';
    minutesElement.textContent = '00';
    
    // Clear lap times
    lapsList.innerHTML = '';
    lapCount = 0;
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        lapCount++;
        
        // Get current time
        const currentTime = Date.now() - startTime + elapsedTime;
        const milliseconds = Math.floor((currentTime % 1000) / 10);
        const seconds = Math.floor((currentTime / 1000) % 60);
        const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
        
        // Format lap time
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        
        // Create lap item
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapCount}</span><span>${lapTime}</span>`;
        
        // Add to list (at the beginning to show newest first)
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
}

// Initialize the stopwatch
function init() {
    resetTimer();
}

// Initialize when page loads
window.onload = init;