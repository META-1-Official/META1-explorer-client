import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import ErrorBoundary from '../ErrorBoundary';

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledContent = styled.div`
  width: 100%;
  min-height: calc(100vh - 140px);
  background-color: ${(props) => props.theme.palette.background.nearBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PrimaryRoutes = ({ routes }) => {
  return (
    <StyledLayout>
      <AppHeader />
      <StyledContent>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </StyledContent>
      <AppFooter />
    </StyledLayout>
  );
};
