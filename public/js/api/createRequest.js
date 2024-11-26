/**
 * Основная функция для совершения запросов
 * на сервер.
 * @param {Object} options - Опции для запроса.
 * @param {string} options.url - URL для запроса.
 * @param {Object} [options.data] - Данные для отправки в запросе.
 * @param {string} [options.method='GET'] - HTTP-метод (GET, POST и т.д.).
 * @param {function} options.callback - Функция обратного вызова для обработки ответа.
 */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  let { url, data = {}, method = "GET", callback } = options;

  // Если метод GET, добавляем данные в URL
  if (method.toUpperCase() === "GET") {
    const params = new URLSearchParams(data).toString();
    url += `?${params}`; // Формируем строку запроса
  }

  xhr.open(method, url);

  // Если метод не GET, устанавливаем заголовки и отправляем данные
  if (method.toUpperCase() !== "GET") {
    xhr.setRequestHeader("Content-Type", "application/json"); // Устанавливаем заголовок для JSON
    xhr.send(JSON.stringify(data)); // Отправляем данные в формате JSON
  } else {
    xhr.send(); // Просто отправляем запрос без данных
  }

  // Обработка ответа
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(null, xhr.response); // Успешный ответ
      } else {
        callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`)); // Обработка ошибки
      }
    }
  };
};
