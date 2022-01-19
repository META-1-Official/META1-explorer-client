import {BrowserRouter as Router} from 'react-router-dom';

import {routes} from './routes';
import {PrimaryRoutes} from './components/Route';

import './App.scss';

function App() {
  return (
    <Router>
      <PrimaryRoutes routes={routes} />
    </Router>
  );
}

export default App;
