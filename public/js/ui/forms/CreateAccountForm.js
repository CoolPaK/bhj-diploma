/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта.
 */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму.
   * @param {Object} data - Данные формы.
   */
  onSubmit(data) {
    // Валидация данных перед отправкой (можно добавить свою логику)
    if (!this.validateData(data)) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    Account.create(data, (err, response) => {
      this.element.reset();

      if (response && response.success) {
        // Уведомляем пользователя об успешном создании счета
        alert("Счет успешно создан!");
        App.getModal("createAccount").close();
        App.update();
      } else {
        alert(response.error || "Произошла ошибка при создании счета.");
      }
    });
  }

  /**
   * Метод для валидации данных формы.
   * @param {Object} data - Данные формы.
   * @returns {boolean} - true, если данные валидны, иначе false.
   */
  validateData(data) {
    // Пример простой валидации (можно расширить)
    return data.accountName && data.accountName.trim() !== "";
  }
}
