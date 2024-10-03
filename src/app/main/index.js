import { memo, useCallback, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import PageTop from '../../components/page-top';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    userData: state.auth.userData,
  }));

  useEffect(() => {
    store.actions.filter.loadCategories();
  }, []);

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const callbacks = {
    userExit: useCallback(() => store.actions.auth.userExit(), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <PageTop onExit={callbacks.userExit} isAuth={select.isAuth} userName={select.userData.profile?.name}></PageTop>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
