import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignUpComplete as SignUpCompleteView,
  SignIn as SignInView,
  VerifyRegistration as VerifyRegistrationView,
  NotFound as NotFoundView,
  Landing as LandingView,
  Upload as UploadView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/landing" />
      <RouteWithLayout
        component={LandingView}
        exact
        layout={MainLayout}
        path="/landing"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UploadView}
        exact
        layout={MainLayout}
        path="/upload"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MainLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignUpCompleteView}
        exact
        layout={MainLayout}
        path="/sign-up-complete"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MainLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={VerifyRegistrationView}
        exact
        layout={MainLayout}
        path="/verify-registration"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

Routes.propTypes = {};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Routes);
