import {
  LOGIN_SUCCESS,
  LOGGING_IN,
  LOGOUT,
  REGISTER,
  VERIFY_REGISTRATION,
  VERIFY_REGISTRATION_FAILED
} from './types';

export const verifyRegistration = (
  user_id,
  timestamp,
  signature,
  token,
  history
) => dispatch => {
  fetch('/api/auth/verify-registration/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': token },
    body: JSON.stringify({
      user_id: user_id,
      timestamp: timestamp,
      signature: signature
    })
  }).then(response => {
    if (response.ok) {
      dispatch({ type: VERIFY_REGISTRATION });
    } else {
      dispatch({ type: VERIFY_REGISTRATION_FAILED });
    }
  });
};

export const signUp = (
  username,
  firstname,
  lastname,
  email,
  password1,
  password2,
  token,
  history
) => dispatch => {
  dispatch({ type: REGISTER });
  fetch('/api/auth/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': token },
    body: JSON.stringify({
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password1,
      password_confirm: password2
      // csrfmiddlewaretoken: token
    })
  });
};

export const logout = (token, history) => dispatch => {
  dispatch({ type: LOGOUT });
  const formData = new FormData();
  formData.append('csrfmiddlewaretoken', token);
  fetch('/api/auth/logout/', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      history.push('/');
    })
    .catch(console.log);
};

export const login = (username, password, token) => dispatch => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('csrfmiddlewaretoken', token);

  dispatch({
    type: LOGGING_IN
  });

  fetch('/api/auth/login/', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        dispatch({
          type: LOGIN_SUCCESS,
          username: username
        });
      } else {
      }
    })
    .catch(console.log);
};
