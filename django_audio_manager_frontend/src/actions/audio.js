import { FETCH_FILES } from './types';

export const getFiles = () => dispatch => {
  fetch('/api/audiofile/', {
    method: 'GET',
    headers: { Accept: 'application/json' }
  })
    .then(response => {
      if (!response.ok) {
        // TODO: handle error
      }
      return response.json();
    })
    .then(data => {
      dispatch({
        type: FETCH_FILES,
        files: data
      });
    })
    .catch(err => {
      // TODO: handle error
    });
};
