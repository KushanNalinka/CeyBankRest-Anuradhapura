// // StoreContext.tsx
// import React, { createContext, useState, useContext } from 'react';

// const StoreContext = createContext();

// export const useStore = () => useContext(StoreContext);

// export const StoreProvider = ({ children }) => {
//   const [storeItems, setStoreItems] = useState([]);
//   const [storeStatusTab, setStoreStatusTab] = useState(false);

//   const addToStore = (productId, quantity) => {
//     setStoreItems(prev => {
//       const existing = prev.find(item => item.productId === productId);
//       if (existing) {
//         return prev.map(item =>
//           item.productId === productId
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       } else {
//         return [...prev, { productId, quantity }];
//       }
//     });
//   };

//   const updateStoreQuantity = (productId, quantity) => {
//     setStoreItems(prev =>
//       quantity > 0
//         ? prev.map(item => item.productId === productId ? { ...item, quantity } : item)
//         : prev.filter(item => item.productId !== productId)
//     );
//   };

//   const clearStore = () => setStoreItems([]);

//   return (
//     <StoreContext.Provider value={{
//       storeItems,
//       addToStore,
//       updateStoreQuantity,
//       clearStore,
//       storeStatusTab,
//       setStoreStatusTab
//     }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
// } from 'react';

// const StoreContext = createContext();

// // ---------- helpers ----------
// const generateId = () => {
//   const num = Math.floor(1e7 + Math.random() * 9e7);
//   return `SR${num}`;
// };

// export const useStore = () => useContext(StoreContext);

// // ---------- provider ----------
// export const StoreProvider = ({ children }) => {
//   /* ①  hydrate from localStorage, fall back to defaults  */
//   const [storeItems, setStoreItems] = useState(() => {
//     const saved = localStorage.getItem('storeItems');
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [storeReqId, setStoreReqId] = useState(() => {
//     const saved = localStorage.getItem('storeReqId');
//     return saved || generateId();
//   });

//   const [storeStatusTab, setStoreStatusTab] = useState(false);

//   /* ②  keep localStorage in-sync on every change  */
//   useEffect(() => {
//     localStorage.setItem('storeItems', JSON.stringify(storeItems));
//   }, [storeItems]);

//   useEffect(() => {
//     localStorage.setItem('storeReqId', storeReqId);
//   }, [storeReqId]);

//   /* ---------- CRUD helpers ---------- */
//   const addToStore = (productId, quantity) => {
//     setStoreItems((prev) => {
//       const existing = prev.find((i) => i.productId === productId);
//       if (existing) {
//         return prev.map((i) =>
//           i.productId === productId
//             ? { ...i, quantity: i.quantity + quantity }
//             : i,
//         );
//       }
//       return [...prev, { productId, quantity }];
//     });
//   };

//   const updateStoreQuantity = (productId, quantity) => {
//     setStoreItems((prev) =>
//       quantity > 0
//         ? prev.map((i) =>
//             i.productId === productId ? { ...i, quantity } : i,
//           )
//         : prev.filter((i) => i.productId !== productId),
//     );
//   };

//   /* ③  reset everything after a successful requisition  */
//   const clearStore = () => {
//     setStoreItems([]);
//     setStoreReqId(generateId()); // prepare next requisition
//     localStorage.removeItem('storeItems');
//     localStorage.removeItem('storeReqId');
//   };

//   return (
//     <StoreContext.Provider
//       value={{
//         /* exposed state */
//         storeItems,
//         storeReqId,
//         storeStatusTab,
//         /* exposed actions */
//         addToStore,
//         updateStoreQuantity,
//         clearStore,
//         setStoreStatusTab,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };


// context/StoreContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  /* --------  NEW: hydrate from sessionStorage  -------- */
  const initialItems = (() => {
    const saved = sessionStorage.getItem('storeItems');
    return saved ? JSON.parse(saved) : [];
  })();

  const [storeItems, setStoreItems] = useState(initialItems);
  const [storeStatusTab, setStoreStatusTab] = useState(false);

  /* --------  EXISTING LOGIC (unchanged)  -------- */
  const addToStore = (productId, quantity) => {
    setStoreItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { productId, quantity }];
      }
    });
  };

  const updateStoreQuantity = (productId, quantity) => {
    setStoreItems(prev =>
      quantity > 0
        ? prev.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        : prev.filter(item => item.productId !== productId)
    );
  };

  /* --------  UPDATED: also wipe sessionStorage  -------- */
  const clearStore = () => {
    setStoreItems([]);
    sessionStorage.removeItem('storeItems');
  };

  /* --------  NEW: keep sessionStorage in sync  -------- */
  useEffect(() => {
    sessionStorage.setItem('storeItems', JSON.stringify(storeItems));
  }, [storeItems]);

  return (
    <StoreContext.Provider
      value={{
        storeItems,
        addToStore,
        updateStoreQuantity,
        clearStore,
        storeStatusTab,
        setStoreStatusTab,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
