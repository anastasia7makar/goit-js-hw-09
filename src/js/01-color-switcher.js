const buttonStart = document.querySelector('button[data-start]');

const buttonStop = document.querySelector('button[data-stop]');

const bodyEl = document.body;

let timerId = null;

buttonStart.addEventListener('click', handleButtonStartClick);

buttonStop.addEventListener('click', handleButtonStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handleButtonStartClick() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
}

buttonStop.setAttribute('disabled', true);

function handleButtonStopClick() {
  clearInterval(timerId);

  buttonStop.setAttribute('disabled', true);
  buttonStart.removeAttribute('disabled');
}
