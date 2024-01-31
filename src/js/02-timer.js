document.addEventListener('DOMContentLoaded', () => {
    const datetimePicker = initializeDatetimePicker();
    const startButton = document.querySelector('[data-start]');
    startButton.setAttribute('disabled', 'disabled');

    startButton.addEventListener('click', () => handleStartButtonClick(datetimePicker));
});

let timerActive = false; 

function initializeDatetimePicker() {
    return flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];

            if (selectedDate && selectedDate > new Date() && !timerActive) {
                document.querySelector('[data-start]').removeAttribute('disabled');
            } else {
                document.querySelector('[data-start]').setAttribute('disabled', 'disabled');
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future.',
                });
            }
        },
    });
}

function handleStartButtonClick(datetimePicker) {
    const selectedDate = datetimePicker.selectedDates[0];

    if (selectedDate && selectedDate > new Date() && !timerActive) {
        const startButton = document.querySelector('[data-start]');
        startButton.setAttribute('disabled', 'disabled');
        timerActive = true; 

        const intervalId = setInterval(() => {
            const timeRemaining = selectedDate - new Date();
            if (timeRemaining <= 0) {
                clearInterval(intervalId);
                updateTimerUI(0, 0, 0, 0);
                iziToast.success({
                    title: 'Success',
                    message: 'Countdown completed!',
                });
                timerActive = false; 
            } else {
                const { days, hours, minutes, seconds } = convertMs(timeRemaining);
                updateTimerUI(days, hours, minutes, seconds);
            }
        }, 1000);
    }
}

function updateTimerUI(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
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

