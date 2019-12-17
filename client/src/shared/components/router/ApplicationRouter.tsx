import React, { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import {Layout} from 'antd';
import {HashRouter as Router, Redirect, Route} from 'react-router-dom';
import LoginPage from '../../../modules/user/login/pages/LoginPage';
import {useSelector, useDispatch} from 'react-redux';
import {LoadProfile} from '../../../modules/user/state/profile.action';
import {State} from '../../state/store';
import ProfilePage from '../../../modules/user/profile/pages/ProfilePage';
import ListedJobsPage from '../../../modules/jobs/listed-jobs/pages/ListedJobsPage';
import RequiredJobsPage from '../../../modules/jobs/required-jobs/pages/RequiredJobsPage';
import PrivacyPolicyPage from '../../../modules/user/profile/pages/PrivacyPolicyPage';

const ApplicationRouter: React.FC = () => {
  const { loading, data } = useSelector((state: State) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ ...new LoadProfile() });
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Layout.Content>
            {!loading && !data ? (
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

export default ApplicationRouter;