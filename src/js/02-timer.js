import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const pickerEl = document.querySelector('input#datetime-picker');

const buttonStart = document.querySelector('button[data-start]');

const daysEl = document.querySelector('[data-days]');

const hoursEl = document.querySelector('[data-hours]');

const minutesEl = document.querySelector('[data-minutes]');

const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;

buttonStart.setAttribute('disabled', true);

buttonStart.addEventListener('click', handleButtonStartClick);
let selectedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const result = selectedDates[0] - options.defaultDate;

    if (result <= 0) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    buttonStart.removeAttribute('disabled');
    selectedTime = result;
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function handleButtonStartClick() {
  buttonStart.setAttribute('disabled', true);
  pickerEl.setAttribute('disabled', true);

  timerId = setInterval(() => {
    selectedTime -= 1000;

    let countdownProp = convertMs(selectedTime);

    daysEl.textContent = addLeadingZero(countdownProp.days);

    hoursEl.textContent = addLeadingZero(countdownProp.hours);

    minutesEl.textContent = addLeadingZero(countdownProp.minutes);

    secondsEl.textContent = addLeadingZero(countdownProp.seconds);

    if (selectedTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

flatpickr(pickerEl, options);
