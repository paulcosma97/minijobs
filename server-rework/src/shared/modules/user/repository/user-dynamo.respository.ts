import DynamoRepository from "../../../repository/dynamo.repository";
import UserRepository from "./user.repository";
import User from "../model/user.model";

export default class UserDynamoRepository extends DynamoRepository<User> implements UserRepository {
}
