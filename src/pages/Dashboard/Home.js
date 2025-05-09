// // import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// // import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// // import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// // import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// // import RecentOrders from "../../components/ecommerce/RecentOrders";
// // import DemographicCard from "../../components/ecommerce/DemographicCard";
// // import PageMeta from "../../components/common/PageMeta";

// export default function Home() {
//   return (
//     <>
//       {/* <PageMeta
//         title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
//         description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       /> */}
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         <h1>Home Page</h1>
//         {/* <div className="col-span-12 space-y-6 xl:col-span-7">
        
//           <EcommerceMetrics />

//           <MonthlySalesChart />
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           <MonthlyTarget />
//         </div>

//         <div className="col-span-12">
//           <StatisticsChart />
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           <DemographicCard />
//         </div>

//         <div className="col-span-12 xl:col-span-7">
//           <RecentOrders />
//         </div> */}
//       </div>
//     </>
//   );
// }

import { FaUserCircle, FaBed, FaStore, FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineFoodBank } from 'react-icons/md';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Welcome to CeyBank</h1>
          <p className="text-gray-600">Rest Anuradhapura – Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-3xl text-blue-800" />
          <span className="text-blue-900 font-semibold">Admin</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Room Reservations"
          icon={<FaBed className="text-4xl text-white" />}
          color="bg-blue-800"
        />
        <DashboardCard
          title="Store Requests"
          icon={<FaStore className="text-4xl text-white" />}
          color="bg-cyan-700"
        />
        <DashboardCard
          title="Food & Beverages"
          icon={<MdOutlineFoodBank className="text-4xl text-white" />}
          color="bg-green-700"
        />
        <DashboardCard
          title="Payments & Billing"
          icon={<FaMoneyBillWave className="text-4xl text-white" />}
          color="bg-yellow-600"
        />
        <DashboardCard
          title="Staff Management"
          icon={<FaUserCircle className="text-4xl text-white" />}
          color="bg-indigo-700"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, icon, color }) {
  return (
    <div className={`rounded-xl p-6 shadow-lg text-white flex items-center justify-between ${color}`}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mt-1 opacity-80">Click to manage</p>
      </div>
      <div>{icon}</div>
    </div>
  );
}

export default Dashboard;
