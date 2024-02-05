let intervalId;
document.addEventListener('DOMContentLoaded', () => {
  const datetimePicker = initializeDatetimePicker();
  const startButton = document.querySelector('[data-start]');
  const timerDisplay = document.querySelector('.timer');

  startButton.disabled = true;

  startButton.addEventListener('click', () =>
    handleStartButtonClick(datetimePicker, timerDisplay)
  );
});

function initializeDatetimePicker() {
  const startButton = document.querySelector('[data-start]');
  const datetimePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate && selectedDate > new Date()) {
        startButton.removeAttribute('disabled');
      } else {
        startButton.setAttribute('disabled', 'disabled');
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future.',
        });
      }
    },
  });
  return datetimePicker;
}

function handleStartButtonClick(datetimePicker, timerDisplay) {
  const startButton = document.querySelector('[data-start]');
  const selectedDate = datetimePicker.selectedDates[0];

  if (selectedDate && selectedDate > new Date() && !intervalId) {
    startButton.disabled = true;
    datetimePicker._input.disabled = true;

    intervalId = setInterval(() => {
      const timeRemaining = selectedDate - new Date();

      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        updateTimerUI(timerDisplay, 0, 0, 0, 0);
        iziToast.success({
          title: 'Success',
          message: 'Countdown completed!',
        });
        datetimePicker._input.disabled = false;
        intervalId = undefined;
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        updateTimerUI(timerDisplay, days, hours, minutes, seconds);
      }
    }, 1000);
  }
}

function updateTimerUI(timerDisplay, days, hours, minutes, seconds) {
  const units = ['days', 'hours', 'minutes', 'seconds'];

  units.forEach(unit => {
    const unitValue = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }[unit];
    timerDisplay.querySelector(`[data-${unit}]`).textContent =
      addLeadingZero(unitValue);
  });
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
