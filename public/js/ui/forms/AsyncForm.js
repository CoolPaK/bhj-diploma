/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки.
 */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents().
   * @param {HTMLElement} element - Элемент формы.
   */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент формы не существует");
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit().
   */
  registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * @returns {Object} - Данные формы в виде объекта.
   */
  getData() {
    const formData = new FormData(this.element);
    const formDataConversion = {};

    for (const [key, value] of formData.entries()) {
      // Если поле с таким именем уже существует, добавляем значение в массив
      if (formDataConversion[key]) {
        if (!Array.isArray(formDataConversion[key])) {
          formDataConversion[key] = [formDataConversion[key]];
        }
        formDataConversion[key].push(value);
      } else {
        formDataConversion[key] = value;
      }
    }

    return formDataConversion;
  }

  /**
   * Этот метод должен быть переопределен в подклассах
   * для обработки данных формы.
   * @param {Object} options - Данные формы.
   */
  onSubmit(options) {
    // Метод для переопределения в подклассах
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData().
   */
  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}
