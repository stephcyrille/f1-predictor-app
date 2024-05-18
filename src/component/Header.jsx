import { Fragment, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { Popover, Transition } from '@headlessui/react'
import {
  LanguageIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import detectBrowserLanguage from 'detect-browser-language'
import { Switcher } from './switcher/Switcher'
import logo from '../assets/images/logo_scma_light.png'
import french from '../assets/images/french.svg'
import english from '../assets/images/english.svg'



export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isFrench, setIsFrench] = useState(false)
  const [isEnglish, setIsEnglish] = useState(false)
  const [curr_lng, setCurrentLanguage] = useState('en');

  useEffect(() => {
    let lng = detectBrowserLanguage().split('-')[0];

    if(lng === 'fr'){
      setIsFrench(true);
      setCurrentLanguage('fr');
    } else {
      setIsEnglish(true);
      setCurrentLanguage('en');
    }
  }, []);

  const handleSetFrench = useCallback((lng) => {
    i18n.changeLanguage(lng);
    setIsFrench(true);
    setIsEnglish(false);
    setCurrentLanguage(lng);
  }, [i18n])

  const handleSetEnglish = useCallback((lng) => {
    i18n.changeLanguage(lng)
    setIsEnglish(true);
    setIsFrench(false);
    setCurrentLanguage(lng);
  }, [i18n])


  return (
    <header className="bg-white fixed w-screen z-10 dark:bg-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MASC</span>
            <img className="h-8 w-auto dark:bg-white dark:p-1 dark:w-12 dark:rounded-full dark:h-8" src={logo} alt="Logo SCMA" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <Popover className="relative">
            <Popover.Button 
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus-visible:outline-none 
                        hover:bg-lime-100 py-2 px-3 rounded-lg ease-in-out delay-80 duration-200 dark:text-gray-100 dark:hover:text-gray-600">
              
                <LanguageIcon className='mr-2 h-6 w-6' style={{fontSize: 26}} /> {curr_lng === 'en' ? t('english') : t('french')}
                <img src={curr_lng === 'en' ? english : french} alt={`${curr_lng} flag`} className='ml-2 w-4 h-4' />
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full z-10 mt-3 w-56 max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-lime-800">
                <div className="py-4">
                  <button
                    className="w-full dark:text-gray-100 dark:hover:text-gray-800"
                    type='button'
                  >
                    <div 
                      className={`flex py-2 pl-1 ${isFrench ? 'bg-lime-200 hover:bg-lime-200 dark:text-gray-800' : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-lime-200'}`}
                      onClick={() => handleSetFrench('fr')}
                    >
                      <img src={french} alt="French flag" className='mr-4 w-6 h-6 ml-3' /> <span>{t('french')}</span> 
                    </div>
                  </button>
                  <button
                    className="w-full dark:text-gray-100 dark:hover:text-gray-800"
                    type='button'
                  >
                    <div 
                      className={`flex py-2 pl-1 ${isEnglish ? 'bg-lime-200 hover:bg-lime-200 dark:text-gray-800' : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-lime-200'}`}
                      onClick={() => handleSetEnglish('en')}
                    >
                      <img src={english} alt="French flag" className='mr-4 w-6 h-6 ml-3' /> <span>{t('english')}</span> 
                    </div>
                  </button>
                </div>
              </Popover.Panel>
            </Transition>  
          </Popover>
          <Switcher />
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">          
          <Popover className="relative">
            <Popover.Button 
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus-visible:outline-none 
                        hover:bg-lime-100 py-2 px-3 rounded-lg ease-in-out delay-80 duration-200 dark:text-gray-100 dark:hover:text-gray-600">
              
                <LanguageIcon className='mr-2 h-6 w-6' style={{fontSize: 26}} /> {curr_lng === 'en' ? t('english') : t('french')}
                <img src={curr_lng === 'en' ? english : french} alt={`${curr_lng} flag`} className='ml-2 w-4 h-4' />
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute top-full z-10 mt-3 w-56 max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-lime-800">
                  <div className="py-4">
                    <button
                      className="w-full dark:text-gray-100 dark:hover:text-gray-800"
                      type='button'
                    >
                      <div 
                        className={`flex py-2 pl-1 ${isFrench ? 'bg-lime-200 hover:bg-lime-200 dark:text-gray-800' : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-lime-200'}`}
                        onClick={() => handleSetFrench('fr')}
                      >
                        <img src={french} alt="French flag" className='mr-4 w-6 h-6 ml-3' /> <span>{t('french')}</span> 
                      </div>
                    </button>
                    <button
                      className="w-full dark:text-gray-100 dark:hover:text-gray-800"
                      type='button'
                    >
                      <div 
                        className={`flex py-2 pl-1 ${isEnglish ? 'bg-lime-200 hover:bg-lime-200 dark:text-gray-800' : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-lime-200'}`}
                        onClick={() => handleSetEnglish('en')}
                      >
                        <img src={english} alt="French flag" className='mr-4 w-6 h-6 ml-3' /> <span>{t('english')}</span> 
                      </div>
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>  
          </Popover>
          <Switcher />
        </div>
      </nav>
    </header>
  )
}
