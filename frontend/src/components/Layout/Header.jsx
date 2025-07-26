import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Globe, ChevronDown } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { getTranslation } from '../../utils/translations';

const languages = [
  'English', 
  'ಕನ್ನಡ (Kannada)', 
  'हिंदी (Hindi)'
];

const Header = () => {
  const { setSidebarOpen, selectedLanguage, setLanguage, user } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 lg:pl-64">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-lg font-semibold text-gray-900">
              {getTranslation(selectedLanguage, 'appTitle')}
            </h1>
            <p className="text-sm text-gray-500">
              {getTranslation(selectedLanguage, 'appSubtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <Globe className="h-4 w-4" />
              <span>{selectedLanguage}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => handleLanguageSelect(language)}
                      className={`
                        block w-full text-left px-4 py-2 text-sm
                        ${language === selectedLanguage ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                      `}
                      role="menuitem"
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Farmer</p>
              <p className="text-xs text-gray-500">
                ID: {user?.uid?.substring(0, 8) || 'Anonymous'}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-green-600">F</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;