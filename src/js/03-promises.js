function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const firstDelay = Number(formData.get('delay'));
    const step = Number(formData.get('step'));
    const amount = Number(formData.get('amount'));

    for (let i = 1; i <= amount; i++) {
      createPromise(i, firstDelay + (i - 1) * step)
        .then(({ position, delay }) => {
          iziToast.show({
            title: 'Success',
            message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            color: 'green',
          });
        })
        .catch(({ position, delay }) => {
          iziToast.show({
            title: 'Error',
            message: `❌ Rejected promise ${position} in ${delay}ms`,
            color: 'red',
          });
        });
    }
    form.reset();
  });
});
