export type Customer = {
    id: string;
    name: string;
    email: string;
    number: string;
    lastAppointment?: string;
    appointmentsCount: number;
    photoUrl: string;
}