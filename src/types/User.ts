import { Appointment } from "./Appointment";
import { Role } from "./Role";

export type User = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    photo?: string;
    role?: Role;

    appointments?: Appointment[];
    staffAppointments?: Appointment[];
}