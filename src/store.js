/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.nextCode= this.getMaxCode() + 1;

    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      nextCode: this.state.nextCode + 1,
      list: [...this.state.list, { code: this.state.nextCode, title: 'Новая запись', countSelected: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }
        else {
          item.selected = false;
        }
        return item;
      }),
    });
  }

  // счетчик совершенных выделений для записи
  incrementSelectedItem() {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.selected) {
          item.countSelected ++;
        }
        return item;
      }),
    });
  }

  // получить максимальный код
  getMaxCode() {
    return Math.max(...this.state.list.map(element => element.code));
  }
}

export default Store;
