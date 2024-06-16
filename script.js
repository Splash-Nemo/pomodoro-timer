const songListContainer = document.querySelector(".songs-container");
function songListAppears() {
  songListContainer.classList.toggle("active");
}

// Start Stop functionality
const startPauseButton = document.querySelector(".start");
const timer = document.querySelector(".timer");
let reTimer = timer.textContent;

function updateTimer(newTimer) {
    timer.textContent = newTimer;
    reTimer = timer.textContent;
}

let bellAudio = new Audio();
bellAudio.src = "./bellSound/015828_school-bell-56309.mp3";

function startPauseFunction() {
  if (startPauseButton.textContent === " start ") {
    startPauseButton.textContent = " pause ";
    executeStartFunction();
  } else {
    startPauseButton.textContent = " start ";
    executePauseFunction();
  }
}

// start function for starting the countdown timer
let pomodoro = 0;

function executeStartFunction() {
  let timerSelected = timer.textContent;
  let time = timerSelected.split(":");
  let minutes = parseInt(time[0]);
  let seconds = parseInt(time[1]);

  pomodoro = setInterval(() => {
    

    if (seconds == 0) {
      minutes -= 1;
      seconds = 59;
    } else {
      seconds -= 1;
    }

    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.textContent = `${formattedMinutes}` + ":" + `${formattedSeconds}`;

    if (minutes == 0 && seconds == 0) {
        playBellAudio();
        alert("Congratulations\nClick anywhere on the screen");
        clearInterval(pomodoro);
      }

  }, 1000);
}

function executePauseFunction() {
    clearInterval(pomodoro);
}

// Reset Timer

function resetTimer(){
    timer.textContent = reTimer;
    startPauseButton.textContent = " start ";
    clearInterval(pomodoro);
}
// Bell Notification when timer reaches 0

function playBellAudio() {
  bellAudio.play();
  window.addEventListener("click", () => {
    bellAudio.pause();
    timer.textContent = reTimer;
    startPauseButton.textContent = " start ";
  });
}


// Timer Change
const pomodoroType = document.querySelector(".pomodoro");
const shortBreakType = document.querySelector(".short-break");
const longBreakType = document.querySelector(".long-break");

// Pomodoro timer change
function pomodoroTimer(){
    pomodoroType.classList.add("type-active");
    shortBreakType.classList.remove("type-active");
    longBreakType.classList.remove("type-active");
    updateTimer("25:00");
    resetTimer();
}

// Short-Break timer change
function shortBreakTimer(){
    pomodoroType.classList.remove("type-active");
    shortBreakType.classList.add("type-active");
    longBreakType.classList.remove("type-active");
    updateTimer("05:00");
    resetTimer();
}
// Long-Break timer change
function longBreakTimer(){
    pomodoroType.classList.remove("type-active");
    shortBreakType.classList.remove("type-active");
    longBreakType.classList.add("type-active");
    updateTimer("15:00");
    resetTimer();
}
