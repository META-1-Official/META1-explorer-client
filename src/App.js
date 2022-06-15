import { BrowserRouter as Router } from 'react-router-dom';

import { routes } from './routes';
import { PrimaryRoutes } from './components/PrimaryRoutes';

import { useDispatch } from 'react-redux';
import { fetchActiveAssets } from './store/explorer/actions';
import { useEffect } from 'react';
import GlobalStyle from './styles/globalStyle';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActiveAssets());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <PrimaryRoutes routes={routes} />
      </Router>
    </>
  );
}

export default App;
