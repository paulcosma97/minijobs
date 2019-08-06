import React from 'react';
import { Layout, Avatar } from 'antd';
import { connect } from 'react-redux';
import { State } from '../../shared/state/store';
import { ProfileState } from '../../shared/state/reducers/profile.reducer';
import { logoutProfile } from '../../shared/state/actions/profile.action';

class ProfilePage extends React.Component<{
  profile: ProfileState;
  logoutProfile: typeof logoutProfile;
}> {
  componentDidMount() {
    document
      .querySelectorAll('.ant-menu-item-selected')
      .forEach(item => item.classList.remove('ant-menu-item-selected'));

    document.querySelector(`#profile`).classList.add('ant-menu-item-selected');
  }

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
          <Avatar src={this.props.profile.data.picture} alt="User avatar" />
          <span className="user-full-name">
            {this.props.profile.data.firstName}{' '}
            {this.props.profile.data.lastName}
          </span>
        </div>
        <Layout.Content style={{ paddingTop: '53px' }}>content</Layout.Content>
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
