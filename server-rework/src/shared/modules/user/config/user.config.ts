import {Token} from "typedi";

export default interface UserConfiguration {
    tableName: string;
}

export const UserConfigurationToken = new Token<UserConfiguration>('UserConfiguration');