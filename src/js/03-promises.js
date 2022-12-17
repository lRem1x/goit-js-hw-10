const form = document.querySelector('.form')
import { Notify } from 'notiflix/build/notiflix-notify-aio';

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let promiseDelay = parseInt(e.currentTarget.elements.delay.value);
  let promiseStep = parseInt(e.currentTarget.elements.step.value);
  let promiseAmount = parseInt(e.currentTarget.elements.amount.value);

  
  
  for (let position = 1; position <= promiseAmount; position += 1) {
    
    createPromise(position, promiseDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    promiseDelay += promiseStep;
  }
  })

  function createPromise(position, delay) {
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({position, delay})
        } else {
          reject({position, delay})
        }
      }, delay)
    }
  )}