import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import { useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <PageLayout
      head= {<Head title='404' />}
      children = {
        <div>
          Что-то пошло не так
        </div>
      }>
      </PageLayout>
  );
}

export default memo(ErrorBoundary);
