import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, List } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Profile, SidebarNavItem } from './components';

import { logout } from '../../../../actions/auth';
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const {
    open,
    variant,
    onClose,
    className,
    isAuthenticated,
    dispatch,
    staticContext,
    logout,
    history,
    ...rest
  } = props;

  const classes = useStyles();

  const pages = [
    ...(isAuthenticated
      ? [
          {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon />
          },
          {
            title: 'Sign Out',
            onClick: () => {
              logout(Cookies.get('csrftoken'), history);
              history.push('/');
            },
            icon: <PersonIcon />
          }
        ]
      : []),
    // {
    //   title: 'Users',
    //   href: '/users',
    //   icon: <PeopleIcon />
    // },
    // {
    //   title: 'Products',
    //   href: '/products',
    //   icon: <ShoppingBasketIcon />
    // },
    ...(!isAuthenticated
      ? [
          {
            title: 'Sign In',
            href: '/sign-in',
            icon: <PersonIcon />
          },
          {
            title: 'Sign Up',
            href: '/sign-up',
            icon: <PersonAddIcon />
          }
        ]
      : [])

    // {
    //   title: 'Typography',
    //   href: '/typography',
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // }
    // {
    //   title: 'Account',
    //   href: '/account',
    //   icon: <AccountBoxIcon />
    // },
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        {isAuthenticated && <Profile />}
        <Divider className={classes.divider} />
        <List>
          {pages.map((page, idx) => (
            <SidebarNavItem className={classes.nav} page={page} key={idx} />
          ))}
        </List>
        <Divider className={classes.divider} />
        <List></List>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
  // logout: PropTypes.func.isRequred
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { logout })(Sidebar));
