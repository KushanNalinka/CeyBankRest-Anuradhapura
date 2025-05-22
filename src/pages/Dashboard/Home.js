import React from 'react';
import { FaUserCircle, FaBed, FaStore, FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineFoodBank } from 'react-icons/md';
import logo from '../../assets/images/ceybank-logo.jpeg';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          {/* <img src={logo} alt="CeyBank Logo" className="w-12 h-auto" /> */}
          <div>
            <h1 className="text-3xl font-bold text-blue-900">CeyBank Rest</h1>
            <p className="text-blue-800">Rest Anuradhapura – Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-3xl text-blue-800" />
          <span className="text-blue-900 font-semibold">Admin</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Room Reservations"
          icon={<FaBed />}
          accent="blue"
        />
        <DashboardCard
          title="Store Requests"
          icon={<FaStore />}
          accent="blue"
        />
        <DashboardCard
          title="Food & Beverages"
          icon={<MdOutlineFoodBank />}
          accent="blue"
        />
        <DashboardCard
          title="Payments & Billing"
          icon={<FaMoneyBillWave />}
          accent="blue"
        />
        <DashboardCard
          title="Staff Management"
          icon={<FaUserCircle />}
          accent="blue"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, icon, accent }) {
  // accent = 'blue' or 'yellow'
  const bg = accent === 'blue' ? 'bg-white' : 'bg-white';
  const border = accent === 'blue' ? 'border-l-4 border-blue-600' : 'border-l-4 border-yellow-600';
  const iconBg = accent === 'blue' ? 'bg-blue-600 text-white' : 'bg-yellow-600 text-white';

  return (
    <div
      className={`${bg} ${border} p-6 rounded-xl shadow-lg flex items-center justify-between hover:shadow-2xl hover:scale-105 transition`}
    >
      <div>
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
        <p className="text-sm mt-1 text-gray-500">Click to manage</p>
      </div>
      <div className={`p-4 rounded-full ${iconBg} text-2xl`}>
        {icon}
      </div>
    </div>
  );
}
