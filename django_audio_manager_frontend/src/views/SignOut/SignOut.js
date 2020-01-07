import React, { Fragment } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Cookies from 'js-cookie';

const SignOut = props => {
  const { history, logout, isAuthenticated } = props;
  logout(Cookies.get('csrftoken'), history);

  return <Fragment />;
};

SignOut.propTypes = {
  history: PropTypes.object,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { logout })(SignOut));
