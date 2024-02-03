function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        const reason = 'Error message';
        reject(reason);
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
            message: `Promise ${position} completed after ${delay}ms`,
            color: 'green',
          });
        })
        .catch(reason => {
          iziToast.show({
            title: 'Error',
            message: `Promise rejected. Reason: ${reason}`,
            color: 'red',
          });
        });
    }
  });
});
