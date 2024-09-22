import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
   * Удаление товара из корзины
   * @param code
   */
    deleteItemBasket(code) {
      const newListBasket = this.state.listBasket.filter(item => item.code !== code);
      this.setState({
        ...this.state,
        listBasket: newListBasket,
        finalPrice: newListBasket.reduce((acc, item)=> acc + item.price*item.count, 0),
        totalQuantity: newListBasket.length,
      });
    }

  /**
   * Добавление товара в корзину
   * @param code
   */
    addProduct(code) {
      const newListBasket = this.state.listBasket.some(item => item.code === code) ? this.state.listBasket.map(item => {
        if (item.code === code) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      }) : [...this.state.listBasket, {...this.state.list.find(item => item.code === code), count: 1}];

      this.setState({
        ...this.state,
        listBasket: newListBasket,
        finalPrice: newListBasket.reduce((acc, item)=> acc + item.price*item.count, 0),
        totalQuantity: newListBasket.length,
      });
    }
}

export default Store;
