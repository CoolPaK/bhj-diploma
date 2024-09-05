/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(event) {
    // Переопределяем метод onSubmit
    onSubmit(event) 
      // Отменяем стандартное поведение формы
      event.preventDefault();

      // Получаем данные формы
      const formData = this.getFormData();

      // Регистрация пользователя через User.register
      User.register(formData, (err, response) => {
        if (response && response.success) {
          // Сбрасываем форму
          this.reset();

          // Устанавливаем состояние приложения 'user-logged'
          App.setState('user-logged');

          // Закрываем модальное окно
          Modal.close();
        } else {
          // Обработка ошибок (например, вывод сообщения об ошибке)
          console.error(err || response.error);
          alert('Ошибка регистрации: ' + (response.error || 'Неизвестная ошибка'));
        }
      });
    }
  }