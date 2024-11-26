/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 */
class Entity {
  static URL = "";

  /**
   * Выполняет запрос к серверу с заданными параметрами.
   * @param {string} method - HTTP-метод (GET, POST, PATCH, DELETE).
   * @param {Object} data - Данные для отправки на сервер.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static request(method, data, callback) {
    createRequest({
      method,
      data,
      url: this.URL,
      callback,
    });
  }

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity).
   * @param {Object} data - Данные для запроса.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static list(data, callback) {
    this.request("GET", data, callback);
  }

  /**
   * Обновляет данные на сервере.
   * @param {Object} data - Данные для обновления.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static patch(data, callback) {
    this.request("PATCH", data, callback);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity).
   * @param {Object} data - Данные для создания.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static create(data, callback) {
    this.request("PUT", data, callback);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity).
   * @param {Object} data - Данные для удаления.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static remove(data, callback) {
    this.request("DELETE", data, callback);
  }
}
