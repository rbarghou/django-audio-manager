import React, { Fragment } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyRegistration } from '../../actions/auth';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '90%',
    paddingTop: theme.spacing(10)
  },
  grid: {
    // height: '100%'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const VerifyRegistration = props => {
  const { history, verifyRegistration, registrationVerified } = props;
  const { user_id, timestamp, signature } = queryString.parse(
    props.location.search
  );
  const classes = useStyles();

  verifyRegistration(
    user_id,
    timestamp,
    signature,
    Cookies.get('csrftoken'),
    history
  );
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          className={classes.content}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}>
          {registrationVerified === true && (
            <Fragment>
              <Typography variant="h1">
                Thank you for verifying your email.
              </Typography>
              <Link component={RouterLink} to="/sign-in" variant="h3">
                Sign in
              </Link>
            </Fragment>
          )}
          {registrationVerified === false && (
            <Typography variant="h1">
              There has been some problem with this verification link.
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

VerifyRegistration.propTypes = {
  history: PropTypes.object,
  verifyRegistration: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  registrationVerified: state.auth.registrationVerified
});

export default withRouter(
  connect(mapStateToProps, { verifyRegistration })(VerifyRegistration)
);
