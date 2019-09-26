import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { UserPermissionMask, composePermissionMask } from '../utils/permissions';
import { ListedJob } from './listed-job.model';
import { UserRating } from './user-rating.model';
import { Job } from './job.model';
import { RequiredJob } from './required-job.model';

export const defaultPermissions: UserPermissionMask[] = [
    UserPermissionMask.CanLogin,
    UserPermissionMask.CanReadMessages,
    UserPermissionMask.CanWriteMessages,
    UserPermissionMask.CanViewListedJobs,
    UserPermissionMask.CanCreateListedJobs,
];

export const defaultPermissionMask: number = composePermissionMask(defaultPermissions);


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column()
    firstName: string;
    
    @Column()
    picture: string;

    @Column()
    lastName: string;

    @Column({ default: defaultPermissionMask })
    permissionMask: number;

    @OneToMany(type => ListedJob, listedJob => listedJob.user)
    listedJobs?: ListedJob[]

    @OneToMany(type => RequiredJob, requiredJob => requiredJob.user)
    requiredJobs?: RequiredJob[]

    @JoinTable()
    @ManyToMany(type => Job, listedJob => listedJob.lastViewedBy)
    lastViewed?: Job[];

    @OneToMany(type => UserRating, userRating => userRating.user)
    ratings?: UserRating[];

    @OneToMany(type => UserRating, userRating => userRating.ratedBy)
    ownRatings?: UserRating[];
}
