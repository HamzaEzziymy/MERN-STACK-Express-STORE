import React from 'react'
import Products from './Products';
import ProductSlide from './ProductSlide';

function Home() {
    
  return (
    <div className='home'>
        <ProductSlide/>
        <hr />
        <Products/>
    </div>
  )
}

export default Home;