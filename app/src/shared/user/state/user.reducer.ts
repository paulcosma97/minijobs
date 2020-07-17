import User from "../model/user.model";
import {LoadUserSuccessAction, UserActions, UserActionsUnion} from "./user.actions";

export interface UserState {
    data?: User;
    loading: boolean;
}

const initialState: UserState = {
    loading: false
};

export default function reducer(state = initialState, action: UserActionsUnion): UserState {
    switch (action.type) {
        case UserActions.LOAD_USER:
            return {
                ...state,
                loading: true
            }
        case UserActions.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case UserActions.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                data: undefined
            }
        default:
            return state;
    }
}