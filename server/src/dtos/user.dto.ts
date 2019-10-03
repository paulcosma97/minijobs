import { UserRating } from '../models/user-rating.model'
import { ListedJob } from '../models/listed-job.model';
import { RequiredJob } from '../models/required-job.model';
import { Job } from '../models/job.model';
import { User } from '../models/user.model';
import { getServedFileLink } from '../services/file.service';

export class UserDTO {
    id?: number;
    email: string;
    firstName: string;
    picture: string;
    lastName: string;
    permissionMask: number;
    listedJobs?: ListedJob[]
    requiredJobs?: RequiredJob[]
    lastViewed?: Job[];
    ratings?: UserRating[];
    ownRatings?: UserRating[];

    static from(user: User): Promise<UserDTO> {
        return getServedFileLink(user.pictureGUID).then(link => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            permissionMask: user.permissionMask,
            listedJobs: user.listedJobs,
            requiredJobs: user.requiredJobs,
            lastViewed: user.lastViewed,
            ratings: user.ratings,
            ownRatings: user.ownRatings,
            picture: link
        }));
    }
}