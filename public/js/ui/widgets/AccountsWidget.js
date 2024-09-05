/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не найден');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    // Обработчик событий для создания нового счета
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.detModal('new-account').open(); // Открывает окно для создания счета
    });

    // Обработчик события для выбора счета
    this.element.addEventListener('click', (event) => {
      const accountElement = event.target.closest('.account');

      if (accountElement) {
        const accountId = accountElement.dataset.id;
        this.onSelectAccount(accountId);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (UserActivation.current) {
      Account.list(User.current.id, (err, response) => {
        if (response && response.success) {
          this.clear();
          response.data.forEach(account => {
            this.renderItem(account);
          });
        } else {
          console.error(err || 'Ошибка при получении списка счетов');
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(accountId) {
    const currentAccount = this .element.querySelector('.account.active');

    if (currentAccount) {
      currentAccount.classList.remove('active'); // Убераем класс active у текущего счета
    }

    const selectedAccount = this.element.querySelector(`.account[data-id="${accountId}"]`);
    selectedAccount.classList.add('active'); // Добавляем класс active выбранному счету

    App.showPage('transaction', { account_id: accountId}); // Переход на странницу транзакций

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(account) {
    return `
      <li class="account" data-id="${account.id}">
                <a href="#">
                    <span>${account.name}</span> /
                    <span>${account.sum.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</span>
                </a>
            </li>
    `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(account) {
    this.element.insertAdjancentHTML('beforeend', this.getAccountHTML(account));
  }
}
