import { BrowserRouter as Router } from 'react-router-dom';

import { routes } from './routes';
import { PrimaryRoutes } from './components/PrimaryRoutes';

import { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchActiveAssets } from './store/explorer/actions';
import { useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
  .MuiMenu-list {
    background-color: black;
    border: 1px solid rgba(255, 255, 255, 0.1);
    .MuiMenuItem-root {
      a {
        color: white;
        text-decoration: none;
      }
      div {
        color: white;
        text-decoration: none;
      }
      &.Mui-selected {
        background: #FFC000;
      }
      &:hover {
        background: #15171B;
      }
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .navbar-item {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 0 10px;
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  
    &.active {
      color: #FFC000
    }
  
    &:hover {
      color: #FFC000
    }
  }

  .sel-item {
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  
    &.active {
      color: #FFC000
    }
  
    &:hover {
      color: #FFC000
    }
  }
`;

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
