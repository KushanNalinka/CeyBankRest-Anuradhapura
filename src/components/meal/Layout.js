// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './SideBar';
// import Header from './Header';
// import CartTab from './CartTab';


// const Layout = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   //const statusTabCart = useSelector(store => store.cart.statusTab);

//   return (
//     <div className='bg-white flex'>


//       <Sidebar setSelectedCategory={setSelectedCategory} /> 
//       <div className={`flex-1 transition-transform duration-500 ml-56 mr-96`}>
//         <main className='w-full m-auto p-1'>
//           <Header />
//           <Outlet context={{ selectedCategory }} />
//         </main>
//       </div>
//       <CartTab />
//     </div>
//   );
// };

// export default Layout;





import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import Header from './Header';
import CartTab from './CartTab';

const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className='bg-white flex relative h-screen overflow-hidden'>
      {/* Left Sidebar */}
      <Sidebar setSelectedCategory={setSelectedCategory} />

      {/* Main content */}
      <div className='flex-1 ml-56 mr-96 overflow-y-auto'>
        <main className='w-full m-auto p-1'>
          <Header />
          <Outlet context={{ selectedCategory }} />
        </main>
      </div>

      {/* Right Sidebar (CartTab) */}
      <CartTab />
    </div>
  );
};

export default Layout;
