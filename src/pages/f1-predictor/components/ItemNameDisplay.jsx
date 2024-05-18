import React from "react";

export const ItemNameDisplay = ({data, item_index, textSize='text-7xl', textSizeSm='text-3xl', race=false}) => {
  
  return (
    <div className='py-4'>
      {data.map((item, index) => (
        <h1 key={index} className={`drop-shadow-2xl absolute right-0 left-0 text-center ${textSizeSm} lg:${textSize} md:${textSize} mt-0 transition-opacity duration-300 ease-in-out ${item_index === index ? 'opacity-100 translate-y-0 transition-transform' : 'opacity-0 translate-y-10'}`}>
          {race ? `(GP #${item.id}) ${item.name}` : item.full_name} 
        </h1>
      ))}
    </div>
  );
}