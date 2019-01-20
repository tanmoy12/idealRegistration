import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import NotFound from "./Components/NotFound";
import AdminPage from "./Components/AdminPage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#66bb6a"
    },
    secondary: {
      main: "#4169e1"
    },
    ternary: {
      main: "#ef3836"
    },
    writing: {
      main: "#757575"
    },
    solid: {
      main: "#e0e0e0"
    },
    blue: {
      main: "#87ceeb"
    }
  }
});

const Main = () => (
  <main>
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </MuiThemeProvider>
  </main>
);

export default Main;
