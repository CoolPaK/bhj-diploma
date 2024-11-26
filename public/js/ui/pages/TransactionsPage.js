/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта.
 */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents().
   * @param {HTMLElement} element - Элемент страницы.
   */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не существует");
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы.
   */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно.
   */
  registerEvents() {
    this.element.addEventListener("click", (e) => {
      e.preventDefault();

      const removeAccountBtn = e.target.closest(".remove-account");
      const transactionRemoveBtn = e.target.closest(".transaction__remove");

      if (removeAccountBtn) {
        return this.removeAccount();
      }

      if (transactionRemoveBtn) {
        this.removeTransaction(transactionRemoveBtn.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диалоговое окно (с помощью confirm()).
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms().
   */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }

    const id = this.lastOptions.account_id;

    if (confirm("Вы действительно хотите удалить счёт?")) {
      Account.remove({ id }, (err, response) => {
        if (response && response.success) {
          App.updateWidgets();
          App.updateForms();
          alert("Счет успешно удален!");
          this.clear();
        } else {
          alert(err || response.error || "Не удалось удалить счет.");
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждения действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update().
   */
  removeTransaction(id) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          App.update();
          alert("Транзакция успешно удалена!");
        } else {
          alert(err || response.error || "Не удалось удалить транзакцию.");
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions().
   * @param {Object} options - Параметры для получения данных.
   */
  render(options) {
    if (!options) {
      return;
    }

    this.lastOptions = options;

    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      } else {
        alert(err || response.error || "Не удалось загрузить данные счета.");
      }
    });

    Transaction.list(options, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      } else {
        alert(err || response.error || "Не удалось загрузить транзакции.");
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта».
   */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = undefined;
  }

  /**
   * Устанавливает заголовок в элемент .content-title.
   * @param {string} name - Название счета.
   */
  renderTitle(name) {
    this.element.querySelector(".content-title").textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20».
   * @param {string} date - Дата в строковом формате.
   * @returns {string} - Отформатированная дата.
   */
  formatDate(date) {
    let currentDate = new Date(date);

    const day = currentDate.toLocaleString("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const time = currentDate.toLocaleString("ru", {
      hour: "numeric",
      minute: "numeric",
    });

    return `${day} в ${time}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * @param {Object} item - Объект с информацией о транзакции.
   * @returns {string} - HTML-код транзакции.
   */
  getTransactionHTML(item) {
    return `<div class="transaction transaction_${item.type} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                  <h4 class="transaction__title">${item.name}</h4>
                  <div class="transaction__date">${this.formatDate(
                    item.created_at
                  )}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                  ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                <button class="btn btn-danger transaction__remove" data-id="${
                  item.id
                }">
                  <i class="fa fa-trash"></i>  
                </button>
              </div>
            </div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML.
   * @param {Array} data - Массив транзакций.
   */
  renderTransactions(data) {
    const content = this.element.querySelector(".content");
    content.innerHTML = "";

    data.forEach((item) => {
      content.innerHTML += this.getTransactionHTML(item);
    });
  }
}
