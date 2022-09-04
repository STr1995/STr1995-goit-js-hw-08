// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener('submit', onFormSubmit); 
feedbackForm.addEventListener('input', throttle(onInput, 500));

populateTextarea()

function onInput() {
    const { email, message } = feedbackForm.elements;
    const objectJson = JSON.stringify({
    email: email.value,
    message: message.value,
  });
    localStorage.setItem(LOCALSTORAGE_KEY, objectJson);
};

function populateTextarea() {
    const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedMessage) {
        const messageJsonParse = JSON.parse(savedMessage);
        const { email, message } = feedbackForm.elements;
            email.value = messageJsonParse.email;
            message.value = messageJsonParse.message;
    }
};

function onFormSubmit(e) {
    e.preventDefault();
    feedbackForm.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
};
