import React, {useRef, useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";

import { ItemSelectorHScroll } from '../components/ItemSelectorHScroll';
import { ItemNameDisplay } from '../components/ItemNameDisplay';
import { getAlCircuitList } from '../../../services'

const routeVariants = {
  initial: {
    x: '200%',
    transition: {
      type: "spring",
      mass: 0.4,
    },
  },
  final: {
    x: '0',
    transition: {
      duration: 0.4,
      delay: 0.1,
    },
  }
}

export const PredictorSecondPage = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams,] = useSearchParams();
  const [circuitList, setCircuitList] = useState([]);
  const [ready, setReady] = useState(false);
  const [driverId, setDriverId] = useState(null);
  const [constructorId, setConstructorId] = useState(null);
  const hasFetched = useRef(false);
  const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);

  useEffect(() => {
    if(ready) return;
    
    if ((searchParams.get('driverId') && searchParams.get('constructorId'))) {
      if(searchParams.get('driverId') !== "" 
          && searchParams.get('constructorId') !== "") {
        setDriverId(searchParams.get('driverId'));
        setConstructorId(searchParams.get('constructorId'));
      }
    } else {
      navigate({
        pathname: "/",
        search: createSearchParams({
          missing: "all",
        }).toString()
      });
    }
    setReady(true)
  }, [ready, searchParams, navigate])

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const result = await getAlCircuitList();
        if (Array.isArray(result) && result.length > 0) {
          // Fonction de comparaison pour trier par round (ordre ascendant)
          const sortByRound = (a, b) => {
            return parseInt(a.round) - parseInt(b.round);
          };

          // Trier la liste de circuits
          result.sort(sortByRound);
          setCircuitList(result);
        } else {
          console.error("Received an empty or invalid array.");
        }
        // Handle the result or update your component state accordingly
      } catch (error) {
        // Handle errors
        console.error('Error getting circuit list:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleImageHover = (index) => {
    setSelectedCircuitIndex(index);
  };
  
  const handleImageClick = () => {
    navigate({
      pathname: "/prediction",
      search: createSearchParams({
        driverId: driverId,
        constructorId: constructorId,
        circuitId: circuitList[selectedCircuitIndex].circuitId,
        raceRound: circuitList[selectedCircuitIndex].round
      }).toString()
    });
  };

  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
    >
      <div className="relative mix-blend-overlay">
        <img src={circuitList.length > 0 ? circuitList[selectedCircuitIndex].card_img : ''} alt="BannerImage" className="absolute h-screen lg:h-screen w-full object-cover object-right z-10" />
        <div className="absolute z-20 bg-gradient-to-r from-gray-900 via-gray-600 to-red-300 dark:from-gray-900 dark:via-lime-800 dark:to-gray-900 h-screen lg:h-screen w-full opacity-60" />
        <div className="absolute z-20 h-screen lg:h-screen w-full pt-6">
          <button
            onClick={handleBackClick}
            className="bg-transparent text-red-100 dark:border-lime-600 dark:hover:bg-lime-600 hover:text-white hover:bg-red-600 dark:hover:text-blue-100 dark:text-lime-300 py-2 px-4 rounded-full 
            focus:outline-none transition duration-200 mb-0 hover:shadow-xl lg:ml-12 hover:-translate-x-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {t('driver.selection')}
          </button>

          <div className='text-amber-100 dark:text-lime-400 pb-2 md:pb-6 lg:pb-6 mb-10'>
            <ItemNameDisplay data={circuitList} item_index={selectedCircuitIndex} textSize="text-5xl" textSizeSm='text-2xl' race={true} />
          </div>
          <div className="mx-auto lg:flex md:flex max-w-7xl items-center justify-between px-0 lg:px-8">
            <div className="md:py-4 sm:p-8 lg:grid lg:grid-cols-2 lg:static lg:max-h-full bg-white lg:overflow-visible md:rounded-lg lg:rounded-lg shadow-lg dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-70">
              <img className="absolute w-96 z-10 opacity-15" alt='Flag' src={circuitList.length > 0 ? circuitList[selectedCircuitIndex].country_img : ''} />
              <div className="p-6 flex flex-col z-50 text-amber-950 dark:text-amber-200 text-xl lg:text-2xl md:text-2xl justify-evenly">
                  <h3><span className='underline font-bold text-sm'>{t('round.no')} {circuitList.length > 0 && circuitList[selectedCircuitIndex].id}:</span> <span className="text-sm lg:text-xl md:text-xl">{circuitList.length > 0 && circuitList[selectedCircuitIndex].name}</span></h3>
                  <h3><span className='underline font-bold text-sm'>{t('round.location')}:</span> <span className="text-sm lg:text-xl md:text-xl">{circuitList.length > 0 &&  circuitList[selectedCircuitIndex].location}, {circuitList.length > 0 && circuitList[selectedCircuitIndex].country}</span></h3>
                  <h3><span className='underline font-bold text-sm'>{t('round.date')}</span>: <span className="text-sm lg:text-xl md:text-xl">{circuitList.length > 0 &&circuitList[selectedCircuitIndex].date}</span></h3>
              </div>
              <div className="p-2 lg:p-6 md:flex lg:flex md:justify-center lg:justify-center">
                <img className='h-48 md:h-80 lg:h-80 self-center' src={circuitList.length > 0 ? circuitList[selectedCircuitIndex].circuit_img : ''} alt="Stephane Cyrille" />
              </div>
            </div>
          </div>

          <div className="hidden md:block lg:block">
            <ItemSelectorHScroll 
              ref={containerRef} 
              dataList={circuitList} 
              idx={selectedCircuitIndex} 
              handleImageHover={handleImageHover} 
              handleImageClick={handleImageClick} /> 
          </div>

          <div className="block md:hidden lg:hidden pt-4">
            <div className='flex items-center justify-center my-4'>
              <button 
                className='bg-red-600 dark:bg-gray-900 text-white dark:text-lime-300 p-2 
                            rounded-lg border-solid border-2 border-gray-300
                            dark:border-lime-300'
                onClick={handleImageClick}
                >
                {t('select.track')} &gt;
              </button>
            </div>
            <ItemSelectorHScroll 
              ref={containerRef} 
              dataList={circuitList} 
              idx={selectedCircuitIndex} 
              handleImageHover={handleImageHover} 
              handleImageClick={() => {}} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
