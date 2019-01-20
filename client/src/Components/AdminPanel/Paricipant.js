import React from "react";

import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { getParticpants } from "../../Axios/Axios";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import ParticipantTable from "./ParticipantTable";
const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "0 5%"
  },
  searchItem: {
    display: "flex",
    margin: "2% 2%"
  },
  button: {
    padding: "0 0",
    margin: "0 0"
    // minHeight: 0,
    //minWidth: 0
  },
  dropDown: {
    minWidth: "150px"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: "5%"
  },
  loading: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    margin: "20% 0"
  },
  arrowButton: {
    margin: "0 3%"
  }
});
class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextLoading: "loaded",
      prevLoading: "loaded",
      loading: "loaded",
      page: 1,
      participantList: [],
      glbErr: "",
      next: true,
      prev: true
    };
  }
  clear = prop => {
    this.setState({ [prop]: "" });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // handleSearch = () => {
  //     this.setState({ searchLoading: "loading", page: 1 }, () => {
  //         let that = this;
  //         getParticpants(
  //             this.state.page,
  //             (err, data) => {
  //                 if (!err) {
  //                     //console.log(data.admins, "data");
  //                     that.setState({
  //                         logList: data.logs,
  //                         searchLoading: "loaded",
  //                         next: false,
  //                         glbErr: ""
  //                     });
  //                     if (data.logs.length < 29) {
  //                         that.setState({ next: true });
  //                     }
  //                 }
  //             }
  //         );
  //     });
  // };
  handlePrev = () => {
    let page = this.state.page;
    if (page > 1) {
      page--;
    }
    if (page === 1) {
      this.setState({ prev: true });
    }
    this.setState({ prevLoading: "loading" }, () => {
      let that = this;
      getParticpants(page, (err, data) => {
        if (!err) {
          //console.log(data.admins, "data");
          that.setState({
            participantList: data.participants,
            prevLoading: "loaded",
            page: page,
            next: false,
            glbErr: ""
          });
        }
      });
    });
  };
  handleNext = () => {
    let page = this.state.page;
    page++;
    this.setState({ nextLoading: "loading" }, () => {
      let that = this;
      getParticpants(page, (err, data) => {
        if (!err) {
          //console.log(data.admins, "data");
          if (data.logs.length > 29) {
            that.setState({
              participantList: data.participants,
              page: page,
              nextLoading: "loaded",
              prev: false,
              glbErr: ""
            });
          } else {
            that.setState({
              nextLoading: "loaded",
              glbErr: "No more Data",
              next: true
            });
          }
        }
      });
    });
  };

  componentDidMount = () => {
    let that = this;

    getParticpants(0, (err, data) => {
      if (data) {
        console.log(data, "data");
        that.setState({
          participantList: data.participants,
          prev: true,
          glbErr: "",
          next: false,
          loading: "loaded"
        });
        if (data.logs.length < 29) {
          that.setState({ next: true });
        }
      }
    });
  };
  render() {
    //const { date, time } = this.state;
    const { classes } = this.props;
    // console.log(this.state.date);
    return (
      <div>
        <div>
          {this.state.loading === "loading" && (
            <div className={classes.loading}>
              <CircularProgress color="primary" size={200} />
            </div>
          )}
          {this.state.loading === "loaded" && (
            <div className={classes.searchItem}>
              <ParticipantTable participants={this.state.participantList} />
            </div>
          )}
          <div className={classes.pagination}>
            {this.state.prevLoading === "loading" && (
              <div className={classes.SearchIcon}>
                <CircularProgress color="primary" />
              </div>
            )}
            <Button
              className={classes.arrowButton}
              onClick={this.handlePrev}
              disabled={this.state.prev}
            >
              <KeyboardArrowLeft />
              Previous
            </Button>
            <FormHelperText
              id="component-error-text"
              style={{
                color: "primary",
                marginTop: 8,
                fontSize: 20
              }}
            >
              {this.state.page}
            </FormHelperText>
            <Button
              className={classes.arrowButton}
              onClick={this.handleNext}
              disabled={this.state.next}
            >
              Next
              <KeyboardArrowRight />
            </Button>
            {this.state.nextLoading === "loading" && (
              <div className={classes.SearchIcon}>
                <CircularProgress color="primary" />
              </div>
            )}
            <FormHelperText
              id="component-error-text"
              style={{ color: "red", marginTop: 8, fontSize: 20 }}
            >
              {this.state.glbErr}
            </FormHelperText>
          </div>
        </div>
      </div>
    );
  }
}
Logs.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Logs);
