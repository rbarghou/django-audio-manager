import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../../actions/audio';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AudioFiles } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();

  const { isAuthenticated, getFiles } = props;
  useEffect(() => {
    getFiles();
  });
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <AudioFiles />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  getFiles: PropTypes.func
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, { getFiles })(Dashboard);
