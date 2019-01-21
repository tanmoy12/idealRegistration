import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, FormHelperText } from "@material-ui/core";
import { eventInput } from "../../Validator/eventValidator";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const styles =theme=>( {
  root: {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  input: {
    display: "flex",
    //justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column"
  },
  textField: {
    
   width: 200
  }

});
class UserInput extends React.Component {
  state = {
    sm: false,
    eo: false,
    r: false,
    tc: false,
    es: false,
    isw: false,
    wp: false,
    cs: false,
    pnr: false,
    wms: false,
    ss: false,
    mp: false,
    lq: false,
    gq: false,
    mq: false,
    mptm: "",
    lqtm: "",
    gqtm: "",
    mqtm: "",
    errors: {},
    ecnt:0,
    glberr:""
  };

  handleState = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChange = name => event => {
    let e=event.target.checked;
    if(this.state.ecnt<=4 && e){
      this.setState({[name]: e,ecnt:this.state.ecnt+1,glberr:""})
    }
    else if(e){
      this.setState({glberr:'You can participate atmost 5 events.'})
    }
    else if(this.state.ecnt>0 && !e){
      this.setState({[name]: e,ecnt:this.state.ecnt-1,glberr:""})
    }
    //this.setState({ [name]: event.target.checked });
  };

  addEvent = () => {
    let individual_events = [];
    let team_event = [];
    const {
      sm,
      eo,
      r,
      tc,
      es,
      isw,
      wp,
      cs,
      pnr,
      wms,
      ss,
      mp,
      lq,
      gq,
      mq,
      mptm,
      gqtm,
      lqtm,
      mqtm
    } = this.state;
    let data = {
      mp: mp,
      mq: mq,
      lq: lq,
      gq,
      mptm: mptm,
      gqtm: gqtm,
      lqtm: lqtm,
      mqtm: mqtm
    };
    const { isValid, errors } = eventInput(data);
    if (!isValid) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: {} });
      if (sm) {
        individual_events.push("Spell Master");
      }
      if (eo) {
        individual_events.push("English Olympiad");
      }
      if (r) {
        individual_events.push("Recitation");
      }
      if (tc) {
        individual_events.push("Turn Coat");
      }
      if (es) {
        individual_events.push("Extempore Speech");
      }
      if (isw) {
        individual_events.push("Instant Story Writting");
      }
      if (wp) {
        individual_events.push("Word Play");
      }
      if (cs) {
        individual_events.push("Composition Submission");
      }
      if (pnr) {
        individual_events.push("Parody News Reading");
      }
      if (wms) {
        individual_events.push("Wall Magazine Submission");
      }
      if (ss) {
        individual_events.push("Scrapbook Submission");
      }
      if (mp) {
        let e = {
          event_name: "Multimedia Presentation",
          team_name: this.state.mptm
        };
        team_event.push(e);
      }
      if (lq) {
        let e = {
          event_name: "Lit Quiz",
          team_name: this.state.lqtm
        };
        team_event.push(e);
      }
      if (gq) {
        let e = {
          event_name: "G.O.T Quiz",
          team_name: this.state.gqtm
        };
        team_event.push(e);
      }
      if (mq) {
        let e = {
          event_name: "Mega Quiz",
          team_name: this.state.mqtm
        };
        team_event.push(e);
      }
      this.props.addEvents(
        individual_events,
        team_event,
        this.props.participant._id
      );
    }
  };
  render() {
    const { classes } = this.props;
    const {
      sm,
      eo,
      r,
      tc,
      es,
      isw,
      wp,
      cs,
      pnr,
      wms,
      ss,
      mp,
      lq,
      gq,
      mq
    } = this.state;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
         <FormHelperText
            id="component-error-text"
            style={{ color: "red", fontSize: 20 }}
          >
            {this.state.glberr}
          </FormHelperText>
          <FormHelperText
            id="component-error-text"
            style={{ color: "red", fontSize: 20 }}
          >
            {this.props.glberr}
          </FormHelperText>
        </div>
        <div style={{ display: "flex" }}>
          <div className={classes.input}>
              <FormControl  className={classes.formControl}>
              <FormLabel component="legend">Individual Events</FormLabel>
                {this.props.participant.level !== "University" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sm}
                        onChange={this.handleChange("sm")}
                        value="sm"
                      />
                    }
                    label="Spell Master"
                  />
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={eo}
                      onChange={this.handleChange("eo")}
                      value="eo"
                    />
                  }
                  label="English Olympiad"
                />
                {this.props.participant.level !== "University" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={r}
                        onChange={this.handleChange("r")}
                        value="r"
                      />
                    }
                    label="Recitation"
                  />
                )}
                {this.props.participant.level !== "University" ||
                  (this.props.participant.level !== "Primary" && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tc}
                          onChange={this.handleChange("tc")}
                          value="tc"
                        />
                      }
                      label="Turn Coat"
                    />
                  ))}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={es}
                      onChange={this.handleChange("es")}
                      value="es"
                    />
                  }
                  label="Extempore Speech"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isw}
                      onChange={this.handleChange("isw")}
                      value="isw"
                    />
                  }
                  label="Instant Story Writting"
                />
                {this.props.participant.level !== "University" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={wp}
                        onChange={this.handleChange("wp")}
                        value="wp"
                      />
                    }
                    label="Word Play"
                  />
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cs}
                      onChange={this.handleChange("cs")}
                      value="cs"
                    />
                  }
                  label="Composition Submission"
                />
                {this.props.participant.level !== "University" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pnr}
                        onChange={this.handleChange("pnr")}
                        value="pnr"
                      />
                    }
                    label="Parody News Reading"
                  />
                )}
                {this.props.participant.level !== "University" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={wms}
                        onChange={this.handleChange("wms")}
                        value="wms"
                      />
                    }
                    label="Wall Magazine Submission"
                  />
                )}
                {this.props.participant.level !== "University" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ss}
                        onChange={this.handleChange("ss")}
                        value="ss"
                      />
                    }
                    label="Scrapbook Submission"
                  />
                )}
                 </FormControl>
          </div>
          <div className={classes.input}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Team Events</FormLabel>
              <FormHelperText style={{ color: "green", fontSize: 18 }}>
                You and Your TeamMates should have the same Team name
              </FormHelperText>
              <FormGroup>
                {(this.props.participant.level !== "University" ||
                  this.props.participant.level !== "Primary") && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mp}
                        onChange={this.handleChange("mp")}
                        value="mp"
                      />
                    }
                    label="Multimedia Presentation(Maximum 3 members)"
                  />
                )}
                <TextField
                  disabled={!mp}
                  id="standard-search"
                  label="Team Name"
                  placeholder="Enter a Team Name"
                  type="search"
                  value={this.state.mptm}
                  onChange={this.handleState("mptm")}
                  margin="normal"
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.errors.mp}
                </FormHelperText>
                {this.props.participant.level !== "Primary" && (
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={lq}
                          onChange={this.handleChange("lq")}
                          value="lq"
                        />
                      }
                      label="Literature Quiz(Maximum 3 members)"
                    />
                    <TextField
                      disabled={!lq}
                      id="standard-search"
                      label="Team Name"
                      placeholder="Enter a Team Name"
                      type="search"
                      value={this.state.lqtm}
                      onChange={this.handleState("lqtm")}
                      margin="normal"
                    />
                    <FormHelperText style={{ color: "red" }}>
                      {this.state.errors.lq}
                    </FormHelperText>
                  </div>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gq}
                      onChange={this.handleChange("gq")}
                      value="gq"
                    />
                  }
                  label="G.O.T Quiz(Maximum 3 members)"
                />
                <TextField
                  disabled={!gq}
                  id="standard-search"
                  label="Team Name"
                  placeholder="Enter a Team Name"
                  type="search"
                  value={this.state.gqtm}
                  onChange={this.handleState("gqtm")}
                  margin="normal"
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.errors.gq}
                </FormHelperText>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mq}
                      onChange={this.handleChange("mq")}
                      value="mq"
                    />
                  }
                  label="Mega Quiz(Maximum 5 members)"
                />
                <TextField
                  disabled={!mq}
                  id="standard-search"
                  label="Team Name"
                  placeholder="Enter a Team Name"
                  type="search"
                  value={this.state.mqtm}
                  onChange={this.handleState("mqtm")}
                  margin="normal"
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.errors.mq}
                </FormHelperText>
              </FormGroup>
            </FormControl>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            style={{ margin: 10 }}
            color="secondary"
            onClick={this.addEvent}
          >
            Participate
          </Button>
        </div>
      </div>
    );
  }
}

UserInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserInput);
