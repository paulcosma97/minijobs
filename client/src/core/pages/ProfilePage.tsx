import React from 'react';
import { Layout, Avatar, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from '../../shared/state/store';
import { ProfileState } from '../../shared/state/reducers/profile.reducer';
import { logoutProfile } from '../../shared/state/actions/profile.action';
import environment from '../../environment.json';


class ProfilePage extends React.Component<{
  profile: ProfileState;
  logoutProfile: typeof logoutProfile;
}> {
  logout = () => {
    this.props.logoutProfile();
  };

  render() {
    if (this.props.profile.loading) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <div id="profile-top-bar">
          <span
            className="color-accent text-bold link-like"
            onClick={this.logout}
          >
            Deconectare
          </span>
          <Avatar src={environment.baseUrl + this.props.profile.data.picture} alt="User avatar" />
          <span className="user-full-name">
            {this.props.profile.data.firstName}{' '}
            {this.props.profile.data.lastName}
          </span>
        </div>
        <Layout.Content style={{ paddingTop: '53px' }}>
          <Menu mode="vertical">
            <Menu.Item>
              <Link to="/privacy-policy">Politica de confidentialitate</Link>
            </Menu.Item>
          </Menu>
        </Layout.Content>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: State) => ({
    profile: state.profile
  }),
  { logoutProfile }
)(ProfilePage as any);
