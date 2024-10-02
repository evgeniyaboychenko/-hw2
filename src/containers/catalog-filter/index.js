import { memo, useCallback, useMemo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    filter: state.catalog.params.filter,
    categoryList: state.filter.categoryList,
    // categoryList: state.catalog.categoryList,
  }));

  console.log(select.categoryList);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтрацмя
    onFilter: useCallback(filter => store.actions.catalog.setParams({ filter, page: 1 }), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };


  const setLevel = (array, lev) => {
    return array.map((item, ind) => {
        return {...item, level:  lev ?  lev + '' + ind : ind + '' };
    })
  }
  let www = [];
  const parents = select.categoryList.filter((item) => item.parent === null);
  const newparents = setLevel(parents);
  www =  www.concat(newparents);
  console.log(www);


  const gg = (parentsAll) => {
    parentsAll.forEach((element,) => {
    const childrens = setLevel(select.categoryList.filter((item) => {
      if(item.parent && item.parent._id===element._id)
        return true
    }), element.level );

    if(childrens.length!==0) {
        www =www.concat(childrens);
        console.log(www);
        gg(childrens);
      }
      else return;
    });
  }

  gg(newparents);

    const rrr = www.sort((a, b) => {
    if (a.level > b.level) {
      return 1;
    }
    if (a.level < b.level) {
      return -1;
    }
    return 0;
  });

  console.log(rrr);

  const categories = {
    filter: useMemo(
      () => [
        { value: '', title: 'Все' },
        { value: '66fab39363bfe248a856308c', title: 'Электроника' },
        { value: '66fab39363bfe248a856308d', title: '-телефоны' },
        { value: '66fab39363bfe248a856308e', title: '--смартфоны' },
        { value: 'aks', title: 'аксессуры' },
        { value: 'nout', title: 'ноутбуки' },
        { value: 'tv', title: 'телевизор' },
        { value: 'books', title: 'книги' },
        { value: 'learn', title: 'учебники' },
        { value: 'hud', title: 'художественная' },
        { value: 'comics', title: 'комиксы' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={categories.filter} value={select.filter} onChange={callbacks.onFilter} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
