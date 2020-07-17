import {combineReducers} from "redux";
import userReducer, {UserState} from "../user/state/user.reducer";

export interface RootState {
    user: UserState;
}

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;