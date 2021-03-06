import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '90%'
  },
  grid: {
    // height: '100%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(10),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: theme.spacing(3)
  }
}));

const SignUpComplete = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid
          className={classes.content}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <Typography variant="h1">Thank you for signing up.</Typography>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <Typography variant="subtitle1">
                Check your email to verify your account.
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUpComplete.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, {})(SignUpComplete));
