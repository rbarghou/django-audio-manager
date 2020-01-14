import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../../actions/audio';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Input,
  Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {},
  upload_button: {
    display: 'flex'
  },
  file_label: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const Upload = props => {
  const classes = useStyles();

  const { history, isAuthenticated, getFiles } = props;
  useEffect(() => {
    getFiles();
  });

  const [file, setFile] = useState('');

  const handleChange = event => {
    event.persist();
    const file = event.target.files[0];
    setFile(file);
  };

  const submit = event => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('file', file);
    fetch('/api/audiofile/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: fd
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          // TODO: Handle error case
        }
      })
      .then(data => {
        // TODO: Handle success case
        history.push('/dashboard');
      })
      .catch(error => {
        // TODO: Handle error case
      });
  };

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <CardHeader title="Upload New Audio File" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
                    <Button
                      className={classes.upload_button}
                      variant="contained"
                      component="label">
                      Select Audio File
                      <Input
                        type="file"
                        inputProps={{
                          accept: 'audio/mp3, audio/mpeg, audio/wav'
                        }}
                        style={{ display: 'none' }}
                        onChange={handleChange}
                      />
                    </Button>
                  </Grid>
                  {file && (
                    <Fragment>
                      <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
                        <Typography
                          className={classes.file_label}
                          style={{ float: 'right' }}
                          variant="subtitle1">
                          <strong>file:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={10} sm={10} md={7} lg={8} xl={9}>
                        <Typography
                          className={classes.file_label}
                          variant="body1">
                          {file.name}
                        </Typography>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  variant="contained"
                  component="label"
                  disabled={!file}
                  onClick={submit}>
                  Upload
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  getFiles: PropTypes.func
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default withRouter(connect(mapStateToProps, { getFiles })(Upload));
