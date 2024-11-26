class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login.
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState('user-logged') и
   * закрывает окно, в котором находится форма.
   * @param {Object} data - Данные формы.
   */
  onSubmit(data) {
    // Валидация данных перед отправкой (можно добавить свою логику)
    if (!this.validateData(data)) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    User.login(data, (err, response) => {
      this.element.reset();

      if (response && response.success) {
        alert("Вы успешно вошли в систему!");
        App.setState("user-logged");
        App.getModal("login").close();
      } else {
        alert(response.error || "Ошибка авторизации. Попробуйте еще раз.");
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
    return (
      data.login &&
      data.password &&
      data.login.trim() !== "" &&
      data.password.trim() !== ""
    );
  }
}
