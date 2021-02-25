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
          <Header />
          <content>
            <Switch>
              <Route path="/account" children={<Account />}/>
              <Route path="/skin/:skinId" children={<SkinView />}/>
              <Route exact path="/" children={<Landing />} />
            </Switch>
          </content>          
        </div>
      </Router>
      </StylesProvider>
  );
}
