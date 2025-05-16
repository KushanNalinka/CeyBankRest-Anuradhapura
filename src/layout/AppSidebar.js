// import { useCallback, useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router";
// import ceylon from "../assets/images/cey.png";

// // Assume these icons are imported from an icon library
// import {
//   BoxCubeIcon,
//   CalenderIcon,
//   ChevronDownIcon,
//   GridIcon,
//   HorizontaLDots,
//   ListIcon,
//   PageIcon,
//   PieChartIcon,
//   PlugInIcon,
//   TableIcon,
//   UserCircleIcon,

// } from "../icons";
// import { FaHotel } from "react-icons/fa";
// import { FaStore } from "react-icons/fa";
// import { MdManageAccounts } from "react-icons/md";
// import { FaKitchenSet } from "react-icons/fa6";
// import { IoFastFoodSharp } from "react-icons/io5";
// import { LiaMoneyBillSolid } from "react-icons/lia";
// import { MdBedroomParent } from "react-icons/md";
// import { MdApproval } from "react-icons/md";

// import { useSidebar } from "../context/SidebarContext";
// import SidebarWidget from "./SidebarWidget";

// type NavItem = {
//   name: string;
//   icon: React.ReactNode;
//   path?: string;
//   subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
// };

// const navItems: NavItem[] = [
//   {
//     icon: <GridIcon />,
//     name: "Dashboard",
//     subItems: [{ name: "Ecommerce", path: "/", pro: false }],
//   },
 
//   {
//     name: "Hotel",
//     icon: < FaHotel />,
//     subItems: [
//       { name: "Guest Registration", path: "/registration", pro: false },

//       { name: "Meal Ordering", path: "/cashier", pro: false },
//       { name: "Berverages Ordering", path: "/bar", pro: false },
//       { name: "Reservation Details", path: "/reservations", pro: false },
//       { name: "Reserverd Rooms", path: "/reservedrooms", pro: false },
//       { name: "Non Reserved Rooms", path: "/nonreservedrooms", pro: false },
//     ],
//   },
//   {
//     name: "Rooms",
//     icon: < MdBedroomParent />,
//     subItems: [
    
//       { name: "Rooms", path: "/room", pro: false },
//       { name: "Room Types", path: "/roomtypes", pro: false },
     
//     ],
//   },
//   {
//     name: "Bills",
//     icon: < LiaMoneyBillSolid />,
//     subItems: [
//       { name: "Room Charges", path: "/", pro: false },
//       { name: "Meals", path: "/", pro: false },
//       { name: "Beverages", path: "/", pro: false },
//       { name: "Others", path: "/", pro: false },
//       { name: "Total Bills", path: "/", pro: false },
//     ],
//   },
//   {
//     name: "Inventory",
//     icon: <FaStore />,
//     subItems: [
//       { name: "Items", path: "/item", pro: false },
//       { name: "Store Requistion", path: "/store", pro: false },
//     ],
//   },
//   {
//     name: "Approval",
//     icon: <MdApproval />,
//     subItems: [
     
//       { name: "Store Requistion Approve", path: "/storerequisitionapprove", pro: false },
//       { name: "Good Requistion Approve", path: "/goodrequistionapprove", pro: false },
      
//     ],
//   },
//   {
//     name: "Management",
//     icon: <MdManageAccounts />,
//     subItems: [
     
//       { name: "Store Requistion Confirmation", path: "/storerequisitionmgmt", pro: false },
//       { name: "Good Requistion Confirmation", path: "/goodrequistionmgmt", pro: false },
      
//     ],
//   },
//   {
//     name: "Kitchen",
//     icon: <FaKitchenSet />,
//     subItems: [
    
//       { name: "Good Requistion", path: "/goods", pro: false },
      
//     ],
//   },
//   {
//     name: "Foods",
//     icon: <IoFastFoodSharp />,
//     subItems: [
     
//       { name: "Foods & Meals", path: "/foods", pro: false },
//       { name: "Beverages", path: "/beverages", pro: false },
    
//     ],
//   },

//    {
//     name: "Finalized Requisitions",
//     icon: <MdManageAccounts />,
//     subItems: [
     
//       { name: "Finalized Store Requistion", path: "/viewstorerequisition", pro: false },
//       { name: "Finalized Good Requistion", path: "/viewgoodrequistion", pro: false },
      
//     ],
//   },
  
//   {
//     icon: <CalenderIcon />,
//     name: "Calendar",
//     path: "/calendar",
//   },
//   {
//     icon: <UserCircleIcon />,
//     name: "User Profile",
//     path: "/profile",
//   },
//   // {
//   //   name: "Forms",
//   //   icon: <ListIcon />,
//   //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
//   // },
//   {
//     name: "Tables",
//     icon: <TableIcon />,
//     subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
//   },
// ];

// const othersItems: NavItem[] = [
//   // {
//   //   icon: <PieChartIcon />,
//   //   name: "Charts",
//   //   subItems: [
//   //     { name: "Line Chart", path: "/line-chart", pro: false },
//   //     { name: "Bar Chart", path: "/bar-chart", pro: false },
//   //   ],
//   // },
//   // {
//   //   icon: <BoxCubeIcon />,
//   //   name: "UI Elements",
//   //   subItems: [
//   //     { name: "Alerts", path: "/alerts", pro: false },
//   //     { name: "Avatar", path: "/avatars", pro: false },
//   //     { name: "Badge", path: "/badge", pro: false },
//   //     { name: "Buttons", path: "/buttons", pro: false },
//   //     { name: "Images", path: "/images", pro: false },
//   //     { name: "Videos", path: "/videos", pro: false },
//   //   ],
//   // },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//     ],
//   },
// ];

// const AppSidebar: React.FC = () => {
//   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
//   const location = useLocation();

//   const [openSubmenu, setOpenSubmenu] = useState<{
//     type: "main" | "others";
//     index: number;
//   } | null>(null);
//   const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
//     {}
//   );
//   const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   // const isActive = (path: string) => location.pathname === path;
//   const isActive = useCallback(
//     (path: string) => location.pathname === path,
//     [location.pathname]
//   );

//   useEffect(() => {
//     let submenuMatched = false;
//     ["main", "others"].forEach((menuType) => {
//       const items = menuType === "main" ? navItems : othersItems;
//       items.forEach((nav, index) => {
//         if (nav.subItems) {
//           nav.subItems.forEach((subItem) => {
//             if (isActive(subItem.path)) {
//               setOpenSubmenu({
//                 type: menuType as "main" | "others",
//                 index,
//               });
//               submenuMatched = true;
//             }
//           });
//         }
//       });
//     });

//     if (!submenuMatched) {
//       setOpenSubmenu(null);
//     }
//   }, [location, isActive]);

//   useEffect(() => {
//     if (openSubmenu !== null) {
//       const key = `${openSubmenu.type}-${openSubmenu.index}`;
//       if (subMenuRefs.current[key]) {
//         setSubMenuHeight((prevHeights) => ({
//           ...prevHeights,
//           [key]: subMenuRefs.current[key]?.scrollHeight || 0,
//         }));
//       }
//     }
//   }, [openSubmenu]);

//   const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
//     setOpenSubmenu((prevOpenSubmenu) => {
//       if (
//         prevOpenSubmenu &&
//         prevOpenSubmenu.type === menuType &&
//         prevOpenSubmenu.index === index
//       ) {
//         return null;
//       }
//       return { type: menuType, index };
//     });
//   };

//   const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
//     <ul className="flex flex-col gap-4">
//       {items.map((nav, index) => (
//         <li key={nav.name}>
//           {nav.subItems ? (
//             <button
//               onClick={() => handleSubmenuToggle(index, menuType)}
//               className={`menu-item group ${
//                 openSubmenu?.type === menuType && openSubmenu?.index === index
//                   ? "menu-item-active"
//                   : "menu-item-inactive"
//               } cursor-pointer ${
//                 !isExpanded && !isHovered
//                   ? "lg:justify-center"
//                   : "lg:justify-start"
//               }`}
//             >
//               <span
//                 className={`menu-item-icon-size  ${
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? "menu-item-icon-active"
//                     : "menu-item-icon-inactive"
//                 }`}
//               >
//                 {nav.icon}
//               </span>
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <span className="menu-item-text">{nav.name}</span>
//               )}
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <ChevronDownIcon
//                   className={`ml-auto w-5 h-5 transition-transform duration-200 ${
//                     openSubmenu?.type === menuType &&
//                     openSubmenu?.index === index
//                       ? "rotate-180 text-brand-500"
//                       : ""
//                   }`}
//                 />
//               )}
//             </button>
//           ) : (
//             nav.path && (
//               <Link
//                 to={nav.path}
//                 className={`menu-item group ${
//                   isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
//                 }`}
//               >
//                 <span
//                   className={`menu-item-icon-size ${
//                     isActive(nav.path)
//                       ? "menu-item-icon-active"
//                       : "menu-item-icon-inactive"
//                   }`}
//                 >
//                   {nav.icon}
//                 </span>
//                 {(isExpanded || isHovered || isMobileOpen) && (
//                   <span className="menu-item-text">{nav.name}</span>
//                 )}
//               </Link>
//             )
//           )}
//           {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
//             <div
//               ref={(el) => {
//                 subMenuRefs.current[`${menuType}-${index}`] = el;
//               }}
//               className="overflow-hidden transition-all duration-300"
//               style={{
//                 height:
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? `${subMenuHeight[`${menuType}-${index}`]}px`
//                     : "0px",
//               }}
//             >
//               <ul className="mt-2 space-y-1 ml-9">
//                 {nav.subItems.map((subItem) => (
//                   <li key={subItem.name}>
//                     <Link
//                       to={subItem.path}
//                       className={`menu-dropdown-item ${
//                         isActive(subItem.path)
//                           ? "menu-dropdown-item-active"
//                           : "menu-dropdown-item-inactive"
//                       }`}
//                     >
//                       {subItem.name}
//                       <span className="flex items-center gap-1 ml-auto">
//                         {subItem.new && (
//                           <span
//                             className={`ml-auto ${
//                               isActive(subItem.path)
//                                 ? "menu-dropdown-badge-active"
//                                 : "menu-dropdown-badge-inactive"
//                             } menu-dropdown-badge`}
//                           >
//                             new
//                           </span>
//                         )}
//                         {subItem.pro && (
//                           <span
//                             className={`ml-auto ${
//                               isActive(subItem.path)
//                                 ? "menu-dropdown-badge-active"
//                                 : "menu-dropdown-badge-inactive"
//                             } menu-dropdown-badge`}
//                           >
//                             pro
//                           </span>
//                         )}
//                       </span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
//         ${
//           isExpanded || isMobileOpen
//             ? "w-[290px]"
//             : isHovered
//             ? "w-[290px]"
//             : "w-[90px]"
//         }
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       onMouseEnter={() => !isExpanded && setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className={`py-8 flex ${
//           !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
//         }`}
//       >
//         <Link to="/">
//           {isExpanded || isHovered || isMobileOpen ? (
//             <>
//               <img
//                 className="dark:hidden"
//                 src={ceylon}
//                 alt="Logo"
//                 width={150}
//                 height={40}
//               />
//               <img
//                 className="hidden dark:block"
//                 src={ceylon}
//                 alt="Logo"
//                 width={150}
//                 height={40}
//               />
//             </>
//           ) : (
//             <img
//               src={ceylon}
//               alt="Logo"
//               width={32}
//               height={32}
//             />
//           )}
//         </Link>
//       </div>
//       <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
//         <nav className="mb-6">
//           <div className="flex flex-col gap-4">
//             <div>
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered
//                     ? "lg:justify-center"
//                     : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Menu"
//                 ) : (
//                   <HorizontaLDots className="size-6" />
//                 )}
//               </h2>
//               {renderMenuItems(navItems, "main")}
//             </div>
//             <div className="">
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered
//                     ? "lg:justify-center"
//                     : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Others"
//                 ) : (
//                   <HorizontaLDots />
//                 )}
//               </h2>
//               {renderMenuItems(othersItems, "others")}
//             </div>
//           </div>
//         </nav>
//         {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
//       </div>
//     </aside>
//   );
// };

// export default AppSidebar;

// import { useCallback, useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router";
// import ceylon from "../assets/images/cey.png";

// // icons
// import {
//   Grid,
//   Calendar,
//   UserCircle,
//   Table,
//   Plug,
//   ChevronDown,
//   MoreHorizontal,
// } from 'lucide-react';

// import { FaHotel } from "react-icons/fa";
// import { FaStore } from "react-icons/fa";
// import { MdManageAccounts } from "react-icons/md";
// import { FaKitchenSet } from "react-icons/fa6";
// import { IoFastFoodSharp } from "react-icons/io5";
// import { LiaMoneyBillSolid } from "react-icons/lia";
// import { MdBedroomParent } from "react-icons/md";
// import { MdApproval } from "react-icons/md";

// import { useSidebar } from "../context/SidebarContext";
// import SidebarWidget from "./SidebarWidget";

// // ─────────────────────────────────────────────────────────
// // Navigation configuration
// // ─────────────────────────────────────────────────────────
// const navItems = [
//   {
//     icon: <Grid />,
//     name: "Dashboard",
//     subItems: [{ name: "Ecommerce", path: "/", pro: false }],
//   },
//   {
//     name: "Hotel",
//     icon: <FaHotel />,
//     subItems: [
//       { name: "Guest Registration", path: "/registration", pro: false },
//       { name: "Meal Ordering", path: "/cashier", pro: false },
//       { name: "Berverages Ordering", path: "/bar", pro: false },
//       { name: "Reservation Details", path: "/reservations", pro: false },
//       { name: "Reserverd Rooms", path: "/reservedrooms", pro: false },
//       { name: "Non Reserved Rooms", path: "/nonreservedrooms", pro: false },
//     ],
//   },
//   {
//     name: "Rooms",
//     icon: <MdBedroomParent />,
//     subItems: [
//       { name: "Rooms", path: "/room", pro: false },
//       { name: "Room Types", path: "/roomtypes", pro: false },
//     ],
//   },
//   {
//     name: "Bills",
//     icon: <LiaMoneyBillSolid />,
//     subItems: [
//       { name: "Room Charges", path: "/", pro: false },
//       { name: "Meals", path: "/", pro: false },
//       { name: "Beverages", path: "/", pro: false },
//       { name: "Others", path: "/", pro: false },
//       { name: "Total Bills", path: "/", pro: false },
//     ],
//   },
//   {
//     name: "Inventory",
//     icon: <FaStore />,
//     subItems: [
//       { name: "Items", path: "/item", pro: false },
//       { name: "Store Requistion", path: "/store", pro: false },
//     ],
//   },
//   {
//     name: "Approval",
//     icon: <MdApproval />,
//     subItems: [
//       { name: "Store Requistion Approve", path: "/storerequisitionapprove", pro: false },
//       { name: "Good Requistion Approve", path: "/goodrequistionapprove", pro: false },
//     ],
//   },
//   {
//     name: "Management",
//     icon: <MdManageAccounts />,
//     subItems: [
//       { name: "Store Requistion Confirmation", path: "/storerequisitionmgmt", pro: false },
//       { name: "Good Requistion Confirmation", path: "/goodrequistionmgmt", pro: false },
//     ],
//   },
//   {
//     name: "Kitchen",
//     icon: <FaKitchenSet />,
//     subItems: [{ name: "Good Requistion", path: "/goods", pro: false }],
//   },
//   {
//     name: "Foods",
//     icon: <IoFastFoodSharp />,
//     subItems: [
//       { name: "Foods & Meals", path: "/foods", pro: false },
//       { name: "Beverages", path: "/beverages", pro: false },
//     ],
//   },
//   {
//     name: "Finalized Requisitions",
//     icon: <MdManageAccounts />,
//     subItems: [
//       { name: "Finalized Store Requistion", path: "/viewstorerequisition", pro: false },
//       { name: "Finalized Good Requistion", path: "/viewgoodrequistion", pro: false },
//     ],
//   },
//   { icon: < UserCircle/>, name: "Calendar", path: "/calendar" },
//   { icon: <UserCircle />, name: "User Profile", path: "/profile" },
//   {
//     name: "Tables",
//     icon: <Table />,
//     subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
//   },
// ];

// const othersItems = [
//   {
//     icon: <Plug />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//     ],
//   },
// ];

// // ─────────────────────────────────────────────────────────
// // Component
// // ─────────────────────────────────────────────────────────
// const AppSidebar = () => {
//   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
//   const location = useLocation();

//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const [subMenuHeight, setSubMenuHeight] = useState({});
//   const subMenuRefs = useRef({});

//   const isActive = useCallback(
//     (path) => location.pathname === path,
//     [location.pathname]
//   );

//   // Highlight submenu when refreshing on a sub-route
//   useEffect(() => {
//     let submenuMatched = false;
//     ["main", "others"].forEach((menuType) => {
//       const items = menuType === "main" ? navItems : othersItems;
//       items.forEach((nav, index) => {
//         nav.subItems?.forEach((subItem) => {
//           if (isActive(subItem.path)) {
//             setOpenSubmenu({ type: menuType, index });
//             submenuMatched = true;
//           }
//         });
//       });
//     });
//     if (!submenuMatched) setOpenSubmenu(null);
//   }, [location, isActive]);

//   // Measure submenu height for smooth animation
//   useEffect(() => {
//     if (openSubmenu !== null) {
//       const key = `${openSubmenu.type}-${openSubmenu.index}`;
//       if (subMenuRefs.current[key]) {
//         setSubMenuHeight((prev) => ({
//           ...prev,
//           [key]: subMenuRefs.current[key]?.scrollHeight || 0,
//         }));
//       }
//     }
//   }, [openSubmenu]);

//   const handleSubmenuToggle = (index, menuType) => {
//     setOpenSubmenu((prev) =>
//       prev && prev.type === menuType && prev.index === index
//         ? null
//         : { type: menuType, index }
//     );
//   };

//   const renderMenuItems = (items, menuType) => (
//     <ul className="flex flex-col gap-4">
//       {items.map((nav, index) => (
//         <li key={nav.name}>
//           {/* ─ Submenu opener ─ */}
//           {nav.subItems ? (
//             <button
//               onClick={() => handleSubmenuToggle(index, menuType)}
//               className={`menu-item group ${
//                 openSubmenu?.type === menuType && openSubmenu?.index === index
//                   ? "menu-item-active"
//                   : "menu-item-inactive"
//               } cursor-pointer ${
//                 !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
//               }`}
//             >
//               <span
//                 className={`menu-item-icon-size ${
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? "menu-item-icon-active"
//                     : "menu-item-icon-inactive"
//                 }`}
//               >
//                 {nav.icon}
//               </span>
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <span className="menu-item-text">{nav.name}</span>
//               )}
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <ChevronDown
//                   className={`ml-auto w-5 h-5 transition-transform duration-200 ${
//                     openSubmenu?.type === menuType && openSubmenu?.index === index
//                       ? "rotate-180 text-brand-500"
//                       : ""
//                   }`}
//                 />
//               )}
//             </button>
//           ) : (
//             /* ─ Single-route link ─ */
//             nav.path && (
//               <Link
//                 to={nav.path}
//                 className={`menu-item group ${
//                   isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
//                 }`}
//               >
//                 <span
//                   className={`menu-item-icon-size ${
//                     isActive(nav.path)
//                       ? "menu-item-icon-active"
//                       : "menu-item-icon-inactive"
//                   }`}
//                 >
//                   {nav.icon}
//                 </span>
//                 {(isExpanded || isHovered || isMobileOpen) && (
//                   <span className="menu-item-text">{nav.name}</span>
//                 )}
//               </Link>
//             )
//           )}

//           {/* ─ Collapsible submenu ─ */}
//           {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
//             <div
//               ref={(el) => {
//                 subMenuRefs.current[`${menuType}-${index}`] = el;
//               }}
//               className="overflow-hidden transition-all duration-300"
//               style={{
//                 height:
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? `${subMenuHeight[`${menuType}-${index}`]}px`
//                     : "0px",
//               }}
//             >
//               <ul className="mt-2 space-y-1 ml-9">
//                 {nav.subItems.map((subItem) => (
//                   <li key={subItem.name}>
//                     <Link
//                       to={subItem.path}
//                       className={`menu-dropdown-item ${
//                         isActive(subItem.path)
//                           ? "menu-dropdown-item-active"
//                           : "menu-dropdown-item-inactive"
//                       }`}
//                     >
//                       {subItem.name}
//                       <span className="flex items-center gap-1 ml-auto">
//                         {subItem.new && (
//                           <span
//                             className={`ml-auto ${
//                               isActive(subItem.path)
//                                 ? "menu-dropdown-badge-active"
//                                 : "menu-dropdown-badge-inactive"
//                             } menu-dropdown-badge`}
//                           >
//                             new
//                           </span>
//                         )}
//                         {subItem.pro && (
//                           <span
//                             className={`ml-auto ${
//                               isActive(subItem.path)
//                                 ? "menu-dropdown-badge-active"
//                                 : "menu-dropdown-badge-inactive"
//                             } menu-dropdown-badge`}
//                           >
//                             pro
//                           </span>
//                         )}
//                       </span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
//         ${
//           isExpanded || isMobileOpen
//             ? "w-[290px]"
//             : isHovered
//             ? "w-[290px]"
//             : "w-[90px]"
//         }
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       onMouseEnter={() => !isExpanded && setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* ─ Logo ─ */}
//       <div
//         className={`py-8 flex ${
//           !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
//         }`}
//       >
//         <Link to="/">
//           {isExpanded || isHovered || isMobileOpen ? (
//             <>
//               <img
//                 className="dark:hidden"
//                 src={ceylon}
//                 alt="Logo"
//                 width={150}
//                 height={40}
//               />
//               <img
//                 className="hidden dark:block"
//                 src={ceylon}
//                 alt="Logo"
//                 width={150}
//                 height={40}
//               />
//             </>
//           ) : (
//             <img src={ceylon} alt="Logo" width={32} height={32} />
//           )}
//         </Link>
//       </div>

//       {/* ─ Menu items ─ */}
//       <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
//         <nav className="mb-6">
//           <div className="flex flex-col gap-4">
//             {/* Main section */}
//             <div>
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Menu"
//                 ) : (
//                   < MoreHorizontal className="size-6" />
//                 )}
//               </h2>
//               {renderMenuItems(navItems, "main")}
//             </div>

//             {/* Others section */}
//             <div>
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Others"
//                 ) : (
//                   < MoreHorizontal />
//                 )}
//               </h2>
//               {renderMenuItems(othersItems, "others")}
//             </div>
//           </div>
//         </nav>

//         {/* ─ Optional widget ─ */}
//         {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
//       </div>
//     </aside>
//   );
// };

// export default AppSidebar;

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import ceylon from '../assets/images/cey.png';

/* ─ Icons ─ */
import { Grid, Calendar, UserCircle, Plug, ChevronDown, MoreHorizontal } from 'lucide-react';
import { FaHotel, FaStore } from 'react-icons/fa';
import { MdManageAccounts, MdBedroomParent, MdApproval } from 'react-icons/md';
import { FaKitchenSet } from 'react-icons/fa6';
import { IoFastFoodSharp } from 'react-icons/io5';
import { LiaMoneyBillSolid } from 'react-icons/lia';

import { useSidebar } from '../context/SidebarContext';
import SidebarWidget from './SidebarWidget';

/* ───────────────────────────────────────────── */
/* Navigation arrays – UNCHANGED (just pasted)   */
/* ───────────────────────────────────────────── */
const navItems = [
  { icon: <Grid />, name: 'Dashboard', subItems: [{ name: 'Ecommerce', path: '/home', pro: false }] },
  {
    name: 'Hotel',
    icon: <FaHotel />,
    subItems: [
      { name: 'Guest Registration', path: '/registration', pro: false },
      { name: 'Meal Ordering', path: '/cashier', pro: false },
      { name: 'Berverages Ordering', path: '/bar', pro: false },
      { name: 'Reservation Details', path: '/reservations', pro: false },
      { name: 'Reserverd Rooms', path: '/reservedrooms', pro: false },
      { name: 'Non Reserved Rooms', path: '/nonreservedrooms', pro: false },
    ],
  },
  {
    name: 'Rooms',
    icon: <MdBedroomParent />,
    subItems: [
      { name: 'Rooms', path: '/room', pro: false },
      { name: 'Room Types', path: '/roomtypes', pro: false },
    ],
  },
  {
    name: 'Bills',
    icon: <LiaMoneyBillSolid />,
    subItems: [
      { name: 'Room Charges', path: '/', pro: false },
      { name: 'Meals', path: '/foodbills', pro: false },
      { name: 'Beverages', path: '/beveragebills', pro: false },
      { name: 'Others', path: '/', pro: false },
      { name: 'Total Bills', path: '/', pro: false },
    ],
  },
  {
    name: 'Inventory',
    icon: <FaStore />,
    subItems: [
      { name: 'Items', path: '/item', pro: false },
      { name: 'Store Requistion', path: '/store', pro: false },
    ],
  },
  {
    name: 'Approval',
    icon: <MdApproval />,
    subItems: [
      { name: 'Store Requistion Approve', path: '/storerequisitionapprove', pro: false },
      { name: 'Good Requistion Approve', path: '/goodrequisitionapprove', pro: false },
    ],
  },
  {
    name: 'Management',
    icon: <MdManageAccounts />,
    subItems: [
      { name: 'Store Requistion Confirmation', path: '/storerequisitionmgmt', pro: false },
      { name: 'Good Requistion Confirmation', path: 'goodrequisitionmgmt', pro: false },
    ],
  },
  { name: 'Kitchen', icon: <FaKitchenSet />, subItems: [{ name: 'Good Requistion', path: '/goods', pro: false }] },
  {
    name: 'Foods',
    icon: <IoFastFoodSharp />,
    subItems: [
      { name: 'Foods & Meals', path: '/foods', pro: false },
      { name: 'Beverages', path: '/beverages', pro: false },
    ],
  },
  {
    name: 'Finalized Requisitions',
    icon: <MdManageAccounts />,
    subItems: [
      { name: 'Finalized Store Requistion', path: '/viewstorerequisition', pro: false },
      { name: 'Finalized Good Requistion', path: '/viewgoodrequisition', pro: false },
    ],
  },
  { icon: <Calendar />, name: 'Calendar', path: '/calendar' },
  { icon: <UserCircle />, name: 'User Profile', path: '/profile' },
  
];

const othersItems = [
  {
    icon: <Plug />,
    name: 'Authentication',
    subItems: [
      { name: 'Sign In', path: '/signin', pro: false },
      { name: 'Sign Up', path: '/signup', pro: false },
    ],
  },
];

/* ───────────────────────────────────────────── */
/*                Component                      */
/* ───────────────────────────────────────────── */
const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname],
  );

  /* highlight submenu on refresh */
  useEffect(() => {
    let matched = false;
    ['main', 'others'].forEach((type) => {
      (type === 'main' ? navItems : othersItems).forEach((nav, idx) => {
        nav.subItems?.forEach((s) => {
          if (isActive(s.path)) {
            setOpenSubmenu({ type, index: idx });
            matched = true;
          }
        });
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [location, isActive]);

  /* measure heights for transitions */
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const el = subMenuRefs.current[key];
      if (el) {
        setSubMenuHeight((h) => ({ ...h, [key]: el.scrollHeight || 0 }));
      }
    }
  }, [openSubmenu]);

  const toggleSubmenu = (index, type) =>
    setOpenSubmenu((p) => (p && p.type === type && p.index === index ? null : { type, index }));

  /* ─ helper to render groups ─ */
  const renderMenu = (items, type) => (
    <ul className="flex flex-col gap-[3px]">
      {items.map((nav, i) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => toggleSubmenu(i, type)}
              className={[
                'flex items-center gap-3 w-full rounded-lg px-3 py-2 transition group',
                'text-sm font-medium',
                openSubmenu?.type === type && openSubmenu?.index === i
                  ? 'bg-brand-50/60 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300',
                !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
              ].join(' ')}
            >
              <span className="shrink-0 text-[20px]">{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span>{nav.name}</span>
                  <ChevronDown
                    size={18}
                    className={`ml-auto transition-transform duration-300 ${
                      openSubmenu?.type === type && openSubmenu?.index === i ? 'rotate-180' : ''
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={[
                  'flex items-center gap-3 w-full rounded-lg px-3 py-2 transition',
                  'text-sm font-medium',
                  isActive(nav.path)
                    ? 'bg-brand-100 dark:bg-brand-400/20 text-brand-700 dark:text-brand-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300',
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
                ].join(' ')}
              >
                <span className="shrink-0 text-[20px]">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
              </Link>
            )
          )}

          {/* collapsible sub-items */}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => (subMenuRefs.current[`${type}-${i}`] = el)}
              style={{
                height:
                  openSubmenu?.type === type && openSubmenu?.index === i
                    ? `${subMenuHeight[`${type}-${i}`]}px`
                    : '0px',
              }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
            >
              <ul className="flex flex-col gap-[2px] ml-[44px] mt-[2px]">
                {nav.subItems.map((s) => (
                  <li key={s.name}>
                    <Link
                      to={s.path}
                      className={[
                        'relative flex items-center rounded-md px-2.5 py-1.5 text-sm',
                        isActive(s.path)
                          ? 'font-medium text-brand-600 dark:text-brand-300 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-brand-500'
                          : 'text-gray-500 dark:text-gray-400 hover:text-brand-500',
                      ].join(' ')}
                    >
                      {s.name}
                      {(s.new || s.pro) && (
                        <span
                          className={[
                            'ml-2 rounded-full px-2 py-[1px] text-[10px] leading-none',
                            isActive(s.path)
                              ? 'bg-brand-100 text-brand-700 dark:bg-brand-400/20 dark:text-brand-200'
                              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
                          ].join(' ')}
                        >
                          {s.new ? 'new' : 'pro'}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  /* ────────────────── render ────────────────── */
  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-50 flex flex-col',
        'bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-r',
        'border-gray-200 dark:border-gray-800 transition-[width,transform] duration-300 ease-in-out',
        isExpanded || isMobileOpen || isHovered ? 'w-[280px]' : 'w-20',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        !isExpanded && !isMobileOpen && 'lg:hover:shadow-2xl lg:hover:ring-1 lg:hover:ring-black/5 dark:lg:hover:ring-white/10',
      ].join(' ')}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* logo */}
      <div className={['flex items-center py-6 transition-all duration-300', !isExpanded && !isHovered ? 'justify-center' : 'px-6'].join(' ')}>
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img src={ceylon} alt="Logo" className="dark:hidden w-36" />
              <img src={ceylon} alt="Logo" className="hidden dark:block w-36" />
            </>
          ) : (
            <img src={ceylon} alt="Logo" className="w-8" />
          )}
        </Link>
      </div>

      {/* menu */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-1 pb-6">
        <nav className="space-y-6">
          {/* main */}
          <SectionLabel open={isExpanded || isHovered || isMobileOpen} label="Menu" />
          {renderMenu(navItems, 'main')}

          <hr className="border-dashed border-gray-200 dark:border-gray-700 my-3" />

          {/* others */}
          <SectionLabel open={isExpanded || isHovered || isMobileOpen} label="Others" />
          {renderMenu(othersItems, 'others')}
        </nav>
      </div>

      {/* optional widget */}
      {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
    </aside>
  );
};

/* ───── small helper for section headings ───── */
const SectionLabel = ({ open, label }) => (
  <h2
    className={[
      'text-[11px] tracking-widest uppercase font-semibold',
      'text-gray-400 dark:text-gray-500',
      open ? 'pl-3 mb-2' : 'flex justify-center mb-2',
    ].join(' ')}
  >
    {open ? label : <MoreHorizontal size={18} />}
  </h2>
);

export default AppSidebar;
