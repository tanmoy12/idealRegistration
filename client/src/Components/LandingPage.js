import React, { Component } from "react";
import Header from "./Header/Header";
import UserInput from "./Input/UserInput";
import { withStyles } from "@material-ui/core/styles";
import { addParitcipant, addEvents } from "../Axios/Axios";
import { FormHelperText } from "@material-ui/core";
import EventInput from "./Input/EventInput";
const styles = theme => ({
  border: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    margin: "2% 10%",
    borderBottom: "ridge"
  }
});

class LandingPage extends Component {
  state = {
    tabname: "Participant Registration",
    glberr: "",
    tabs: 0,
    participant: {},
    button: false
  };
  handleaddParticipant = data => {
    let that = this;
    this.setState({ button: true }, () => {
      addParitcipant(
        data.name,
        data.institution,
        data.contact,
        data.email,
        data.level,
        (err, data) => {
          console.log(data, "data", err);
          if (!data) {
            that.setState({ glberr: err.msg, button: false });
          } else {
            that.setState(
              {
                tabname: "Event Registration",
                glberr: "",
                participant: data
              },
              () => {
                that.setState({ tabs: 1 });
              }
            );
          }
        }
      );
    });
  };
  addEvents = (individualEvents, teamEvents, id) => {
    let that = this;
    addEvents(
      individualEvents,
      teamEvents,
      id,
      this.state.participant,
      (err, data) => {
        if (!err) {
          that.setState({
            tabname: "Event Registration Completed",
            glberr: "",
            tabs: -1
          });
        } else {
          that.setState({ glberr: err.msg });
        }
      }
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.border}>
          <div style={{ margin: "1% 5%" }}>{this.state.tabname}</div>
        </div>
        {this.state.tabs === 0 && (
          <UserInput
            addParitcipant={this.handleaddParticipant}
            glberr={this.state.glberr}
            button={this.state.button}
          />
        )}
        {this.state.tabs === 1 && (
          <EventInput
            addEvents={this.addEvents}
            glberr={this.state.glberr}
            participant={this.state.participant}
          />
        )}
        {this.state.tabs === -1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FormHelperText
              id="component-error-text"
              style={{ color: "green", fontSize: 30, padding: 10 }}
            >
              Your Registration is completed successfully. Your entry pass will
							be sent to your mail very soon. [Please check your spam folder in case the mail reaches there and mark as "not spam"]
						</FormHelperText>
          </div>
        )}

        <div className={classes.border} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1%"
          }}
        >
          <p>
            {" "}
            Powered By{" "}
            <a target="_blank" href="https://headless.ltd">
              Headless Technologies Limited{" "}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
