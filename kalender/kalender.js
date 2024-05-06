

  let daysContainer = document.querySelector(".days")
  let nextBtn = document.querySelector(".next")
  let prevBtn = document.querySelector(".prev")
  let todayBtn = document.querySelector(".today")
  let month = document.querySelector(".month")
  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"]
  
  let date = new Date()
  let currentMonth = date.getMonth()
  let currentYear = date.getFullYear()

  
  function getCalendar()  {
    
    date.setDate(1)
    
    let firstDay = new Date(currentYear, currentMonth, 1)
    let lastDay = new Date(currentYear, currentMonth + 1, 0)
    let lastDayIndex = lastDay.getDay()
    let lastDayDate = lastDay.getDate()
    let prevLastDay = new Date(currentYear, currentMonth, 0)
    let prevLastDayDate = prevLastDay.getDate()
    let nextDays = 7 - lastDayIndex - 1
  
    month.innerHTML = `${months[currentMonth]} ${currentYear}`
  
    let days = ""
  


    for (let x = firstDay.getDay(); x > 0; x--) {
      days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`
    }
  
    for (let i = 1; i <= lastDayDate; i++) {
      if (i === new Date().getDate() && currentMonth === new Date().getMonth() &&currentYear === new Date().getFullYear()) {
        days += `<div class="day today">${i}</div>`
      } else {
        days += `<div class="day">${i}</div>`
      }

    }
  
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next">${j}</div>`
    }
  
    daysContainer.innerHTML = days

   
    
  }
  getCalendar()
  
  nextBtn.addEventListener("click", () => {
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
    getCalendar()
  })
  
  prevBtn.addEventListener("click", () => {
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
  getCalendar()
  })
   
// JavaScript für das Popup
// Selektieren der Popup-Elemente
let popup = document.getElementById("popup");
let popupDate = document.getElementById("popup-date");
let popupNote = document.getElementById("popup-note");
let savePopupNoteBtn = document.getElementById("savePopupNoteBtn");
let popupCloseBtn = document.querySelector(".popup .close");
let note = document.getElementById("note")

// Eventlistener für das Öffnen des Popups beim Klicken auf einen Tag
daysContainer.addEventListener("click", (event) => {
    // Überprüfen, ob das geklickte Element ein Tag ist
    if (event.target.classList.contains("day")) {
        // Den angeklickten Tag anzeigen
        let clickedDay = event.target.innerText;
        let clickedDate = new Date(currentYear, currentMonth, clickedDay);
        popupDate.textContent = clickedDate.toDateString();

        // Die gespeicherte Notiz für den angeklickten Tag laden, falls vorhanden
        let existingNotes = JSON.parse(localStorage.getItem("calendarNotes")) || [];
        let note = existingNotes.find((note) => note.date === clickedDate.toISOString());
        if (note) {
            popupNote.value = note.note;
        } else {
            popupNote.value = "";
        }

        // Das Popup anzeigen
        popup.style.display = "block";
    }
});

// Eventlistener für das Schließen des Popups
popupCloseBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Eventlistener für das Speichern der Notiz im Popup
savePopupNoteBtn.addEventListener("click", () => {
    let clickedDay = document.querySelector(".day.today").innerText;
    let clickedDate = new Date(currentYear, currentMonth, clickedDay);
    let existingNotes = JSON.parse(localStorage.getItem("calendarNotes")) || [];
    let index = existingNotes.findIndex((note) => note.date === clickedDate.toISOString());
    if (index !== -1) {
        existingNotes[index].note = popupNote.value;
    } else {
        existingNotes.push({ date: clickedDate.toISOString(), note: popupNote.value });
    }
    localStorage.setItem("calendarNotes", JSON.stringify(existingNotes));
    popup.style.display = "none";
});

// Eventlistener für das Schließen des Popups durch Klicken außerhalb des Popups
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";

    }
});

