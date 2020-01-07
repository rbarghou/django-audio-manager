import { LOGIN_SUCCESS, LOGGING_IN, LOGOUT } from './types';

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
    .catch(error => {
      alert(error);
    });
};
