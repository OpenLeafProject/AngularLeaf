import { Center } from '../api/center.model';

export class Patient {
    public nhc: number;
    public name: string;
    public surname: string;
    public lastname: string;
    public dni: string;
    public phone: string;
    public phoneAlt: string;
    public adress: string;
    public city: string;
    public pc: string;
    public sex: number;
    public note: string;
    public lastAccess: Date;
    public email: string;
    public center: Center;
    public bornDate: Date;
}