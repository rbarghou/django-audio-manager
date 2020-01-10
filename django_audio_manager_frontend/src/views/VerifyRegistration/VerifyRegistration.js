import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyRegistration } from '../../actions/auth';
import Cookies from 'js-cookie';
import queryString from 'query-string';

const VerifyRegistration = props => {
  const { history, verifyRegistration, isAuthenticated } = props;
  const { user_id, timestamp, signature } = queryString.parse(
    props.location.search
  );
  verifyRegistration(
    user_id,
    timestamp,
    signature,
    Cookies.get('csrftoken'),
    history
  );

  return <Fragment></Fragment>;
};

VerifyRegistration.propTypes = {
  history: PropTypes.object,
  verifyRegistration: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(mapStateToProps, { verifyRegistration })(VerifyRegistration)
);
