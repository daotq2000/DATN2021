import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import Login from "./pages/Login";
import PrivateRouter from "./utils/PrivateRouter";
import AdminRouter from "./utils/AdminRouter";
import configStore from "./utils/configStore";
import { Provider } from 'react-redux';
const store = configStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path="/login" component={() => <Login />} exact={true} />
            <Route
              path="/admin"
              component={() => <PrivateRouter component={AdminRouter} />}
              exact={false}
            />
            <Route exact path="/" component={() => <Redirect to="/admin" />} />
            {/* <Route exact path="/">
              {history.push("/admin")}
            </Route> */}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
