/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    // Проверяем, что элемент передан и не является пустым
    if (!element) {
      throw new Error('Element is required for UserWidget');
    }

    // Сохраняем элемент в свойство класса
    this.element = element;

    // Обновляем информацию о пользователе при создании виджета
    this.update();
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    let currentUser = User.current();
    if (currentUser) {
      document.querySelector(".user-name").textContent = currentUser.name;
    }
  }
}
