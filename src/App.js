import { BrowserRouter as Router } from 'react-router-dom';

import { routes } from './routes';
import {PrimaryRoutes} from './components/PrimaryRoutes';

import { createGlobalStyle } from 'styled-components';

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
        background: #FFC000 !important;
      }
      &:hover {
        background: #15171B;
      }
    }
  }
`;

function App() {
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
