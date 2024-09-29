import { codeGenerator } from '../../utils';
import StoreModule from '../module';
import { ITEM_COUNT_ON_PAGE } from '../../constants';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
      activePageNumber: 0,
    };
  }

  async load(activePageNumber = 1) {
    const response = await fetch(`/api/v1/articles?limit=${ITEM_COUNT_ON_PAGE}&skip=${(activePageNumber-1) * ITEM_COUNT_ON_PAGE }}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count:  json.result.count,
        activePageNumber: activePageNumber,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
