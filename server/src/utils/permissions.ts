import { User } from '../models/user.model';

export enum UserPermissionMask {
    None = 0,
    CanLogin = 1,
    CanViewListedJobs = 2,
    CanCreateListedJobs = 4,
    CanReadMessages = 8,
    CanWriteMessages = 16
}

export function hasPermissions(who: User | number, permissions: UserPermissionMask[]): boolean {
    const decompose = mask => {
        const composedOf = [ 1 ];
    
        let topPermission = 1;
        while(topPermission * 2 < mask) {
            topPermission *= 2;
            composedOf.push(topPermission);
        }
    
        return composedOf;
    }

    const mask = who instanceof User ? who.permissionMask : who;
    const permissionArray: number[] = decompose(mask);

    return permissionArray.filter(perm => permissions.includes(perm)).length === permissions.length;
}

export function composePermissionMask(permissions: UserPermissionMask[]): number {
    return permissions.reduce((sum, current) => sum + current);
}

export function computeAdminPermissionMask(): number {
    return Object.values(UserPermissionMask).filter(val => !isNaN(+val)).map(val => +val).reduce((sum, current) => sum + current);
}