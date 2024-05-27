import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import { DriverBigCard } from '../components/DriverBigCard';
import { ItemNameDisplay } from '../components/ItemNameDisplay';
import { DriverCharactersList } from '../components/DriverCharactersList';
import { getAllDriversList } from '../../../services';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const routeVariants = {
  initial: { x: '-100%' },
  final: {
    x: '0',
    transition: { duration: 0.5, delay: 0.1 },
  }
};

export const PredictorFirstPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [selectedDriverIndex, setSelectedDriverIndex] = useState(0);
  const [driversList, setDriversList] = useState([]);
  const hasFetched = useRef(false);
  const [searchParams,] = useSearchParams();
  const [ready, setReady] = useState(false);
  const [errorMissingVal, setErrorMissingVal] = useState(false);

  useEffect(() => {
    if(ready) return;
    
    if(searchParams.get('missing')) {
      setErrorMissingVal(true);
    } 
    setReady(true)
  }, [ready, searchParams, navigate])

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const result = await getAllDriversList();
        if (Array.isArray(result) && result.length > 0) {
          setDriversList(result);
        } else {
          console.error("Received an empty or invalid array.");
        }
      } catch (error) {
        console.error('Error getting drivers list:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleImageHover = useCallback((index) => {
    setSelectedDriverIndex(index);
  }, []);

  const handleImageClick = useCallback(() => {
    if (driversList.length > 0) {
      navigate({
        pathname: "/select-circuit",
        search: createSearchParams({
          driverId: driversList[selectedDriverIndex]?.driverId,
          constructorId: driversList[selectedDriverIndex]?.cid,
        }).toString()
      });
    }
  }, [navigate, selectedDriverIndex, driversList]);

  return (
    <motion.div variants={routeVariants} initial="initial" animate="final">
      <div className="relative mix-blend-overlay">
        <img
          src={driversList.length > 0 ? driversList[selectedDriverIndex].constructor_img : ''}
          alt="BannerImage"
          className="absolute h-screen lg:h-screen w-full object-cover object-right z-10"
        />
        <div className="absolute z-20 bg-gradient-to-r from-gray-900 via-gray-600 to-red-300 dark:from-gray-900 dark:via-lime-800 dark:to-gray-900 h-screen lg:h-screen w-full opacity-60" />
        <div className="absolute z-20 h-screen lg:h-screen w-full pt-32">
          { errorMissingVal && (
            <p className='bg-red-700 text-center -mt-10 mb-10 p-2 text-white'>
              <FontAwesomeIcon className='mr-2' icon={faExclamationTriangle} style={{ color: 'white', fontSize: '1em' }} />
              Error: Missings values ! <br/> 
              If the problem persist <a title='Send an email' className='pointer w-4 text-gray-900 italic ml-2 bg-white p-1' href='mailto:contact@stephanemebenga.site'>contact the administrator</a></p>
          )}
          <div className='text-amber-400 dark:text-lime-400 pb-0'>
            <h1 className='text-center lg:text-xl md:text-xl text-white'>
              Select the driver
            </h1>
            <ItemNameDisplay data={driversList} item_index={selectedDriverIndex} />
          </div>
          <DriverBigCard drivers={driversList} driver_index={selectedDriverIndex} />
          {/* Hide the driver list that had hover effect action when we have a mobile device */}
          <div className="hidden md:block lg:block">
            <DriverCharactersList
              ref={containerRef}
              drivers={driversList}
              driver_index={selectedDriverIndex}
              handleImageHover={handleImageHover}
              handleImageClick={handleImageClick}
            />
          </div>
          
          <div className="block md:hidden lg:hidden">
            <div className='flex items-center justify-center mb-4'>
              <button 
                className='bg-red-600 dark:bg-gray-900 text-white dark:text-lime-300 p-2 
                            rounded-lg border-solid border-2 border-gray-300
                            dark:border-lime-300'
                onClick={handleImageClick}
                >
                Select this driver &gt;
              </button>
            </div>
            <DriverCharactersList
              ref={containerRef}
              drivers={driversList}
              driver_index={selectedDriverIndex}
              handleImageHover={(handleImageHover)}
              handleImageClick={() => {}}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
