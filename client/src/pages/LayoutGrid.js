import React from 'react';

//MUI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  centerColumn: {
    borderRightColor: theme.palette.border.main,
    borderLeftColor: theme.palette.border.main,
    margin: "0 auto",
    width: theme.feedWidth,
    // border: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderBottom: "1px solid",
    paddingLeft: "2rem",
    paddingRight: "2rem",

    paddingTop: "2rem",
    paddingBottom: "3rem",
    height: "100 vh",
  }
}));


function LayoutGrid(props) {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "30px" }}>
      <Grid container spacing={3}>
        <Grid item={true}
          xs={12}
          md={3}>
          {props.left}
        </Grid>
        <Grid item={true}
          xs={12}
          md={6}>
          <Box className={classes.centerColumn}>
            {props.center}
          </Box>
        </Grid>
        <Grid item={true}
          xs={12}
          md={3}>
          {props.right}
        </Grid>
      </Grid>
    </div>
  );
}

export default LayoutGrid;