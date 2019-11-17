import {LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOGOUT_PROFILE, ProfileActions} from './profile.action';

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
        case LOAD_PROFILE: {
            return {
                ...state,
                loading: true
            };
        }

        case LOAD_PROFILE_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }

        case LOGOUT_PROFILE: {
            return {
                ...state,
                data: null,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}
