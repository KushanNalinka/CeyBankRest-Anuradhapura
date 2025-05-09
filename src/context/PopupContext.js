// import React, { createContext, useContext, useState } from "react";

// interface PopupContextProps {
//   isPopupOpen: boolean;
//   openPopup: () => void;
//   closePopup: () => void;
// }

// const PopupContext = createContext<PopupContextProps | undefined>(undefined);

// export const usePopup = () => {
//   const context = useContext(PopupContext);
//   if (!context) {
//     throw new Error("usePopup must be used within a PopupProvider");
//   }
//   return context;
// };

// export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const openPopup = () => setIsPopupOpen(true);
//   const closePopup = () => setIsPopupOpen(false);

//   return (
//     <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
//       {children}
//     </PopupContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};
