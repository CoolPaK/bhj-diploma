/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 */
class Account extends Entity {
  static URL = "/account/";

  /**
   * Получает информацию о счёте
   * @param {string} id - Идентификатор счета
   * @param {function} callback - Функция обратного вызова для обработки ответа
   */
  static get(id = "", callback) {
    createRequest({
      method: "GET",
      url: `${this.URL}${id}`, // Формируем URL для запроса
      callback: (response) => {
        // Проверяем статус ответа
        if (response.ok) {
          // Если запрос успешен, вызываем коллбек с данными
          callback(null, response.data);
        } else {
          // Если произошла ошибка, вызываем коллбек с ошибкой
          callback(
            new Error(`Ошибка при получении счета: ${response.statusText}`)
          );
        }
      },
    });
  }
}
