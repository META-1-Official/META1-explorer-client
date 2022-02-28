import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import AppHeader from '../AppHeader';
import {AppFooter} from '../AppFooter';
import {ErrorBoundary} from '../ErrorBoundary';

export const PrimaryRoutes = ({routes}) => {
  return (
    <div className="container">
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
