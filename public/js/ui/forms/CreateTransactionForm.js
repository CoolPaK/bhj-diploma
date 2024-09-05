/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list((err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      const accountSelect = this.element.querySelector('.account-select');
      accountSelect.innerHTML = ''; //Очистка текущего списка

      response.data.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        accountSelect.appChild(option);
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      if (response.success) {
        this.element.reset(); // Сброс формы
        App.getModal('newExpense').close(); // Закрытие модального окна
        App.update(); // Обновление информации в приложении
      }
    });
  }
}