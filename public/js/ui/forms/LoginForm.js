/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    // Используем метод User.login для авторизации пользователя
    User.login(options)
      .then(response => {
        // Проверяем, успешно ли прошла авторизация
        if (response && response.success) {
          // Сбрасываем форму
          this.reset();

          // Меняем состояние приложения на 'user-logged'
          App.setState('user-logged');

          // Закрываем модальное окно
          Modal.close();
        } else {
          // Здесь можно обработать ошибку, например, показать сообщение об ошибке
          console.error('Login failed:', response.error);
        }
      })
      .catch(error => {
        // Обработка ошибок сети или других ошибок
        console.error('Error during login:', error);
      });
  }
}