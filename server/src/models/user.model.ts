import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserPermissionMask, composePermissionMask } from '../utils/permissions';

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
}
