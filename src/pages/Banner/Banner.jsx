import React from 'react';
import bookimage from '../../assets/bannerBook.png'

const Banner = () => {
    return (
        <div className='flex items-center justify-between bg-gray-100 rounded-2xl mb-5 mt-8'>
            <div className='ml-20 mt-5'>
                <h1 className='font-bold text-[#131313] text-6xl mb-8'>Books to freshen up <br /> your bookshelf</h1>
                <button className='btn bg-[#23BE0A] text-white font-bold' >View The List</button>
                
            </div>
            <div className='mr-20 mt-5 mb-5 rounded-2xl'>
                <img className='h-80' src={bookimage} alt="" />
            </div>
        </div>
    );
};

export default Banner;