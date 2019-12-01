import {ProfileActions, ProfileActionTypes} from './profile.action';

export interface ProfileState {
    loading: boolean;
    data?: ProfileData;
}

export interface ProfileData {
    id: number;
    permissionMask: number;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}

const initialState: ProfileState = {
    loading: true
};

export default function (state = initialState, action: ProfileActions) {
    switch (action.type) {
        case ProfileActionTypes.LOAD_PROFILE: {
            return {
                ...state,
                loading: true
            };
        }

        case ProfileActionTypes.LOAD_PROFILE_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }

        case ProfileActionTypes.LOAD_PROFILE_FAILURE: {
            return {
                ...state,
                loading: false
            }
        }



        case ProfileActionTypes.LOGIN_PROFILE: {
            return {
                ...state,
                loading: true
            };
        }

        case ProfileActionTypes.LOGIN_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }

        case ProfileActionTypes.LOGIN_PROFILE_FAILURE: {
            return {
                ...state,
                loading: false
            }
        }



        case ProfileActionTypes.LOGOUT_PROFILE: {
            return {
                ...state,
                loading: true
            };
        }

        case ProfileActionTypes.LOGOUT_PROFILE_SUCCESS: {
            return {
                ...state,
                data: null,
                loading: false
            };
        }

        case ProfileActionTypes.LOGOUT_PROFILE_FAILURE: {
            return {
                ...state,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}
