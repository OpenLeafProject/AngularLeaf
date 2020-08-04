import { Patient } from '../api/patient.model';
import { User } from '../api/user.model';

export class Note {
    public id: number;
    public content: string;
    public hash: string;
    public creationDate: Date;
    public patientid: Patient;
    public user: User;
}