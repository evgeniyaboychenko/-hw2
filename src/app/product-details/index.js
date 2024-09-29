import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import { Pages_Ids, menuList } from '../../constants';
import Head from '../../components/head';
import Wrapper from '../../components/wrapper';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Menu from '../../components/menu';
import Information from '../../components/information';
import { Link, useParams, useLocation } from "react-router-dom";

function ProductDetails() {
  const store = useStore();
  let params = useParams();

  useEffect(() => {
    store.actions.productDetails.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    _id: state.productDetails._id,
    title: state.productDetails.title,
    description: state.productDetails.description,
    madeIn: state.productDetails.madeIn,
    madeInCode: state.productDetails.madeInCode,
    category: state.productDetails.category,
    edition: state.productDetails.edition,
    price: state.productDetails.price,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const info = {
    _id: select._id,
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
    addToBasket: useCallback((basketItem) => store.actions.basket.addToBasket(basketItem), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout
      head= {<Head title={info.title} />}
      children = {
        <>
          <Wrapper>
            <>
              <Menu currenPageId = {''} menuList= {menuList}/>
              <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
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
