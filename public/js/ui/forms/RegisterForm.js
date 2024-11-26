/**
 * Класс RegisterForm управляет формой
 * регистрации.
 */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register.
   * После успешной регистрации устанавливает
   * состояние App.setState('user-logged')
   * и закрывает окно, в котором находится форма.
   * @param {Object} data - Данные формы.
   */
  onSubmit(data) {
    // Валидация данных перед отправкой
    if (!this.validateData(data)) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    // Отключаем кнопку отправки и показываем индикатор загрузки
    this.disableButton(true);

    User.register(data, (err, response) => {
      this.element.reset();
      this.disableButton(false); // Включаем кнопку обратно

      if (response && response.success) {
        App.setState("user-logged");
        App.getModal("register").close();
      } else {
        // Выводим ошибку в пределах формы
        this.showError(
          response.error || "Произошла ошибка. Попробуйте еще раз."
        );
      }
    });
  }

  /**
   * Проверяет, что все обязательные поля заполнены.
   * @param {Object} data - Данные формы.
   * @returns {boolean} - true, если данные валидны, иначе false.
   */
  validateData(data) {
    // Пример простой валидации
    return data.email && data.password; // Добавьте дополнительные проверки по мере необходимости
  }

  /**
   * Включает или отключает кнопку отправки формы.
   * @param {boolean} isDisabled - true для отключения, false для включения.
   */
  disableButton(isDisabled) {
    const button = this.element.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = isDisabled;
    }
  }

  /**
   * Показывает ошибку в пределах формы.
   * @param {string} message - Сообщение об ошибке.
   */
  showError(message) {
    // Можно добавить логику для отображения сообщения об ошибке в пределах формы
    alert(message); // Временное решение, замените на более удобное
  }
}
