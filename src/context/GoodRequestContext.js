// ✅ GoodRequestContext.tsx
// import React, { createContext, useContext, useState } from 'react';

// const GoodRequestContext = createContext();

// export const useGoodRequest = () => useContext(GoodRequestContext);

// export const GoodRequestProvider = ({ children }) => {
//   const [requestItems, setRequestItems] = useState([]);
//   const [showRequestTab, setShowRequestTab] = useState(false);

//   const addRequestItem = (productId, quantity) => {
//     setRequestItems(prev => {
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

//   const updateRequestQuantity = (productId, quantity) => {
//     setRequestItems(prev =>
//       quantity > 0
//         ? prev.map(item =>
//             item.productId === productId ? { ...item, quantity } : item
//           )
//         : prev.filter(item => item.productId !== productId)
//     );
//   };

//   const clearRequests = () => setRequestItems([]);

//   return (
//     <GoodRequestContext.Provider
//       value={{
//         requestItems,
//         addRequestItem,
//         updateRequestQuantity,
//         clearRequests,
//         showRequestTab,
//         setShowRequestTab,
//       }}
//     >
//       {children}
//     </GoodRequestContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from 'react';

const GoodRequestContext = createContext();

export const useGoodRequest = () => useContext(GoodRequestContext);

export const GoodRequestProvider = ({ children }) => {
  // Load from sessionStorage if available
  const initialItems = (() => {
    const saved = sessionStorage.getItem('requestItems');
    return saved ? JSON.parse(saved) : [];
  })();

  const [requestItems, setRequestItems] = useState(initialItems);
  const [showRequestTab, setShowRequestTab] = useState(false);

  const addRequestItem = (productId, quantity) => {
    setRequestItems(prev => {
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

  const updateRequestQuantity = (productId, quantity) => {
    setRequestItems(prev =>
      quantity > 0
        ? prev.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          )
        : prev.filter(item => item.productId !== productId)
    );
  };

  const clearRequests = () => {
    setRequestItems([]);
    sessionStorage.removeItem('requestItems'); // <-- also wipe from session
  };

  // Keep sessionStorage updated
  useEffect(() => {
    sessionStorage.setItem('requestItems', JSON.stringify(requestItems));
  }, [requestItems]);

  return (
    <GoodRequestContext.Provider
      value={{
        requestItems,
        addRequestItem,
        updateRequestQuantity,
        clearRequests,
        showRequestTab,
        setShowRequestTab,
      }}
    >
      {children}
    </GoodRequestContext.Provider>
  );
};
