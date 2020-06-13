import { Permission } from './permission.enum';

export enum Role {
    MEMBER = 'member',
    PREMIUM_MEMBER = 'premium-member',
    ADMIN = 'admin'
}

export function permissionsOf(role: Role): Permission[] {
    switch (role) {
    case Role.MEMBER: {
        return [
            Permission.LOGIN,
            Permission.READ_LISTED_JOBS,
            Permission.READ_REQUIRED_JOBS,
            Permission.WRITE_LISTED_JOBS,
            Permission.WRITE_REQUIRED_JOBS
        ];
    }
    case Role.PREMIUM_MEMBER: {
        return permissionsOf(Role.MEMBER);
    }
    case Role.ADMIN: {
        return Object.values(Permission);
    }
    default: {
        return [];
    }
    }
}
