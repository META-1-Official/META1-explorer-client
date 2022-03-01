import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {loadingStatusSelector} from '../../store/common/selectors';

import {AppHeader} from '../AppHeader';
import {AppFooter} from '../AppFooter';
import {ErrorBoundary} from '../ErrorBoundary';
import {Loader} from '../Loader';

export const PrimaryRoutes = ({routes}) => {
  const isLoading = useSelector(loadingStatusSelector);

  return (
    <div className="container">
      {isLoading && <Loader />}
      <AppHeader />
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
              {routes.map(({path, component: Component}) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </div>
      <AppFooter />
    </div>
  );
};
