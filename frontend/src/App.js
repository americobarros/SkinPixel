
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

import './App.css';

import Landing from './views/Landing';
import SkinView from './views/ViewSkin';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/skin/3">View Skin</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/skin/:skinId" children={<SkinView />}/>
          <Route path="/" children={<Landing />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
