import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();

  const { isAuthenticated } = props;
  return (
    <div className={classes.root}>
      <Typography>
        isAuthenticated: {!isAuthenticated ? 'Unauthenticated' : 'Logged In'}
      </Typography>
      <Grid container spacing={4}></Grid>
    </div>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(Dashboard);
