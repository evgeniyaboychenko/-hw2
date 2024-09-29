import { codeGenerator } from '../../utils';
import StoreModule from '../module';
import { ITEM_COUNT_ON_PAGE } from '../../constants';

class ProductDetails extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      info: {
        title: '',
        description: '',
        madeIn: '',
        category: '',
        edition: '',
        price: 0,
      }
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        madeIn: json.result.madeIn.title,
        madeInCode: json.result.madeIn.code,
        category:  json.result.category.title,
        edition: json.result.edition,
        price: json.result.price,
      },
      'Загружена информация товара из АПИ',
    );
  }
}

export default ProductDetails;
