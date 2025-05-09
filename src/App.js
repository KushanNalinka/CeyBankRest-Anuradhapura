import { BrowserRouter as Router, Routes, Route } from "react-router";
//import SignIn from "./pages/AuthPages/SignIn";
//import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
//import UserProfiles from "./pages/UserProfiles";

//import Calendar from "./pages/Calendar";
//import BasicTables from "./pages/Tables/BasicTables";

import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import GuestRegistration from "./pages/Hotel/GuestRegistration";

import InitialScreen from "./pages/meal/InitialScreen";
import Layout from "./components/meal/Layout";
import Homen from "./pages/meal/Home";
import Layoutn from "./components/store/Layout";
import Homenn from "./pages/store/Home";
import RoomTypeList from "./pages/RoomTypes/RoomTypeList";
import RoomList from "./pages/Rooms/RoomList";
import InventoryItemList from "./pages/Inventory/InventoryItemList";

import GoodLayout from "./components/goods/Layout";
import GoodHome from "./pages/goods/Home";
import FoodList from "./pages/Foods/FoodList";
import BeverageList from "./pages/Beverages/BeverageList";
import BeverageLayout from "./components/beverages/Layout";
import BeverageHome from "./pages/beveragesOrdering/Home";
import StoreRequistionList from "./pages/storeRequisitionManagement/StoreRequisitionList";
import StoreRequisitionItems from "./pages/storeRequisitionManagement/StoreRequisitionItems";
import StoreRequistionGrantList from "./pages/storeRequisitionGranting/StoreRequisitionList";
import StoreRequisitionGrantItems from "./pages/storeRequisitionGranting/StoreRequisitionItems";
import FinalStoreRequistion from "./pages/finalizedRequisitions/StoreRequisitionList";
import FinalStoreRequisitionItems from "./pages/finalizedRequisitions/StoreRequisitionItems";
import Reservations from "./pages/Hotel/Reservation";
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}

          <Route path='/cashier/meal/:meal' element={<Layout />}>
          <Route index element={<Homen />} />
          {/* <Route path='/cashier/meal/:meal/:slug' element={<Detail />} /> */}
        </Route>

        <Route path='/store' element={<Layoutn />}>
          <Route index element={<Homenn />} />
          {/* <Route path='/cashier/meal/:meal/:slug' element={<Detail />} /> */}
        </Route>

        <Route path='/goods' element={<GoodLayout/>}>
          <Route index element={<GoodHome />} />
          {/* <Route path='/cashier/meal/:meal/:slug' element={<Detail />} /> */}
        </Route>

        <Route path='/bar' element={<BeverageLayout/>}>
          <Route index element={<BeverageHome />} />
          {/* <Route path='/cashier/meal/:meal/:slug' element={<Detail />} /> */}
        </Route>
          
          <Route element={<AppLayout />}>
            <Route index path="/home" element={<Home />} />

            <Route path="/cashier" element={<InitialScreen/>} />
            
           
  

            {/* Others Page */}
            {/* <Route path="/profile" element={<UserProfiles />} /> */}
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            <Route path="/blank" element={<Blank />} />
            <Route path="/registration" element={<GuestRegistration />} />
           
            <Route path="/roomtypes" element={<RoomTypeList />} />
            <Route path="/room" element={<RoomList />} />
            <Route path="/item" element={<InventoryItemList/>} />

            <Route path="/foods" element={<FoodList/>} />
            <Route path="/beverages" element={<BeverageList/>} />
            <Route path="/storerequisitionapprove" element={<StoreRequistionList />} />
            <Route path="/requisition-items/:id" element={<StoreRequisitionItems />} />
            <Route path="/storerequisitionmgmt" element={<StoreRequistionGrantList />} />
            <Route path="/requisition/grant/:id" element={<StoreRequisitionGrantItems />} />
            
            <Route path="/viewstorerequisition" element={<FinalStoreRequistion />} />
            <Route path="/requisition-final/:id" element={<FinalStoreRequisitionItems />} />
            <Route path="/reservations" element={<Reservations />} />


            {/* Hotel Management */}

            {/* Forms */}
            {/* <Route path="/form-elements" element={<FormElements />} /> */}

            {/* Tables */}
            {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

            {/* Ui Elements */}
            {/* <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} /> */}

            {/* Charts */}
            {/* <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* Auth Layout */}
           <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} /> 

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
