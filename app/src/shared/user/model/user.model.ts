export default interface User {
    id: string;
    email: string;
    firstName: string;
    picture: string;
    lastName: string;
    permissions: string[];
    ownRatings?: string[];
}