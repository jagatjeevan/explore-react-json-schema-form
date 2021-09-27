import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import SingleField from "./components/SingleField";

const Routes = () => {
  return (
    <Router>
      <div className="app-layout">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/single-field">Single Field</Link>
          </li>
        </ul>
        <div>
          <Switch>
            <Route path="/" exact>
              <App />
            </Route>
            <Route path="/single-field">
              <SingleField />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
