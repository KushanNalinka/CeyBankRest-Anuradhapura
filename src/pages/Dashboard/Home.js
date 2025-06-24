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

// import { FaUserCircle, FaBed, FaStore, FaMoneyBillWave } from 'react-icons/fa';
// import { MdOutlineFoodBank } from 'react-icons/md';

// function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
//       <header className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-blue-900">Welcome to CeyBank</h1>
//           <p className="text-gray-600">Rest Anuradhapura – Admin Dashboard</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <FaUserCircle className="text-3xl text-blue-800" />
//           <span className="text-blue-900 font-semibold">Admin</span>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <DashboardCard
//           title="Room Reservations"
//           icon={<FaBed className="text-4xl text-white" />}
//           color="bg-blue-800"
//         />
//         <DashboardCard
//           title="Store Requests"
//           icon={<FaStore className="text-4xl text-white" />}
//           color="bg-cyan-700"
//         />
//         <DashboardCard
//           title="Food & Beverages"
//           icon={<MdOutlineFoodBank className="text-4xl text-white" />}
//           color="bg-green-700"
//         />
//         <DashboardCard
//           title="Payments & Billing"
//           icon={<FaMoneyBillWave className="text-4xl text-white" />}
//           color="bg-yellow-600"
//         />
//         <DashboardCard
//           title="Staff Management"
//           icon={<FaUserCircle className="text-4xl text-white" />}
//           color="bg-indigo-700"
//         />
//       </div>
//     </div>
//   );
// }

// function DashboardCard({ title, icon, color }) {
//   return (
//     <div className={`rounded-xl p-6 shadow-lg text-white flex items-center justify-between ${color}`}>
//       <div>
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <p className="text-sm mt-1 opacity-80">Click to manage</p>
//       </div>
//       <div>{icon}</div>
//     </div>
//   );
// }

// export default Dashboard;


import { FaUserCircle, FaBed, FaStore, FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineFoodBank } from 'react-icons/md';

function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/15 to-yellow-500/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-300/10 to-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-blue-300/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-yellow-400/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-blue-400/10 rotate-45 animate-pulse"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-twinkle opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 shadow-lg border border-white/40">
            <div className="flex items-center gap-4">
              {/* Bank of Ceylon Logo */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full border-4 border-black"></div>
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <div className="text-yellow-400 text-xs font-bold">
                    <svg viewBox="0 0 24 16" className="w-5 h-4 fill-current">
                      <path d="M12 2c-2 0-4 1-4 3v2c0 1 1 2 2 2h4c1 0 2-1 2-2V5c0-2-2-3-4-3z"/>
                      <path d="M8 8v4c0 1 1 2 2 2h4c1 0 2-1 2-2V8"/>
                      <circle cx="10" cy="4" r="0.5"/>
                      <circle cx="14" cy="4" r="0.5"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Welcome to CeyBank
                </h1>
                <p className="text-gray-600 font-medium">Rest Anuradhapura – Admin Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/60 rounded-2xl p-4 shadow-lg border border-white/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUserCircle className="text-2xl text-white" />
              </div>
              <div>
                <span className="text-blue-900 font-bold block">Admin</span>
                <span className="text-gray-600 text-sm">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Room Reservations"
            icon={<FaBed className="text-4xl text-white" />}
            gradient="from-blue-500 to-blue-600"
            description="Manage room bookings and availability"
          />
          <DashboardCard
            title="Store Requests"
            icon={<FaStore className="text-4xl text-white" />}
            gradient="from-blue-400 to-blue-500"
            description="Handle inventory and store requisitions"
          />
          <DashboardCard
            title="Food & Beverages"
            icon={<MdOutlineFoodBank className="text-4xl text-white" />}
            gradient="from-yellow-500 to-yellow-600"
            description="Oversee restaurant and bar operations"
          />
          <DashboardCard
            title="Payments & Billing"
            icon={<FaMoneyBillWave className="text-4xl text-white" />}
            gradient="from-yellow-400 to-yellow-500"
            description="Monitor financial transactions"
          />
          <DashboardCard
            title="Staff Management"
            icon={<FaUserCircle className="text-4xl text-white" />}
            gradient="from-blue-600 to-blue-700"
            description="Manage employee records and roles"
          />
        </div>

        {/* Additional Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Guests" value="156" change="+12%" />
          <StatCard title="Available Rooms" value="23" change="+5%" />
          <StatCard title="Revenue Today" value="Rs. 45,230" change="+8%" />
          <StatCard title="Pending Orders" value="7" change="-3%" />
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function DashboardCard({ title, icon, gradient, description }) {
  return (
    <div className="group backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
          <span>Click to manage</span>
          <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
          isPositive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
