
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const Detail = () => {

    

  const { slug } = useParams();
  const [detail, setDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    const findDetail = products.filter(product => product.slug === slug);
    if (findDetail.length > 0) {
      setDetail(findDetail[0]);
    } else {
      navigate('/'); // Navigate to home if product not found
    }
  }, [slug, navigate]);

  
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: detail.id,
        quantity: quantity
      })
    );
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <h2 className='text-3xl text-center'>PRODUCT DETAIL</h2>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        <div>
          <img src={detail.image} alt={detail.name} className='w-full' />
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-4xl uppercase font-bold'>{detail.name}</h1>
          <p className='font-bold text-3xl'>Rs.{detail.price}</p>
          <div className='flex gap-5'>
            <div className='flex gap-2 justify-center items-center'>
              
            </div>
            <button
              className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl'
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          <p>{detail.description}</p>
          <button
            className='bg-gray-100 text-black px-5 py-2 rounded-xl shadow'
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

