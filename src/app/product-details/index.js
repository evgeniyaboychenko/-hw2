import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Wrapper from '../../components/wrapper';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
// import Main from '../main';
import Information from '../../components/information';
import { Link, useParams, useLocation } from "react-router-dom";

function ProductDetails() {
  const store = useStore();
  let params = useParams();

  useEffect(() => {
    store.actions.productDetails.load(params.id);
  }, []);

  const select = useSelector(state => ({
    id: state.productDetails.id,
    title: state.productDetails.title,
    description: state.productDetails.description,
    madeIn: state.productDetails.madeIn,
    madeInCode: state.productDetails.madeInCode,
    category: state.productDetails.category,
    edition: state.productDetails.edition,
    price: state.productDetails.price,
    // list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    // count: state.catalog.count,
    // activePageNumber: state.catalog.activePageNumber,
  }));

  const info = {
    id: select.id,
    title: select.title,
    description: select.description,
    madeIn: select.madeIn,
    madeInCode: select.madeInCode,
    category: select.category,
    edition: select.edition,
    price: select.price,
  }

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  // const renders = {
  //   item: useCallback(
  //     item => {
  //       return <Item item={item} onAdd={callbacks.addToBasket} />;
  //     },
  //     [callbacks.addToBasket],
  //   ),
  // };

  return (
    <PageLayout
      head= {<Head title={info.title} />}
      children = {
        <>
          <Wrapper>
            <>
              <Link to = {`/`} href="index.html" className='link'>
                Главная
              </Link>
              <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            </>
          </Wrapper>
          <Information info={info} onAdd={callbacks.addToBasket} />
        </>
      }
      >
      </PageLayout>
  );
}

export default memo(ProductDetails);
