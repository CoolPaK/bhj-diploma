/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 */
class User {
  static URL = "/user";

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * @param {Object} user - Информация о пользователе.
   */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища.
   * @returns {Object|undefined} - Информация о пользователе или undefined.
   */
  static current() {
    return localStorage.getItem("user") 
      ? JSON.parse(localStorage.getItem("user")) 
      : undefined;
  }

  /**
   * Обрабатывает ответ сервера и устанавливает пользователя.
   * @param {Object} response - Ответ от сервера.
   */
  static handleUser Response(response) {
    if (response && response.user) {
      this.setCurrent(response.user);
    } else {
      this.unsetCurrent();
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * @param {function} callback - Функция обратного вызова.
   */
  static fetch(callback) {
    createRequest({
      url: this.URL + "/current",
      method: "GET",
      callback: (err, response) => {
        this.handleUser Response(response);
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * @param {Object} data - Данные для авторизации.
   * @param {function} callback - Функция обратного вызова.
   */
  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      data,
      callback: (err, response) => {
        this.handleUser Response(response);
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * @param {Object} data - Данные для регистрации.
   * @param {function} callback - Функция обратного вызова.
   */
  static register(data, callback) {
    createRequest({
      url: this.URL + "/register",
      method: "POST",
      data,
      callback: (err, response) => {
        this.handleUser Response(response);
        callback(err, response);
      },
    });
  }

  /**
   * Производит выход из приложения.
   * @param {function} callback - Функция обратного вызова.
   */
  static logout(callback) {
    createRequest({
      url: this.URL + "/logout",
      method: "POST",
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}
