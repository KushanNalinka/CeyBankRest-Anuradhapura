import  { useState } from 'react';

import { products } from '../../Beverages';
import ProductCart from '../../components/beverages/ProductCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';
import ceybank from '../../assets/images/bev.png';



const Home = () => {
  //const { meal } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedCategory } = useOutletContext();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
  };

  const filteredProducts = products.filter((product) => {
    //const matchesMeal = meal ? product.meal.includes(meal) : true;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });

 
  return (
    <div>
      <div className='relative my-5 flex justify-center top-10'>
        
      <img src={ceybank} alt="background" className='w-full max-w-4xl rounded mb-[-1%] ' />
        
        <div className='absolute w-full max-w-md top-28 left-[30%] transform -translate-x-1/4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for a food item...'
              value={searchTerm}
              onChange={handleSearch}
              className='w-full p-2 pl-10 pr-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#E3E6F6] text-black placeholder-[#D2D2D2] bg-white opacity-90'
            />
            <FontAwesomeIcon icon={faSearch} className='absolute left-3 top-[45%] transform -translate-y-1/2 text-[#28245F]' />
            {searchTerm && (
              <button onClick={handleReset} className='absolute right-3 top-[45%] transform -translate-y-1/2 text-[#28245F]'>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>

        

 

        {filteredProducts.map((product, key) => 
          <ProductCart key={key} data={product} />
        )}
      </div>
    </div>
  );
};


export default Home;

