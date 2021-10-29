import React from "react";
import SmartFrame from "./components/SmartFrame";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App = () => {
  return(
    <Router>
      <Switch>
        <Route path="/">
          {/* MAIN PAGE */}
          <SmartFrame />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;