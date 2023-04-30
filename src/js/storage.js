function save(key, value) {
  const savedData = JSON.stringify(value);
  localStorage.setItem(key, savedData);
}

function read(key) {
  const keyValue = localStorage.getItem(key);
  return keyValue === null ? undefined : JSON.parse(keyValue);
}

function remove(key) {
  localStorage.removeItem(key);
}

export default { save, read, remove };
