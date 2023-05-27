const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const datePicker = document.getElementById('date-picker');
const countdownContainer = document.getElementById('countdown-container');
const countdownTitelHTML = document.getElementById('countdown-title');
const countdownTimeHTML = document.querySelectorAll('span');
const resetBtn = document.getElementById('reset-button');
const completeContainer = document.getElementById('complete-container');
const completeinfoHTML = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Populate Countdown 
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

// Set Date Input Parameter
const dateToday = new Date().toISOString().slice(0, 10);
datePicker.setAttribute('min', dateToday);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const upadteDOM = () => {
  
  countdownActive = setInterval(() => {
    const nowValue = new Date().getTime();
    const distance = countdownValue - nowValue;
  
    const dayCountdown = Math.floor(distance / day);
    const hourCountdown = Math.floor((distance % day) / hour)
    const minuteCountdown = Math.floor((distance % hour) / minute)
    const secondCountdown = Math.floor((distance % minute) / second)
    
    inputContainer.hidden = true;
    if (distance < 0){
      countdownContainer.hidden = true;
      clearInterval(countdownActive);
      completeinfoHTML.textContent = `${countdownTitle} completed on ${countdownDate}`
      completeContainer.hidden = false;
    } else {
      completeContainer.hidden = true;
      countdownContainer.hidden = false;
      countdownTitelHTML.textContent = `${countdownTitle}`;
      countdownTimeHTML[0].textContent = `${dayCountdown}`;
      countdownTimeHTML[1].textContent = `${hourCountdown}`;
      countdownTimeHTML[2].textContent = `${minuteCountdown}`;
      countdownTimeHTML[3].textContent = `${secondCountdown}`;   
    }
  }, second)
}

//Take values from Form Input
const updateCountdown = (e) => {

   e.preventDefault();

   countdownTitle = e.srcElement[0].value;
   countdownDate = e.srcElement[1].value.replace(/-/g, '\/');
   
   savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
   };
   localStorage.setItem('countdown', JSON.stringify(savedCountdown));

   if (countdownDate === ''){
    alert('Please select a countdown Date!')
   } else {
    countdownValue = new Date(countdownDate).getTime();
    upadteDOM();
   }
}

const resetCountdown = () => {
  countdownContainer.hidden = true;
  completeContainer.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  localStorage.removeItem('countdown');
  countdownTitle = '';
  countdownDate = '';
}

const restorePreviousCountdown = () => {
  if(localStorage.getItem('countdown')){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    upadteDOM();
  }
}

countdownForm.addEventListener('submit', updateCountdown);
resetBtn.addEventListener('click', resetCountdown);
completeBtn.addEventListener('click', resetCountdown);

restorePreviousCountdown();
