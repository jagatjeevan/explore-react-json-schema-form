import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import CombinedForm from "./components/CombinedForm";
import SampleForm from "./components/SampleForm";
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
          <li>
            <Link to="/combined-form">Combined Form</Link>
          </li>
          <li>
            <Link to="/sample-form">Sample Form</Link>
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
            <Route path="/combined-form">
              <CombinedForm />
            </Route>
            <Route path="/sample-form">
              <SampleForm />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
