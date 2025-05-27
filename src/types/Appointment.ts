import { Status } from "./Status";

export type Appointment = {
    id: string;
    notes: string;
    date: Date;
    time: string;
    status: Status;
    price: number;
    staffId: string;
    customerId: string;
    serviceId: string;
};
