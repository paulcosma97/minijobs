import Repository from '../../../shared/repository/repository.interface';
import User from '../model/user.model';

export default interface UserRepository extends Repository<User, string> {}
