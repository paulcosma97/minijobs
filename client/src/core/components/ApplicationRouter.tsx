import React from 'react';
import Navbar from '../../shared/components/navbar/Navbar';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { connect } from 'react-redux';
import { loadProfile } from '../../shared/state/actions/profile.action';
import { State } from '../../shared/state/store';
import { ProfileState } from '../../shared/state/reducers/profile.reducer';
import ProfilePage from '../pages/ProfilePage';
import ListedJobsPage from '../pages/ListedJobsPage';
import RequiredJobsPage from '../pages/RequiredJobsPage';

class ApplicationRouter extends React.Component<{
  loadProfile: Function;
  profile: ProfileState;
}> {
  componentWillMount() {
    this.props.loadProfile();
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Layout>
            <Layout.Content>
              {!this.props.profile.loading && !this.props.profile.data ? (
                <Redirect to="/login" />
              ) : (
                <React.Fragment>
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/listed-jobs" component={ListedJobsPage} />
                  <Route path="/required-jobs" component={RequiredJobsPage} />
                </React.Fragment>
              )}
              <Route path="/login" component={LoginPage} />

              {window.location.pathname === '/' && <Redirect to="/profile" />}
            </Layout.Content>
          </Layout>

          <Navbar
            items={[
              { icon: 'search', link: '/listed-jobs', key: 'listed-jobs' },
              { icon: 'euro', link: '/required-jobs', key: 'required-jobs' },
              { icon: 'menu', link: '/profile', key: 'profile' }
            ]}
          />
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: State) => ({
    profile: state.profile
  }),
  { loadProfile }
)(ApplicationRouter);
