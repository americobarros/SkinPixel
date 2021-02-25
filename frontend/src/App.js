import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

import { StylesProvider } from '@material-ui/core/styles';

import './App.css';

import Landing from './views/Landing';
import SkinView from './views/ViewSkin';
import Account from './views/Account';

import Header from './components/Header';

export default function App() {
  return (
    <StylesProvider injectFirst>
      <Router>
        <div>
          <ul style={{ position: 'absolute', bottom: '0' }}>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/skin/3">View Skin</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
          <Header />

          <Switch>
            <Route path="/account" children={<Account />}/>
            <Route path="/skin/:skinId" children={<SkinView />}/>
            <Route path="/" children={<Landing />} />
          </Switch>
        </div>
      </Router>
      </StylesProvider>
  );
}
