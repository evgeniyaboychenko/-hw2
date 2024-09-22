import React, { useCallback , useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import Result from './components/result';
import Item from './components/item';
import ItemBasket from './components/item-basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const listBasket = store.getState().listBasket;
  const totalQuantity = store.getState().totalQuantity;
  const finalPrice= store.getState().finalPrice;

  const [isShowModal, setIsShowModal ] = useState(false);

  const callbacks = {
    onCloseModal: () => {
      setIsShowModal(false);
    },

    onShowModal: () => {
      setIsShowModal(true);
    },

    onDeleteItemBasket: useCallback(
      code => {
        store.deleteItemBasket(code);
      },
      [store],
    ),

    onAddProduct:  useCallback(
      code => {
        store.addProduct(code);
      },
      [store],
    ),

  };

  return (
    <>
      <PageLayout>
        <Head>
          <h1>Магазин</h1>
        </Head>
        <Controls onShowModal={callbacks.onShowModal} totalQuantity={totalQuantity} finalPrice={finalPrice}/>
        <List>
          {list.map(item => (
            <div key={item.code} className="List-Item">
              <Item item={item} onAddProduct={callbacks.onAddProduct} />
          </div>
          ))}
        </List>
      </PageLayout>
      <ModalLayout isShowModal={isShowModal} onCloseModal={callbacks.onCloseModal}>
        <Head>
          <h1>Корзина</h1>
          <button className='Modal-Close' onClick={callbacks.onCloseModal}>Закрыть</button>
        </Head>
        <div className="Modal-Content">
          <List>
            {listBasket.map(item => (
              <div key={item.code} className="List-Item">
                <ItemBasket item={item} onDeleteItemBasket={callbacks.onDeleteItemBasket}/>
            </div>
            ))}
          </List>
          <Result finalPrice={finalPrice}/>
        </div>
      </ModalLayout>
    </>
  );
}

export default App;
