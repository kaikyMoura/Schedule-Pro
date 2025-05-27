import { Appointment } from "./Appointment";

export type ServiceItem = {
    id: string;
    type: string;
    price: number;
    duration: number;
    staffId?: string;
    appointments?: Appointment[]
}