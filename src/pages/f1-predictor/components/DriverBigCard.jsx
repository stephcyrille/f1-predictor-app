import React from "react";

export const DriverBigCard = ({drivers, driver_index}) => {

  return (
    <div className="h-72 mt-4 md:h-96 md:mt-20 lg:h-96 flex lg:mt-20 pt-4 lg:pt-0">
      {drivers.map((driver, index) => (
        <img
          key={index}
          src={driver.driver_img}
          alt={`Driver main`}
          className={`absolute right-0 left-0 w-60 h-60 lg:w-96 lg:h-96 rounded-full mb-8 mx-auto border-red-500 dark:border-lime-500 border-x-4 border-spacing-10 transition-opacity duration-300 ease-in-out ${driver_index === index ? 'opacity-100 translate-y-0 transition-transform' : 'opacity-0 translate-y-10'}`} />
      ))}
    </div>
  );
}
