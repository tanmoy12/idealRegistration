import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});
class ParticipantTable extends React.Component {
  render() {
    const { classes, participants } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Email</CustomTableCell>
              <CustomTableCell>Contact No</CustomTableCell>
              <CustomTableCell>Institution</CustomTableCell>
              <CustomTableCell>Level</CustomTableCell>
              <CustomTableCell>Individual Events</CustomTableCell>
              <CustomTableCell>Team Events(Team Name)</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map(participant => {
              let iE = "";
              let tE = "";

              participant.individualEvent.forEach(iEv => {
                iE = iE + iEv + ",";
              });
              participant.teamEvent.forEach(iEv => {
                tE = tE + iEv.event_name + "(" + iEv.team_name + ")" + ",";
              });
              return (
                <TableRow className={classes.row} key={participant._id}>
                  <CustomTableCell component="th" scope="row">
                    {participant.name}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {participant.email}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {participant.contact}
                  </CustomTableCell>

                  <CustomTableCell component="th" scope="row">
                    {participant.institution}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {participant.level}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {iE}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {tE}
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ParticipantTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ParticipantTable);
