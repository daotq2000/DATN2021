import * as React from "react";
import { Route, Redirect } from "react-router";

const PrivateRouter = ({ component: Component, ...rest }) => {
  // const localData = localStorage.getItem("USER");
  // const localJson = localData ? JSON.parse(localData) : {};
  // if (localJson.username && localData) {
  //   return (
  //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //     <Route {...rest} render={(props) => <Component {...props} />} />
  //   );
  // } else {
  //   return (
  //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //     <Route
  //       {...rest}
  //       render={() => <Redirect to={{ pathname: "/login" }} />}
  //     />
  //   );
  // }
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    <Route {...rest} render={(props) => <Component {...props} />} />
  );
};

export default PrivateRouter;
