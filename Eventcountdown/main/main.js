console.log("mainloaded");
const timeInput = document.querySelector(".time-input");
const button = document.querySelector(".submit");
const countdownDiv = document.querySelector(".timer");
const daySpan = document.querySelector(".day");
const hourSpan = document.querySelector(".hour");
const minSpan = document.querySelector(".min");
const secSpan = document.querySelector(".sec");
const announcementDiv = document.querySelector(".announcement");
let time = null;

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


