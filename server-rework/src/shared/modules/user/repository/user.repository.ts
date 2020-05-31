import Repository from '../../../repository/repository.interface';
import User from '../model/user.model';
import {Token} from "typedi";

export default interface UserRepository extends Repository<User> {}
export const UserRepositoryToken = new Token<UserRepository>('UserRepository');