import { PrimaryKey } from "../../../shared/repository/schema.utils";
import Entity from "../../../shared/repository/entity.model";
import UserRating from "./user-rating.model";

export default interface User extends Entity<string> {
    id: PrimaryKey<string>;
    email: string;
    firstName: string;
    picture: string;
    lastName: string;
    permissions: string[];
    ownRatings?: UserRating[];
}