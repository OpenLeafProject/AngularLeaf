import { UserProfile } from '../api/userProfile.model';

export class User {
    public id: number;
    public username: string;
    public password: string;
    public name: string;
    public surname: string;
    public lastname: string;
    public colnum: string;
    public email: string;
    public creationDate: Date;
    public active: number;
    public profileImage: string;
    public lastAccess: Date;
    public lastIPAdress: string;
    public userProfile: UserProfile;
}