let timerInterval;
let startTime;
let pausedTime = 0;
let isRunning = false;
let lapCounter = 1;

const timerDisplay = document.querySelector('.timer-display');
const lapList = document.getElementById('lap-list');
const startBtn = document.getElementById('Start-timer');
const pauseBtn = document.getElementById('Pause-timer');
const resetBtn = document.getElementById('Reset-timer');
const lapBtn = document.getElementById('Lap-timer');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - pausedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    pausedTime = Date.now() - startTime;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    pausedTime = 0;
    timerDisplay.textContent = '00 : 00 : 00 : 000';
    lapList.innerHTML = ''; // Clear lap times
    lapCounter = 1; // Reset lap counter
}

function lapTimer() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const millisecondsFormatted = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours} : ${minutes} : ${seconds} : ${millisecondsFormatted}`;
}
