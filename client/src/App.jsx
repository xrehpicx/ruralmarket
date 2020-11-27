import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import "./components/css/App.css";

// components
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// routes
import Home from "./components/Home";
import { Login, Signup } from "./components/SignLog";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#33c971",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
