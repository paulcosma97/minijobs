import User from "../model/user.model";
import {Action} from "../../state/utils";

export enum UserActions {
    LOAD_USER = '[User] Load',
    LOAD_USER_SUCCESS = '[User] Load Success',

    LOGIN_USER = '[User] Login',
    LOGIN_USER_SUCCESS = '[User] Login Success',

    LOGOUT_USER = '[User] Logout',
    LOGOUT_USER_SUCCESS = '[User] Logout Success',
}

export class LoadUserAction implements Action<string> {
    readonly type = UserActions.LOAD_USER;
}

export class LoadUserSuccessAction implements Action<string> {
    readonly type = UserActions.LOAD_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class LoginUserAction implements Action<string> {
    readonly type = UserActions.LOGIN_USER;
}

export class LoginUserSuccessAction implements Action<string> {
    readonly type = UserActions.LOGIN_USER_SUCCESS;
}

export class LogoutUserAction implements Action<string> {
    readonly type = UserActions.LOGOUT_USER;
}

export class LogoutUserSuccessAction implements Action<string> {
    readonly type = UserActions.LOGOUT_USER_SUCCESS;
}

export type UserActionsUnion =
    | LoadUserAction
    | LoadUserSuccessAction
    | LoginUserAction
    | LoginUserSuccessAction
    | LogoutUserAction
    | LogoutUserSuccessAction;