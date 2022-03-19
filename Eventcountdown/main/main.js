console.log("mainloaded");
const timeInput = document.querySelector(".time-input");
const button = document.querySelector(".submit");
const countdownDiv = document.querySelector(".timer");
const daySpan = document.querySelector(".day");
const hourSpan = document.querySelector(".hour");
const minSpan = document.querySelector(".min");
const secSpan = document.querySelector(".sec");
const announcementDiv = document.querySelector(".announcement");
let timer = null;

button.addEventListener("click", () => {
    calcTime(new Date(timeInput.value));
    localStorage.setItem("eventDate", JSON.stringify(timeInput.value));
});

start();

function start() {
    const eventDate = JSON.parse(localStorage.getItem("eventDate "));
    if (eventDate) {
        calcTime(new Date(eventDate));
    }
}

function calcTime(dateEvent) {
    const announcementDiv = document.querySelector(".announcement");
    announcementDiv.classList.add("hide");
    clearInterval(timer);
    const dateToday = new Date();
    let timeRemaining = dateEvent - dateToday;
    if (timeRemaining > 0) {
        startCountdown(timeRemaining);
        countdownDiv.classList.remove("hide");
    } else {
        timeHasPassed(timeRemaining < -86400000);
    }
}

function startCountdown(timeRemaining) {
    timeRemaining -= 1000;
    updateScreen(timeRemaining);
    timer = setInterval(() => {
        timeRemaining -= 1000;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            timeHasPassed(false)
            return
        }
        updateScreen(timeRemaining);
    },1000);
}

function updateScreen(timeRemaining) {
    const day = timeRemaining /(3600000 * 24);
    daySpan.textContent = Math.floor(day);
    timeRemaining %= (3600000 * 24);
    const hour = timeRemaining / 3600000;
    hourSpan.textContent = Math.floor(hour);
    timeRemaining %= 3600000;
    const min = timeRemaining / 60000;
    minSpan.textContent = Math.floor(min);
    timeRemaining %= 60000;
    const sec = timeRemaining / 1000;
    secSpan.textContent = Math.floor(sec);
}

function timeHasPassed(moreThanADay) {
    if (moreThanADay) {
        announcementDiv.textContent = "het evens is al geweest, helaas"
    } 
    else {
        announcementDiv.textContent = "het event is hier!"
    }
    announcementDiv.classList.remove("hide");
    localStorage.removeItem("eventDate")
}
