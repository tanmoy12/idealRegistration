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
const styles = theme => ({
  root: {
    display: "flex",
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: '0 10%'
    },
  },

  input: {
    display: "flex",
    [theme.breakpoints.up('md')]: {
      flex: 1,
      marginLeft: "10%"
    },
    flexDirection: "column"
  },
  input1: {
    display: "flex",
    [theme.breakpoints.up('md')]: {
      flex: 1,
      marginRight: "10%"
    },
    flexDirection: "column"
  },
  textField: {

    width: 200
  }

});

const jInd = {
  "eo": "English Olympiad",
  "sm": "Spell Master",
  "wg": "Word Game",
  "is": "Instant Story writing",
  "ft": "Flick Through",
  "ma": "Marvel & DC quiz",
  "rc": "Recitation",
  "pc": "Photography contest and submission",
  "cs": "Composition submission",
  "sc": "Sketch competition",
  "sb": "Scrap book"
}

const jTeam = {
  "bb": "Book based quiz",
  "mq": "Mega quiz",
  "pc": "Binge trivia",
  "wm": "Wall magazine"
}

const sInd = {
  "eo": "English Olympiad",
  "sm": "Spell Master",
  "wg": "Word Game",
  "is": "Instant Story writing",
  "ft": "Flick Through",
  "ms": "Marvel & DC quiz",
  "tc": "Turn Coat ",
  "es": "Extempore Speech",
  "rc": "Recitation ",
  "pc": "Photography contest and submission",
  "cs": "Composition submission",
  "sc": "Sketch competition ",
  "sb": "Scrap book"
}

const sTeam = {
  "lq": "Literature quiz",
  "bb": "Book based quiz",
  "mq": "Mega quiz",
  "pc": "POP culture quiz",
  "wm": "Wall magazine",
  "mp": "Multimedia presentation",
}

const cInd = {
  "eo": "English Olympiad",
  "sm": "Spell Master",
  "wg": "Word Game",
  "is": "Instant Story Writing",
  "ft": "Flick Through",
  "md": "Marvel & DC quiz",
  "tc": "Turn Coat",
  "es": "Extempore Speech",
  "rc": "Recitation",
  "pc": "Photography Contest and Submission",
  "cs": "Composition Submission",
  "sc": "Sketch Competition",
  "sb": "Scrap Book"
}

const cTeam = {
  "lc": "Literature Quiz",
  "bb": "Book Based Quiz",
  "mq": "Mega Quiz",
  "pc": "Binge trivia",
  "wm": "Wall Magazine",
  "mp": "Multimedia presentation"
}

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    let ind, team;
    if (props.participant.level === 'Junior') {
      ind = jInd;
      team = jTeam;
    } else if (props.participant.level === "Secondary") {
      ind = sInd;
      team = sTeam;
    } else {
      ind = cInd;
      team = cTeam;
    }

    let inds = [];
    Object.keys(ind).forEach(key => {
      inds.push({
        value: ind[key],
        selected: false
      })
    })

    let teams = [];
    Object.keys(team).forEach(key => {
      teams.push({
        value: team[key],
        name: '',
        selected: false
      })
    })

    this.state = {
      indObj: inds,
      teamObj: teams,
      errors: {},
      glberr: '',
      pLoading: false
    }
  }

  addEvent = () => {
    let individual_events = [];
    let team_event = [];
    this.setState({pLoading: true});

    this.state.indObj.forEach(ind => {
      if (ind.selected) individual_events.push(ind.value);
    })

    let flag = false;
    this.state.teamObj.forEach(team => {
      if (team.selected) {
        if (!team.name) {
          flag = true;
          this.setState({ glberr: "Team names can not be blank" });
        }
        else {
          team_event.push({
            name: team.name,
            value: team.value
          })
        }
      }
    })

    if (flag) return;

    this.props.addEvents(
      individual_events,
      team_event,
      this.props.participant._id
    );
    this.setState({pLoading: false});
  }

  handleChangeInd = (i) => {
    let indObj = this.state.indObj;
    indObj[i].selected = !this.state.indObj[i].selected;
    this.setState({ indObj });
  }

  handleChangeTeam = (i) => {
    let teamObj = this.state.teamObj;
    teamObj[i].selected = !this.state.teamObj[i].selected;
    this.setState({ teamObj });
  }

  handleChangeTeamName = (e, i) => {
    let teamObj = this.state.teamObj;
    teamObj[i].name = e.target.value;
    this.setState({ teamObj });
  }

  render() {
    const { classes } = this.props;
    //console.log(this.props.participant.level)
    return (
      <div >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <FormHelperText
            id="component-error-text"
            style={{ color: "red", fontSize: 20 }}
          >
            {this.props.glberr}
          </FormHelperText>
        </div>
        <div className={classes.root}>
          <div className={classes.input} >
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Individual Events</FormLabel>
              {this.state.indObj.map((ind, i) => (
                <FormControlLabel key={i}
                  control={
                    <Checkbox
                      checked={ind.selected}
                      onChange={() => this.handleChangeInd(i)}
                      value={ind.value}
                    />
                  }
                  label={ind.value}
                />
              ))}
            </FormControl>
          </div>
          <div className={classes.input1}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Team Events</FormLabel>
              <FormHelperText style={{ color: "green", fontSize: 18 }}>
                You and Your Team mates should have the same Team name
              </FormHelperText>
              <FormGroup>
                {this.state.teamObj.map((tm, i) => (
                  <React.Fragment key={i}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={tm.selected} onChange={() => this.handleChangeTeam(i)} value={tm.value} />
                      }
                      label={tm.value}
                    />
                    <TextField
                      disabled={!tm.selected}
                      label="Team Name"
                      placeholder="Enter a Team Name"
                      value={tm.name}
                      onChange={(e) => this.handleChangeTeamName(e, i)}
                    />
                    <FormHelperText style={{ color: "red" }}>{this.state.errors[tm.value]}</FormHelperText>
                  </React.Fragment>
                ))}

              </FormGroup>
            </FormControl>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexFlow: 'column',
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            style={{ margin: 10 }}
            color="secondary"
            onClick={this.addEvent}
            disabled={this.state.pLoading}
          >
            Participate
          </Button>
          <FormHelperText
            id="component-error-text"
            style={{ color: "red", fontSize: 20 }}
          >
            {this.state.glberr}
          </FormHelperText>
        </div>
      </div>
    );
  }
}

UserInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserInput);
