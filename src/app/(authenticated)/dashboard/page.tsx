"use client";
import AppointmentCard from "@/components/features/AppointmentCard";
import CustomerList from "@/components/features/CustomerList";
import Calendar from "@/components/ui/Calendar";
import Card from "@/components/ui/Card";
import { Appointment } from "@/types/Appointment";
import { Status } from "@/types/Status";
import { User } from "@/types/User";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";
import { FaChartPie, FaFileInvoiceDollar, FaPlus } from "react-icons/fa6";

const customers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '123-456-7890',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '987-654-3210',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '555-555-5555',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '111-222-3333',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    appointments: [
      {
        id: 'e122cbb2-f4f5-4a5c-97ec-d5d53f987a4c',
        date: new Date('2025-06-10'),
        time: '1:00 PM - 1:45 PM',
        notes: 'No notes',
        status: Status.CANCELLED,
        price: 40.00,
        staffId: 'John Doe',
        customerId: 'Emily Davis',
        serviceId: 'haircut',
      },
    ]
  },
  {
    id: '5',
    name: 'Daniel Lee',
    email: 'daniel@example.com',
    phone: '444-555-6666',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    appointments: [
      {
        id: '9d5cfa4f-1f8b-4721-bd14-cf7fcb6e8bb',
        date: new Date('2025-06-01'),
        time: '10:00 AM - 10:45 AM',
        notes: 'No notes',
        status: Status.CONFIRMED,
        price: 45.00,
        staffId: 'John Doe',
        customerId: 'John Smith',
        serviceId: 'haircut',
      },
    ]
  },
  {
    id: '6',
    name: 'Olivia Green',
    email: 'olivia@example.com',
    phone: '777-888-9999',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
];

const appointments: Appointment[] = [
  {
    id: '3d3d7d7e-62dc-4429-b749-7756b27eb5d2',
    date: new Date('2025-06-05'),
    time: '2:30 PM - 3:15 PM',
    notes: 'Alergic to latex',
    status: Status.PENDING,
    price: 60.00,
    staffId: 'Jane Smith',
    customerId: 'Alice Johnson',
    serviceId: 'massage',
  },
  {
    id: '49720ec7-9aa0-47ae-a2b5-f503f519e406',
    date: new Date('2025-06-08'),
    time: '11:00 AM - 12:00 PM',
    notes: 'No notes',
    status: Status.CONFIRMED,
    price: 30.00,
    staffId: 'Bob Smith',
    customerId: 'Bob Lee',
    serviceId: 'consultation',
  },
];

export default function Home() {

  return (
    <div className="sm:flex sm:flex-col sm:gap-6 md:grid md:grid-cols-2 md:gap-6">

      {/* <button type="button" className="appearance-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={handleOpenNotification}>
        Click me
      </button> */}

      <div className="lg:w-180 max-h-full">
        <Card className="w-full">
          <Calendar appointments={appointments} />
        </Card>
      </div>

      <div className="lg:justify-self-end">
        <Card className="h-full md:w-full sm:w-full">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-(--primary-text-color)">Recent Customers</h3>
            </div>
          </div>
          <CustomerList customers={customers} limit={8} />
          <div className="p-4 border-t border-gray-200 text-center">
            <Link href={"/customers"} className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all Customers
            </Link>
          </div>
        </Card>
      </div>

      <Card className="h-full w-full">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-(--primary-text-color)">Quick Actions</h3>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4">
          <Link href={"/appointments/new"}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <FaPlus className="text-blue-500" />
            </div>
            <span className="text-sm font-medium text-(--secondary-text-color)">New Appointment</span>
          </Link>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <FaUserPlus className="text-purple-500" />
            </div>
            <span className="text-sm font-medium text-(--secondary-text-color)">Add Customer</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <FaFileInvoiceDollar className="text-green-500" />
            </div>
            <span className="text-sm font-medium text-(--secondary-text-color)">Create Invoice</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <FaChartPie className="text-yellow-500" />
            </div>
            <span className="text-sm font-medium text-(--secondary-text-color)">Reports</span>
          </button>
        </div>
      </Card>

      <Card className="w-full">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-(--primary-text-color)">Upcoming Appointments</h3>
          </div>
        </div>
        {appointments != undefined ?
          <AppointmentCard appointments={appointments} />
          :
          <div className="p-4 text-center text-(--tertiary-text-color)">No appointments found</div>
        }
        <div className="p-4 border-t border-gray-200 text-center">
          <Link href={"/appointments"} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all appointments
          </Link>
        </div>
      </Card>

      <div className="col-span-2">
        <Card className="w-full">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-(--primary-text-color)">Business Stats</h3>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-(--secondary-text-color)">Appointments this week</span>
                <span className="text-sm font-semibold text-(--primary-text-color)">8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-(--secondary-text-color)">Revenue this month</span>
                <span className="text-sm font-semibold text-(--primary-text-color)">$1,245.00</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-(--secondary-text-color)">New customers</span>
                <span className="text-sm font-semibold text-(--primary-text-color)">3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
