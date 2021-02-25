import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { StylesProvider } from '@material-ui/core/styles';

import './App.css';

import Landing from './views/Landing';
import ViewSkin from './views/ViewSkin';
import EditSkin from './views/EditSkin';
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
              <Route path="/skin/edit/:skinId" children={<EditSkin />}/>
              <Route path="/skin/:skinId" children={<ViewSkin />}/>
              <Route exact path="/" children={<Landing />} />
            </Switch>
          </content>          
        </div>
      </Router>
      </StylesProvider>
  );
}
