/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        // Закрыть модальное окно
        App.getModal('new-account').close();
        // Сбросить форму
        this.element.reset();
        // Обновить виджет счетов
        App.update();
      } else {
        console.error(err || 'Ошибка при создании счета');
      }
    });
  }
}