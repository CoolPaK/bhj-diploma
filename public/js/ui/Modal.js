/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон.
 */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * @param {HTMLElement} element - Элемент модального окна.
   */
  constructor(element) {
    if (!element) {
      throw new Error("Element does not exist!");
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   */
  registerEvents() {
    const dismissButtons = this.element.querySelectorAll(
      '[data-dismiss="modal"]'
    );

    if (dismissButtons.length === 0) {
      console.warn("No dismiss buttons found for this modal.");
    }

    for (let btn of dismissButtons) {
      btn.addEventListener("click", (e) => {
        this.onClose(e);
      });
    }

    // Добавляем обработку клавиши Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * @param {Event} e - Событие клика.
   */
  onClose(e) {
    e.preventDefault();
    this.close();
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   */
  open() {
    this.element.style.display = "block";
    this.element.focus(); // Устанавливаем фокус на модальном окне
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   */
  close() {
    this.element.style.display = "none";
  }
}
