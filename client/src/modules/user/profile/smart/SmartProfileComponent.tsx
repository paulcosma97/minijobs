import React from 'react';
import ProfileComponent from "../components/ProfileComponent";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../../shared/state/store";
import {LogoutProfile} from "../../state/profile.action";
import PageLoader from "../../../../shared/components/page-loader/PageLoader";

const SmartProfileComponent: React.FC = () => {
    const { data, loading } = useSelector((state: State) => state.profile);
    const dispatch = useDispatch();

    if (loading) {
        return <PageLoader/>;
    }

    return <ProfileComponent profile={data} logout={() => dispatch({ ...new LogoutProfile() })} />
}

export default SmartProfileComponent;