//checking if the local storage is available or not
//if not, Then initializing the local storage with default values

if (localStorage.length == 0) {
  //   localStorage.StorageAvailable="true";
  //   localStorage.CurrentStatus="STOP";
  localStorage.CurrentDefaultTime = 25;
  localStorage.PomodoroMinutesDefault = 25;
  localStorage.ShortBreakMinutesDefault = 5;
  localStorage.LongBreakMinutesDefault = 15;
  localStorage.CurrentPage = "Pomodoro";
  localStorage.MinutesLeft = 25;
  localStorage.SecondsLeft = 0;
  localStorage.NumberOfTasks = 0;
  localStorage.TasksDone = 0;
  localStorage.TaskList = "";
  localStorage.CompletedTasksList = "";
  localStorage.PomodoroCompleted = 0;
  localStorage.TotalFocusTime = 0;
}

let pomodoro = document.querySelector("#pomodoro");
let shortBreak = document.querySelector("#short-break");
let longBreak = document.querySelector("#long-break");
let start = document.querySelector("#start-btn");
let edit = document.querySelector("#edit-btn");
let addTask = document.querySelector(".add-task-container");
let taskListOptions = document.querySelector(".task-btn");
let minutes = document.querySelector("#minutes-left");
let seconds = document.querySelector("#seconds-left");
let wrapper = document.querySelector(".wrapper-pomodoro");
let reset = document.querySelector("#reset-btn");

//if the local storage is available then fetching the values and setting them up
minutes.innerHTML = localStorage.MinutesLeft;
if (localStorage.SecondsLeft < 10) {
  seconds.innerHTML = "0" + localStorage.SecondsLeft;
} else {
  seconds.innerHTML = localStorage.SecondsLeft;
}

start.addEventListener("click", startCountDown);
reset.addEventListener("click", resetTheTimer);
edit.addEventListener("click", editTheTimer);
taskListOptions.addEventListener("click", showoptions);
pomodoro.addEventListener("click", changeToPomodoro);
shortBreak.addEventListener("click", changeToShortBreak);
longBreak.addEventListener("click", changeToLongBreak);

//functions
function startCountDown() {
  if (start.innerHTML === "START") {
    edit.classList.add("notallowed-btn");
    start.innerHTML = "STOP";
    start.setAttribute("class", "time-count-btn-active");
    let minutesLeft = localStorage.MinutesLeft;
    let secondsLeft = localStorage.SecondsLeft;
    removeEventListeners();
    countDown(minutesLeft, secondsLeft);
  } else {
    clearInterval(theCountDownToken);
    reset.classList.remove("notallowed-btn");
    reset.addEventListener("click", resetTheTimer);
    localStorage.MinutesLeft = minutes.innerHTML;
    localStorage.SecondsLeft = seconds.innerHTML;
    start.innerHTML = "START";
    start.setAttribute("class", "time-count-btn");
  }
}

function editTheTimer() {
  let currentPage = localStorage.CurrentPage;
  if (edit.innerHTML === "EDIT" && start.innerHTML === "START") {
    minutes.setAttribute("contenteditable", "true");
    edit.innerHTML = "SAVE";
    edit.setAttribute("class", "time-count-btn-active");
    minutes.focus();
    start.removeEventListener("click", startCountDown);
    start.classList.add("notallowed-btn");
  } else if (start.innerHTML === "START" && edit.innerHTML === "SAVE") {
    if (currentPage === "Pomodoro") {
      let value = minutes.innerHTML;
      if (value >= 25 && value <= 180) {
        localStorage.PomodoroMinutesDefault = value;
        minutes.innerHTML = JSON.parse(localStorage.PomodoroMinutesDefault);
      } else if (value < 25) {
        localStorage.PomodoroMinutesDefault = 25;
        minutes.innerHTML = JSON.parse(localStorage.PomodoroMinutesDefault);
      } else {
        localStorage.PomodoroMinutesDefault = 180;
        minutes.innerHTML = JSON.parse(localStorage.PomodoroMinutesDefault);
      }
      localStorage.MinutesLeft = minutes.innerHTML;
    } else if (currentPage === "ShortBreak") {
      let value = minutes.innerHTML;
      if (value >= 5 && value <= 36) {
        localStorage.ShortBreakMinutesDefault = value;
        minutes.innerHTML = JSON.parse(localStorage.ShortBreakMinutesDefault);
      } else if (value < 5) {
        localStorage.ShortBreakMinutesDefault = 5;
        minutes.innerHTML = JSON.parse(localStorage.ShortBreakMinutesDefault);
      } else {
        localStorage.ShortBreakMinutesDefault = 36;
        minutes.innerHTML = JSON.parse(localStorage.ShortBreakMinutesDefault);
      }
      localStorage.MinutesLeft = minutes.innerHTML;
    } else if (currentPage === "LongBreak") {
      let value = minutes.innerHTML;
      if (value >= 15 && value <= 100) {
        localStorage.LongBreakMinutesDefault = value;
        minutes.innerHTML = JSON.parse(localStorage.LongBreakMinutesDefault);
      } else if (value < 15) {
        localStorage.LongBreakMinutesDefault = 15;
        minutes.innerHTML = JSON.parse(localStorage.LongBreakMinutesDefault);
      } else {
        localStorage.LongBreakMinutesDefault = 100;
        minutes.innerHTML = JSON.parse(localStorage.LongBreakMinutesDefault);
      }
      localStorage.MinutesLeft = minutes.innerHTML;
    }
    minutes.setAttribute("contenteditable", "false");
    edit.innerHTML = "EDIT";
    edit.setAttribute("class", "time-count-btn");
    start.addEventListener("click", startCountDown);
    start.classList.remove("notallowed-btn");
  }
  localStorage.CurrentDefaultTime = localStorage.MinutesLeft;
}

function changeToLongBreak() {
  if (start.innerHTML === "START") {
    if (pomodoro.getAttribute("class") === "time-btn-active") {
      pomodoro.setAttribute("class", "time-btn");
    } else if (shortBreak.getAttribute("class") === "time-btn-active") {
      shortBreak.setAttribute("class", "time-btn");
    }
    localStorage.CurrentPage = "LongBreak";
    edit.innerHTML = "EDIT";
    edit.setAttribute("class", "time-count-btn");
    wrapper.setAttribute("class", "wrapper-longBreak");
    longBreak.setAttribute("class", "time-btn-active");
    minutes.innerHTML = JSON.parse(localStorage.LongBreakMinutesDefault);
    seconds.innerHTML = "00";
    localStorage.MinutesLeft = minutes.innerHTML;
  }
  localStorage.CurrentDefaultTime = localStorage.LongBreakMinutesDefault;
}

function changeToShortBreak() {
  if (start.innerHTML === "START") {
    if (pomodoro.getAttribute("class") === "time-btn-active") {
      pomodoro.setAttribute("class", "time-btn");
    } else if (longBreak.getAttribute("class") === "time-btn-active") {
      longBreak.setAttribute("class", "time-btn");
    }
    localStorage.CurrentPage = "ShortBreak";
    edit.innerHTML = "EDIT";
    edit.setAttribute("class", "time-count-btn");
    wrapper.setAttribute("class", "wrapper-shortBreak");
    shortBreak.setAttribute("class", "time-btn-active");
    minutes.innerHTML = JSON.parse(localStorage.ShortBreakMinutesDefault);
    seconds.innerHTML = "00";
    localStorage.MinutesLeft = minutes.innerHTML;
  }
  localStorage.CurrentDefaultTime = localStorage.ShortBreakMinutesDefault;
}

function changeToPomodoro() {
  if (start.innerHTML === "START") {
    if (shortBreak.getAttribute("class") === "time-btn-active") {
      shortBreak.setAttribute("class", "time-btn");
    } else if (longBreak.getAttribute("class") === "time-btn-active") {
      longBreak.setAttribute("class", "time-btn");
    }
    localStorage.CurrentPage = "Pomodoro";
    edit.innerHTML = "EDIT";
    edit.setAttribute("class", "time-count-btn");
    wrapper.setAttribute("class", "wrapper-pomodoro");
    pomodoro.setAttribute("class", "time-btn-active");
    minutes.innerHTML = JSON.parse(localStorage.PomodoroMinutesDefault);
    seconds.innerHTML = "00";
    localStorage.MinutesLeft = minutes.innerHTML;
  }
  localStorage.CurrentDefaultTime = localStorage.PomodoroMinutesDefault;
}

function addANewTask() {
  // alert("Add new task");
}

function showoptions() {
  // alert("show options");
}

function countDown(minutesLeft, secondsLeft) {
  theCountDownToken = setInterval(function () {
    if (minutesLeft != 0 || secondsLeft != 0) {
      if (secondsLeft > 0) {
        secondsLeft--;
        localStorage.SecondsLeft = secondsLeft;
        if (secondsLeft < 10) {
          seconds.innerHTML = "0" + secondsLeft;
        } else {
          seconds.innerHTML = secondsLeft;
        }
      } else {
        secondsLeft = 59;
        localStorage.SecondsLeft = 59;
        if (minutesLeft > 0) {
          minutesLeft--;
          localStorage.MinutesLeft = minutesLeft;
        }
        minutes.innerHTML = minutesLeft;
        seconds.innerHTML = secondsLeft;
      }
    } else {
      console.log(theCountDownToken);
      clearInterval(theCountDownToken);
      restoreEventListeners();
      start.click();
      let pomodoro = JSON.parse(localStorage.PomodoroCompleted);
      pomodoro++;
      if (localStorage.CurrentPage === "Pomodoro") {
        if (pomodoro < 3) {
          changeToShortBreak();
          localStorage.PomodoroCompleted = pomodoro;
        } else {
          changeToLongBreak();
          localStorage.PomodoroCompleted = 0;
        }
      } else {
        changeToPomodoro();
      }
      PomodoroCount();
    }
  }, 1000);
}

function PomodoroCount() {
  console.log("Pomodoro count " + localStorage.PomodoroCompleted);
}

function removeEventListeners() {
  edit.removeEventListener("click", editTheTimer);
  taskListOptions.removeEventListener("click", showoptions);
  pomodoro.removeEventListener("click", changeToPomodoro);
  shortBreak.removeEventListener("click", changeToShortBreak);
  longBreak.removeEventListener("click", changeToLongBreak);
  reset.removeEventListener("click", resetTheTimer);

  pomodoro.classList.add("notallowed-btn");
  shortBreak.classList.add("notallowed-btn");
  longBreak.classList.add("notallowed-btn");
  edit.classList.add("notallowed-btn");
  reset.classList.add("notallowed-btn");
}

function restoreEventListeners() {
  edit.addEventListener("click", editTheTimer);
  taskListOptions.addEventListener("click", showoptions);
  pomodoro.addEventListener("click", changeToPomodoro);
  shortBreak.addEventListener("click", changeToShortBreak);
  longBreak.addEventListener("click", changeToLongBreak);

  pomodoro.classList.remove("notallowed-btn");
  shortBreak.classList.remove("notallowed-btn");
  longBreak.classList.remove("notallowed-btn");
  edit.classList.remove("notallowed-btn");
}

function resetTheTimer() {
  localStorage.MinutesLeft = localStorage.CurrentDefaultTime;
  localStorage.SecondsLeft = 0;
  minutes.innerHTML = localStorage.MinutesLeft;
  seconds.innerHTML = "00";
  restoreEventListeners();
}
