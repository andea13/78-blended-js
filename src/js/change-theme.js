// Зробити перемикач теми. Зберігати тему у локальному сховище.
// При перезавантаженні сторінки перевіряти сховище та ставити тему, яка там вказана.
// Додати класи для змін тем
import storage from './storage';

const body = document.querySelector('body');
const checkbox = document.querySelector('.checkbox');

checkbox.addEventListener('click', onClick);
function onClick() {
  if (checkbox.checked === true) {
    storage.save('theme', 'dark-theme');
    isDark ()
  }
  if (checkbox.checked === false) {
    storage.save('theme', 'light-theme');
    isLight ()
  }
}
function reload() {
  const savedStorage = storage.read('theme');
  console.log(savedStorage);
  if (savedStorage === 'dark-theme') {
    checkbox.checked = true;
    isDark ()
  } else {
    checkbox.checked = false;
   isLight ()
  }
}
reload();
function isDark (){
     body.classList.add('dark');
    body.classList.remove('light');
}
function isLight (){
      body.classList.add('light');
    body.classList.remove('dark');
}