import StoreModule from '../module';

/**
 * Список фильтров
 */
class FilterState extends StoreModule {
  initState() {
    return {
      categoryList: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      categoryList: [],
      waiting: true,
    });

    try {
      const response = await fetch(
        // `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        `/api/v1/categories?fields=_id,title,parent(_id)`
      );
      const json = await response.json();

      // Список категорий загружены успешно
      this.setState(
        {
          categoryList: json.result.items,
          waiting: false,
        },
        'Загружен список категорий из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        categoryList: [],
        waiting: false,
      });
    }
  }
}

export default FilterState;
