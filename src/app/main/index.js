import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { Pages_Ids, menuList } from '../../constants';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Menu from '../../components/menu';
import Pagination from '../../components/pagination';
import Wrapper from '../../components/wrapper';
import { getPageCount } from '../../utils';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(1);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    activePageNumber: state.catalog.activePageNumber,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((basketItem) => store.actions.basket.addToBasket(basketItem), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //загрузка данных при переключении страницы
    loadingData: useCallback(pageNumber => store.actions.catalog.load(pageNumber), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} linkTo={`products/${item._id}`} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout
      head = {<Head title="Магазин" />}
      children = {
        <>
          <Wrapper>
            <>
              <Menu currenPageId = {Pages_Ids.MAIN} menuList= {menuList}/>
              <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            </>
          </Wrapper>
          <List list={select.list} renderItem={renders.item} />
          <Pagination pageCount = {getPageCount(select.count)} activePageNumber={select.activePageNumber} onSwitch = {callbacks.loadingData}></Pagination>
        </>
    }>
    </PageLayout>
  );
}

export default memo(Main);
