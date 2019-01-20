import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, FormHelperText } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    display: "flex",
    flex: 1,
    flexDirection: "flex-end"
  },
  textField: {
    width: 200
  }
};
class UserInput extends React.Component {
  state = {
    name: "",
    password: "",
    showPassword: false
  };
  handleChange = props => events => {
    this.setState({ [props]: events.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  login = () => {
    this.props.login(this.state.name, this.state.password);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormHelperText
          id="component-error-text"
          style={{ color: "red", fontSize: 30 }}
        >
          {this.props.glberr}
        </FormHelperText>
        <TextField
          id="standard-search"
          label="Name"
          placeholder="Enter Your Name"
          type="search"
          value={this.state.name}
          onChange={this.handleChange("name")}
          className={classes.input}
          margin="normal"
        />
        <TextField
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            type={this.state.showPassword ? "text" : "password"}
            label="Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        <Button
          variant="contained"
          style={{ margin: 10 }}
          color="secondary"
          onClick={this.login}
        >
          Login
        </Button>
      </div>
    );
  }
}

UserInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserInput);
