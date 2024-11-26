/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции.
 */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList.
   * @param {HTMLElement} element - Элемент формы.
   */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список.
   */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector(".accounts-select");

    Account.list(User.current(), (err, response) => {
      accountsSelect.innerHTML = "";

      if (response && response.success) {
        const fragment = document.createDocumentFragment();

        response.data.forEach(({ id, name }) => {
          const option = document.createElement("option");
          option.value = id;
          option.textContent = name;
          fragment.appendChild(option);
        });

        accountsSelect.appendChild(fragment);
      } else {
        alert(err || "Не удалось загрузить список счетов.");
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма.
   * @param {Object} data - Данные формы.
   */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      this.element.reset();

      if (response && response.success) {
        alert("Транзакция успешно создана!");
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
        App.update();
      } else {
        alert(response.error || "Произошла ошибка при создании транзакции.");
      }
    });
  }
}
