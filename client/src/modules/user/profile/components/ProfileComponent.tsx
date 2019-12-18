import React from "react";
import {Avatar, Layout, Menu} from "antd";
import environment from "../../../../shared/environment";
import {Link} from "react-router-dom";
import {ProfileData} from "../../state/profile.reducer";

export interface ProfileComponentProps {
    logout: (...args: any) => void;
    profile: ProfileData;
}

const ProfileComponent: React.FC<ProfileComponentProps> = (props) => (
    <>
        <div id="profile-top-bar">
          <span
              className="color-accent text-bold link-like"
              onClick={props.logout}
          >
            Deconectare
          </span>
            <Avatar src={environment.baseUrl + props.profile.picture} alt="User avatar"/>
            <span className="user-full-name">
            {props.profile.firstName}{' '}
                {props.profile.lastName}
          </span>
        </div>
        <Layout.Content style={{paddingTop: '53px'}}>
            <Menu mode="vertical">
                <Menu.Item>
                    <Link to="/privacy-policy">Politica de confidentialitate</Link>
                </Menu.Item>
            </Menu>
        </Layout.Content>
    </>
);

export default ProfileComponent;