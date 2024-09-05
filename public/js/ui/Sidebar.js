/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');

    // Проверяем, что кнопка найдена
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault(); // Отменяем стандартное поведение ссылки

        // Переключаем классы для body
        document.body.classList.toggle('sidebar-open');
        document.body.classList.toggle('sidebar-collapse');
      });
    }
  }


  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    // Находим кнопки "Регистрация", "Войти" и "Выйти"
    const registerButton = document.querySelector('.sidebar-register');
    const loginButton = document.querySelector('.sidebar-login');
    const logoutButton = document.querySelector('.sidebar-logout');

    // Обработчик для кнопки "Регистрация"
    registerButton.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки
      const modal = App.getModal('modal-register'); // Получаем окно регистрации
      Modal.open(modal); // Открываем окно регистрации
    });

    // Обработчик для кнопки "Войти"
    loginButton.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки
      const modal = App.getModal('modal-login'); // Получаем окно входа
      Modal.open(modal); // Открываем окно входа
    });

    // Обработчик для кнопки "Выйти"
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки
      User.logout((response) => {
        if (response.success) {
          App.setState('init'); // Устанавливаем состояние 'init'
        } else {
          console.error('Ошибка выхода:', response.error);
        }
      });
    });
  }
}