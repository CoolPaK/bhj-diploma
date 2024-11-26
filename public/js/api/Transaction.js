/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'.
 */
class Transaction extends Entity {
  static URL = "/transaction";

  /**
   * Получает список транзакций пользователя.
   * @param {Object} data - Данные для запроса (например, фильтры).
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static getList(data, callback) {
    this.list(data, callback);
  }

  /**
   * Создает новую транзакцию.
   * @param {Object} data - Данные транзакции.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static createTransaction(data, callback) {
    this.create(data, callback);
  }

  /**
   * Обновляет существующую транзакцию.
   * @param {Object} data - Данные для обновления.
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static updateTransaction(data, callback) {
    this.patch(data, callback);
  }

  /**
   * Удаляет транзакцию.
   * @param {Object} data - Данные для удаления (например, ID транзакции).
   * @param {Function} callback - Функция обратного вызова для обработки ответа.
   */
  static removeTransaction(data, callback) {
    this.remove(data, callback);
  }
}
