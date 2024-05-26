import React, { forwardRef, useRef } from "react";

export const ItemSelectorHScroll = forwardRef(({ dataList, idx, handleImageClick, handleImageHover }, ref) => {
  const datRef = useRef(null);

  const handleMouseMove = (event) => {
    const rect = datRef.current.getBoundingClientRect();
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
          datRef.current = el;
          if (ref) {
            ref.current = el;
          }
        }}
        className='flex items-center text-slate-400 dark:text-slate-50 overflow-x-auto bg-gray-300 dark:bg-gray-800 py-8 my-4 lg:my-16 bg-opacity-60 dark:bg-opacity-60'
        onMouseMove={handleMouseMove}
      >
        {dataList
          .sort((a, b) => a.round - b.round)
          .map((data, key) => (
            <img
              key={key}
              src={data.circuit_img}
              alt={data.name}
              className={`w-24 h-24 md:w-44 md:h-52 lg:w-52 lg:h-52 rounded-full mx-2 p-2 hover:bg-white cursor-pointer hover:scale-125 ease-out duration-300 ${idx === key ? 'bg-white dark:bg-gray-400 scale-125 mx-8' : ''}`}
              onMouseOver={() => handleImageHover(key)}
              onClick={handleImageClick}
              data-tooltip-target="tooltip-default"
            />
        ))}
      </div>
    </>
  );
});
