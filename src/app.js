import React, { useCallback , useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const listBasket = store.getState().listBasket;

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
    <PageLayout>
      <Head>
        <h1>Магазин</h1>
      </Head>
      <Controls onShowModal={callbacks.onShowModal} listBasket = {listBasket} />
      <List
        list={list}
        onAddProduct={callbacks.onAddProduct}
      />
      <Modal isShowModal={isShowModal} onCloseModal={callbacks.onCloseModal} list={listBasket} onDeleteItemBasket={callbacks.onDeleteItemBasket}/>
    </PageLayout>
  );
}

export default App;
