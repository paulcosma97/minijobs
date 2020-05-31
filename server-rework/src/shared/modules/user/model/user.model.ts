import {ForeignKey, PrimaryKey} from "../../../repository/schema.utils";
import Entity from "../../../repository/entity.model";
import UserRating from "./user-rating.model";

export default interface User extends Entity {
    id: PrimaryKey;
    email: string;
    firstName: string;
    picture: string;
    lastName: string;
    permissions: string[];
    ownRatings?: ForeignKey<UserRating>[];
}