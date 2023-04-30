// TODO:=========================================
// ЗАДАЧА 1

// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// Недоступними зміни.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.

// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.
import Notiflix from 'notiflix';
import storage from './storage';

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const formEl = document.querySelector('#login-form');

const { email, password, button } = formEl.elements;

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  if (button.textContent === 'logout') {
    onLogout();
    return;
  }

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (emailValue === USER_DATA.email && passwordValue === USER_DATA.password) {
    const login = {
      email: emailValue,
      password: passwordValue,
    };
    storage.save('login', login);
    formEl.reset();
    onLogin();
  } else {
    Notiflix.Notify.warning('Error!');
  }
}

function onLogin() {
  button.textContent = 'logout';
  email.setAttribute('disabled', true);
  password.setAttribute('disabled', true);
}

function onReload() {
  const result = storage.read('login');
  console.log(result);
  if (result) {
    onLogin();
  }
}
onReload();

function onLogout() {
  storage.remove('login');
  button.textContent = 'login';
  email.removeAttribute('disabled');
  password.removeAttribute('disabled');
}
