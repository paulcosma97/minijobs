import React from 'react';
import Navbar from '../navbar/Navbar';
import {Layout} from 'antd';
import {HashRouter as Router, Redirect, Route} from 'react-router-dom';
import LoginPage from '../../../modules/user/login/pages/LoginPage';
import {connect} from 'react-redux';
import {loadProfile} from '../../../modules/user/state/profile.action';
import {State} from '../../state/store';
import {ProfileState} from '../../../modules/user/state/profile.reducer';
import ProfilePage from '../../../modules/user/profile/pages/ProfilePage';
import ListedJobsPage from '../../../modules/jobs/listed-jobs/pages/ListedJobsPage';
import RequiredJobsPage from '../../../modules/jobs/required-jobs/pages/RequiredJobsPage';
import PrivacyPolicyPage from '../../../modules/user/profile/pages/PrivacyPolicyPage';

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
                  <Route path="/privacy-policy" component={PrivacyPolicyPage} />
                </React.Fragment>
              )}
              <Route path="/login" component={LoginPage} />

              {window.location.href.endsWith('/profile') && (
                <Redirect to="/profile" />
              )}
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
