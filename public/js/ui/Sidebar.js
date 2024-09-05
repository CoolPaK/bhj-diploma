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

    const sidebarBtn = document.querySelector(".sidebar-toggle");
    const body = document.querySelector("body");
    sidebarBtn.addEventListener("click", (e) => {
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
      });
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
    const registerBtn = document.querySelector(".menu-item_register");
    const loginBtn = document.querySelector(".menu-item_login");
    const logoutBtn = document.querySelector(".menu-item_logout");


    // Обработчик для кнопки "Войти"
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("register").open();
    });

    // Обработчик для кнопки "Выйти"
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState("init");
        }
      });
    });
  }
}