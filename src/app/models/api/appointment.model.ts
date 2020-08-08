import { Patient } from '../api/patient.model';
import { User } from '../api/user.model';
import { VisitType } from '../api/visittype.model';
import { VisitMode } from '../api/visitmode.model';


export class Appointment {
    public id: number;
    public datetime: Date;
    public forced: number;
    public allowInvoice: number;
    public price: number;
    public duration: number;
    public note: string;
    public hash: string;
    public patient: Patient;
    public visitType: VisitType;
    public visitMode: VisitMode;
    public owner: User;
    public status: number;
}