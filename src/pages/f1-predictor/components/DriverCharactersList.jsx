import React, { forwardRef, useRef } from "react";

export const DriverCharactersList = forwardRef(({ drivers, driver_index, handleImageClick, handleImageHover }, ref) => {
  const divRef = useRef(null);

  const handleMouseMove = (event) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;

    // Calculate the width of the corner area (e.g., 50 pixels)
    const cornerWidth = 50;

    // Check if the mouse is in the left or right corner
    const isLeftCorner = x <= cornerWidth;
    const isRightCorner = x >= rect.width - cornerWidth;

    if (isLeftCorner) {
      console.log("Mouse is in the left corner", ref);
      ref.current.scrollTo({
        top: 0,
        left: -300,
        behavior: "smooth",
      });
    } else if (isRightCorner) {
      console.log("Mouse is in the right corner");
      ref.current.scrollTo({
        top: 0,
        left: ref.current.scrollLeft + 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        ref={(el) => {
          divRef.current = el;
          if (ref) {
            ref.current = el;
          }
        }}
        className='flex items-center text-slate-400 dark:text-slate-50 overflow-x-auto bg-slate-500 py-8 lg:my-16 bg-opacity-60 dark:bg-opacity-60'
        onMouseMove={handleMouseMove}
      >
        {drivers.map((driver, index) => (
          <img
            key={index}
            src={driver.driver_img}
            alt={driver.full_name}
            className={`w-24 h-24 md:w-44 md:h-44 lg:w-44 lg:h-44 rounded-full mx-2 hover:border-red-500 border-4 cursor-pointer hover:scale-125 ease-out duration-300 ${driver_index === index && 'scale-125 border-red-500 dark:border-lime-500 mx-6'}`}
            onMouseOver={() => handleImageHover(index)}
            onClick={handleImageClick}
          />
        ))}
      </div>
    </>
  );
});
