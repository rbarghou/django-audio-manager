import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../../../../actions/audio';

import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'js-cookie';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const AudioFiles = props => {
  const { className, files, getFiles, ...rest } = props;

  const classes = useStyles();

  const handleDelete = file_id => {
    fetch('/api/audiofile/' + file_id + '/', {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      }
    }).then(response => {
      if (response.ok) {
        getFiles();
      } else {
        // TODO: handle case
      }
    });
  };

  const getName = file => {
    const x = file.file.split('/');
    return x[x.length - 1];
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button
            to="/upload"
            component={RouterLink}
            color="primary"
            size="small"
            variant="outlined">
            New entry
          </Button>
        }
        title="Audio Files"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Uploaded At
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map(file => (
                  <TableRow hover key={file.id}>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {getName(file)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <AudioPlayer
                        src={file.file}
                        onPlay={e => console.log('onPlay')}
                        // other props here
                      />
                    </TableCell>
                    <TableCell>{file.uploaded_at}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(file.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

AudioFiles.propTypes = {
  className: PropTypes.string,
  files: PropTypes.array.isRequired,
  getFiles: PropTypes.func
};

const mapStateToProps = state => ({
  files: state.audio.files
});

export default connect(mapStateToProps, { getFiles })(AudioFiles);
