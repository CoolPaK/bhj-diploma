/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню.
 */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton.
   */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle.
   */
  static initToggleButton() {
    const sidebarMini = document.querySelector(".sidebar-mini");
    document.querySelector(".sidebar-toggle").addEventListener("click", (e) => {
      e.preventDefault();
      sidebarMini.classList.toggle("sidebar-open");
      sidebarMini.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * Инициализирует ссылки для аутентификации:
   * - Показывает окно входа при нажатии на кнопку входа.
   * - Показывает окно регистрации при нажатии на кнопку регистрации.
   * - Вызывает User.logout при нажатии на кнопку выхода.
   */
  static initAuthLinks() {
    this.initRegisterLink();
    this.initLoginLink();
    this.initLogoutLink();
  }

  static initRegisterLink() {
    document
      .querySelector(".menu-item_register a")
      .addEventListener("click", () => {
        App.getModal("register").open();
      });
  }

  static initLoginLink() {
    document
      .querySelector(".menu-item_login a")
      .addEventListener("click", () => {
        App.getModal("login").open();
      });
  }

  static initLogoutLink() {
    document
      .querySelector(".menu-item_logout a")
      .addEventListener("click", () => {
        this.logoutUser();
      });
  }

  static logoutUser() {
    User.logout((err, response) => {
      if (err || !response.success) {
        this.handleLogoutError(err || response.error);
      } else {
        App.setState("init");
      }
    });
  }

  static handleLogoutError(error) {
    alert(error || "Ошибка выхода. Попробуйте еще раз.");
  }
}
