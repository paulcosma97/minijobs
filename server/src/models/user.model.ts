import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { UserPermissionMask, composePermissionMask } from '../utils/permissions';
import { Job } from './job.model';
import { UserRating } from './user-rating.model';

export const defaultPermissions: UserPermissionMask[] = [
    UserPermissionMask.CanLogin,
    UserPermissionMask.CanReadMessages,
    UserPermissionMask.CanWriteMessages,
    UserPermissionMask.CanViewJobs,
    UserPermissionMask.CanCreateJobs,
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

    @OneToMany(type => Job, job => job.user)
    jobs?: Job[]

    @JoinTable()
    @ManyToMany(type => Job, job => job.lastViewedBy)
    lastViewed?: Job[];

    @OneToMany(type => UserRating, userRating => userRating.user)
    ratings?: UserRating[];
}
