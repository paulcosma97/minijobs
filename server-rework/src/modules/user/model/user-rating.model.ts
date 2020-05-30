import { ForeignKey } from "../../../shared/repository/schema.utils";
import User from "./user.model";

export default interface UserRating {
    ratedBy: ForeignKey<User>;
    rating: number
}