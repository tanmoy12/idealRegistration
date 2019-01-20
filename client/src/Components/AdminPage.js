import React, { Component } from "react";
import Header from "./Header/Header";
import { withStyles } from "@material-ui/core/styles";
import Paricipant from "./AdminPanel/Paricipant";
import Login from "./AdminPanel/Login";

const styles = theme => ({
  border: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    margin: "2% 10%",
    borderBottom: "ridge"
  }
});

class AdminPage extends Component {
  state = {
    tabname: "Admin Panel Login ",
    glberr: "",
    tabs: 0,
    participant: {}
  };
  login = (name, pass) => {
    if (name === "NDCenglishcarnival" && pass === "ndc1234english") {
      this.setState({ tabs: 1, tabname: "Admin Panel", glberr: "" });
    } else {
      this.setState({ glberr: "Invalid Login" });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.border}>
          <div style={{ margin: "1% 5%" }}>{this.state.tabname}</div>
        </div>
        {this.state.tabs === 1 && <Paricipant />}
        {this.state.tabs === 0 && (
          <Login glberr={this.state.glberr} login={this.login} />
        )}
        <div className={classes.border} />
      </div>
    );
  }
}

export default withStyles(styles)(AdminPage);
