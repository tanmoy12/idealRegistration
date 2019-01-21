import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MenuItem, Button, FormHelperText } from "@material-ui/core";
import { userInput } from "../../Validator/userValidator";
const styles =theme=>( {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin:'0 10%',
    marginBottom:'5%'
  },
  input: {
    // [theme.breakpoints.up('sm')]: {
    //   width:450
    // },
    width:"100%",
    maxWidth:450,
    display: "flex",
    flex: 1,
    flexDirection: "flex-end"
  },
  textField: {
    [theme.breakpoints.up('sm')]: {
      width:450
    }
    //width: 200
  }
});
let level = ["Primary", "Secondary", "College", "University"];
class UserInput extends React.Component {
  state = {
    name: "",
    institution: "",
    email: "",
    contact: "",
    level: "Primary",
    error: {},
    button:false
  };
  handleChange = props => events => {
    this.setState({ [props]: events.target.value });
  };
  addUser = () => {
    let data = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      institution: this.state.institution,
      level: this.state.level
    };
    const { isValid, errors } = userInput(data);
    if (!isValid) {
      this.setState({ error: errors });
    } else {
      this.props.addParitcipant(data);
      // this.setState({
      //   error: {},
      //   name: "",
      //   email: "",
      //   institution: "",
      //   contact: ""
      // });
    }
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
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {this.state.error.name}
        </FormHelperText>
        <TextField
          id="standard-search"
          label="Email"
          placeholder="Enter Your Email"
          type="search"
          value={this.state.email}
          onChange={this.handleChange("email")}
          className={classes.input}
          margin="normal"
        />
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {this.state.error.email}
        </FormHelperText>
        <TextField
          id="standard-search"
          label="Institution"
          placeholder="Enter Your Institution"
          type="search"
          value={this.state.institution}
          onChange={this.handleChange("institution")}
          className={classes.input}
          margin="normal"
        />
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {this.state.error.institution}
        </FormHelperText>
        <TextField
          id="standard-search"
          label="Contact Number"
          placeholder="Enter Your Contact Number"
          type="search"
          value={this.state.contact}
          onChange={this.handleChange("contact")}
          className={classes.input}
          margin="normal"
        />
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {this.state.error.contact}
        </FormHelperText>
        <TextField
          select
          //className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Level"
          value={this.state.level}
          onChange={this.handleChange("level")}
          className={classes.input}
        >
          {level.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormHelperText id="component-error-text" style={{ color: "red" }}>
          {this.state.error.level}
        </FormHelperText>
        <Button
        disabled={this.props.button}
          variant="contained"
          style={{ margin: 10 }}
          color="secondary"
          onClick={this.addUser}
        >
          Register
        </Button>
      </div>
    );
  }
}

UserInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserInput);
