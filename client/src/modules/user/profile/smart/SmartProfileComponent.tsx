import React from 'react';
import {branch, compose, renderComponent} from "recompose";
import ProfileComponent, {ProfileComponentProps} from "../components/ProfileComponent";
import {connect} from "react-redux";
import {State} from "../../../../shared/state/store";
import {logoutProfile} from "../../state/profile.action";
import PageLoader from "../../../../shared/components/page-loader/PageLoader";

interface SmartProfileComponentProps extends ProfileComponentProps {
    loading: boolean
}

const mapState = (state: State) => ({
    profile: state.profile.data,
    loading: state.profile.loading
});

const mapActions = {
    logout: logoutProfile
};

const withLoadingState = branch<any>(
    (props: SmartProfileComponentProps) => props.loading,
    renderComponent(PageLoader)
);

export default compose(
    connect(mapState, mapActions),
    withLoadingState
)(ProfileComponent as any);