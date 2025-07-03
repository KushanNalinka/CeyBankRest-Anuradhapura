

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCoffee, FaHamburger, FaUtensils } from 'react-icons/fa';
// import { RiDrinks2Fill } from "react-icons/ri";
// import { IoFastFoodSharp } from "react-icons/io5";


// const MealSelector = () => {
//   const navigate = useNavigate();

//   const handleMealClick = (meal) => {

//    // navigate(`/meal/${meal}`);
//     navigate(`/cashier/meal/${meal}`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white">
//       <h1 className="text-4xl font-bold mb-10 text-[#28245F]">Select Your Meal</h1>
//       <div className="flex space-x-10">
//         <div className="flex flex-col items-center">
//           <div
//             className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
//             onClick={() => handleMealClick('Breakfast')}
//           >
//             <FaCoffee size={100} className="text-[#28245F] group-hover:text-white" />
//           </div>
//           <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Breakfast</h2>
//         </div>
//         <div className="flex flex-col items-center">
//           <div
//             className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
//             onClick={() => handleMealClick('Lunch')}
//           >
//             <FaHamburger size={100} className="text-[#28245F] group-hover:text-white" />
//           </div>
//           <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Lunch</h2>
//         </div>
//         <div className="flex flex-col items-center">
//           <div
//             className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
//             onClick={() => handleMealClick('Dinner')}
//           >
//             <FaUtensils size={100} className="text-[#28245F] group-hover:text-white" />
//           </div>
//           <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Dinner</h2>
//         </div>
//         <div className="flex flex-col items-center">
//           <div
//             className="meal-card bg-white w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 shadow-xl hover:bg-yellow-300 active:bg-yellow-500 group"
//             onClick={() => handleMealClick('Alacarte')}
//           >
//             <IoFastFoodSharp size={100} className="text-[#28245F] group-hover:text-white" />
//           </div>
//           <h2 className="text-xl font-semibold mt-2 text-center text-[#28245F] font-medium">Ala Carte</h2>
//         </div>

    


//       </div>
//     </div>
//   );
// };

// export default MealSelector;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCoffee, FaHamburger, FaUtensils } from 'react-icons/fa';
import { RiDrinks2Fill } from "react-icons/ri";
import { IoFastFoodSharp } from "react-icons/io5";

const MealSelector = () => {
  const navigate = useNavigate();

  const handleMealClick = (meal) => {
    navigate(`/cashier/meal/${meal}`);
  };

  const meals = [
    {
      id: 'Breakfast',
      name: 'Breakfast',
      icon: FaCoffee,
      description: 'Start your day right',
      color: 'from-orange-400 to-orange-500'
    },
    {
      id: 'Lunch',
      name: 'Lunch',
      icon: FaHamburger,
      description: 'Midday delights',
      color: 'from-green-400 to-green-500'
    },
    {
      id: 'Dinner',
      name: 'Dinner',
      icon: FaUtensils,
      description: 'Evening feast',
      color: 'from-purple-400 to-purple-500'
    },
    {
      id: 'Alacarte',
      name: 'Ala Carte',
      icon: IoFastFoodSharp,
      description: 'Choose your favorites',
      color: 'from-blue-400 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FaUtensils className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Your Meal</h1>
          <p className="text-lg text-gray-600">Choose from our delicious meal options</p>
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {meals.map((meal) => {
            const IconComponent = meal.icon;
            return (
              <div
                key={meal.id}
                className="group cursor-pointer"
                onClick={() => handleMealClick(meal.id)}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                  {/* Icon Container */}
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${meal.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {meal.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{meal.description}</p>
                    
                    {/* Action Button */}
                    <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <span className="text-sm font-medium">Select {meal.name}</span>
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-lg">
            <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-800 text-sm font-medium">Click on any meal category to view available items</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSelector;