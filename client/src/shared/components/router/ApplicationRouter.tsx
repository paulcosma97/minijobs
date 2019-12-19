import React, { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { Layout } from 'antd';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../../../modules/user/login/pages/LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import { LoadProfile } from '../../../modules/user/state/profile.action';
import { State } from '../../state/store';
import ProfilePage from '../../../modules/user/profile/pages/ProfilePage';
import ListedJobsPage from '../../../modules/jobs/listed-jobs/pages/ListedJobsPage';
import RequiredJobsPage from '../../../modules/jobs/required-jobs/pages/RequiredJobsPage';
import PrivacyPolicyPage from '../../../modules/user/profile/pages/PrivacyPolicyPage';
import PageLoader from '../page-loader/PageLoader';

const ApplicationRouter: React.FC = () => {
  const { loading, data: profileState } = useSelector((state: State) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ ...new LoadProfile() });
  }, []);

  if (loading) {
    return <PageLoader />
  }

  return (
    <Router>
      <Layout>
        <Layout.Content>
          {profileState ? (
            <>
              <Switch>
                <Route path="/profile">
                  <ProfilePage />
                </Route>

                <Route path="/listed-jobs" >
                  <ListedJobsPage />
                </Route>

                <Route path="/required-jobs" >
                  <RequiredJobsPage />
                </Route>

                <Route path="/privacy-policy" >
                  <PrivacyPolicyPage />
                </Route>

                <Route path="*">
                  <Redirect to="/profile" />
                </Route>
              </Switch>
            </>
          ) : (
              <>
                <Switch>
                  <Route path="/login">
                    <LoginPage />
                  </Route>

                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </>
            )}

        </Layout.Content>
      </Layout>

      {profileState && (
        <Navbar
          items={[
            { icon: 'search', link: '/listed-jobs', key: 'listed-jobs' },
            { icon: 'euro', link: '/required-jobs', key: 'required-jobs' },
            { icon: 'menu', link: '/profile', key: 'profile' }
          ]}
        />
      )}

    </Router>
  );
}

export default ApplicationRouter;