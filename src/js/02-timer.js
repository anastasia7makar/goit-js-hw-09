import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const pickerEl = document.querySelector('input#datetime-picker');

const buttonStart = document.querySelector('button[data-start]');

console.log(buttonStart);

buttonStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const result = selectedDates[0] - options.defaultDate;
    if (result < 0 || result === 0) {
      window.alert('Please choose a date in the future');
    } else {
      buttonStart.removeAttribute('disabled');
      return result;
    }
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

console.log(convertMs(2000));

flatpickr(pickerEl, options);
