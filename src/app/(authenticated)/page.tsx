"use client";
import AppointmentCard from "@/components/features/AppointmentCard";
import CustomerList from "@/components/features/CustomerList";
import Calendar from "@/components/ui/Calendar";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";
import { FaChartPie, FaFileInvoiceDollar, FaPlus } from "react-icons/fa6";

const customers = [
  {
    id: '1',
    name: 'John Smith',
    appointmentsCount: 3,
    photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    appointmentsCount: 2,
    photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Michael Brown',
    appointmentsCount: 5,
    photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Emily Davis',
    appointmentsCount: 1,
    photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '5',
    name: 'Daniel Lee',
    appointmentsCount: 4,
    photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: '6',
    name: 'Olivia Green',
    appointmentsCount: 6,
    photoUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
];

const appointments = [
  {
    id: '1',
    type: 'haircut',
    clientName: 'John Smith',
    date: '2025-06-01',
    time: '10:00 AM - 10:45 AM',
    status: 'Confirmed',
    price: '$45.00',
  },
  {
    id: '2',
    type: 'massage',
    clientName: 'Alice Johnson',
    date: '2025-06-05',
    time: '2:30 PM - 3:15 PM',
    status: 'Pending',
    price: '$60.00',
  },
  {
    id: '3',
    type: 'consultation',
    clientName: 'Bob Lee',
    date: '2025-06-08',
    time: '11:00 AM - 12:00 PM',
    status: 'Confirmed',
    price: '$30.00',
  },
  {
    id: '4',
    type: 'haircut',
    clientName: 'Emily Davis',
    date: '2025-06-10',
    time: '1:00 PM - 1:45 PM',
    status: 'Cancelled',
    price: '$40.00',
  },
];

export default function Home() {

  return (
    <div className="sm:flex sm:flex-col sm:gap-6 md:grid md:grid-cols-2 md:gap-6">
      <div className="lg:w-180 max-h-full">
        <Card className="w-full">
          <Calendar appointments={appointments} />
        </Card>
      </div>

      <div className="lg:justify-self-end">
        <Card className="h-full md:w-full sm:w-full">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Recent Customers</h3>
            </div>
          </div>
          <CustomerList customers={customers} limit={8} />
          <div className="p-4 border-t border-gray-200 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all Customers
            </button>
          </div>
        </Card>
      </div>

      <Card className="h-full w-full">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4">
          <Link href={"/appointments/new"}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <FaPlus className="text-blue-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">New Appointment</span>
          </Link>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <FaUserPlus className="text-purple-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Customer</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <FaFileInvoiceDollar className="text-green-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">Create Invoice</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <FaChartPie className="text-yellow-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">Reports</span>
          </button>
        </div>
      </Card>

      <Card className="w-full">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
          </div>
        </div>
        {appointments != undefined ?
          <AppointmentCard appointments={appointments} />
          :
          <div className="p-4 text-center text-gray-500">No appointments found</div>
        }
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all appointments
          </button>
        </div>
      </Card>

      <div className="col-span-2">
        <Card className="w-full">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Business Stats</h3>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">Appointments this week</span>
                <span className="text-sm font-semibold text-gray-800">8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">Revenue this month</span>
                <span className="text-sm font-semibold text-gray-800">$1,245.00</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">New customers</span>
                <span className="text-sm font-semibold text-gray-800">3</span>
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
