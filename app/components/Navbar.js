'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonNav from './ButtonNav'; // Assuming ButtonNav is a separate component
import ToggleSwitch from "./ToggleSwitch"; // Import ToggleSwitch component

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle
  const [currentTime, setCurrentTime] = useState(""); // State for current time
  const [currentDate, setCurrentDate] = useState(""); // State for current date
  const menuRef = useRef(); // Reference to menu dropdown
  const router = useRouter();

  // Close menu if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update the time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? String(hours).padStart(2, '0') : '12'; // 0 becomes 12 for 12 AM
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);

      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = now.getFullYear();
      const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' }); // Get full weekday name
      setCurrentDate(`${dayOfWeek}, ${day}-${month}-${year}`);
    };

    // Initial time and date update
    updateTime();

    // Update every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className={`py-4 border-b-2 transition-all duration-300 ${isDarkMode ? 'border-gray-700' : 'border-[#333]'}`}>
      <div className="w-[70%] sm:w-[70%] mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-6 h-6 relative">
            <Image
              src={isDarkMode ? "/images/logo/lshead_white.png" : "/images/logo/lshead_black.png"}  // Dynamically change the image
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className={`text-xl sm:text-2xl font-bold transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-black'} title-custom`}>
            Lost Saga Database
          </span>
        </div>

        {/* Right section - Time, Date, Buttons */}
        <div className="flex items-center space-x-4">
          {/* Time and Date */}
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <p>{currentTime}</p>
            <p>{currentDate}</p>
          </div>

          {/* Desktop and tablet menu */}
          <ButtonNav
            className="px-4 py-2 rounded-lg flex space-x-2"
            onClick={() => router.push('#')}
          >
            <div className="w-5 h-5 relative mr-2">
              <Image src="/settings.png" alt="Settings" layout="fill" objectFit="contain" />
            </div>
            Tools
          </ButtonNav>

          <ButtonNav
            className="px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => window.open("https://github.com/LSFDC/losadb", "_blank")}
          >
            <div className="w-5 h-5 relative">
              <Image src="/github_logo.png" alt="GitHub" layout="fill" objectFit="contain" />
            </div>
            <span className="hidden sm:inline">GitHub</span>
          </ButtonNav>

          {/* Dark mode toggle */}
          <ToggleSwitch isToggled={isDarkMode} setIsToggled={toggleDarkMode} />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`sm:hidden bg-white dark:bg-gray-800 absolute top-16 left-0 w-full p-4 flex flex-col items-center space-y-4 transition-all duration-300 ${menuOpen ? 'block' : 'hidden'}`}
      >
        <ButtonNav
          className="px-4 py-2 rounded-lg flex space-x-2"
          onClick={() => router.push('#')}
        >
          <div className="w-5 h-5 relative mr-2">
            <Image src="/settings.png" alt="Settings" layout="fill" objectFit="contain" />
          </div>
          Tools
        </ButtonNav>

        <ButtonNav
          className="px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={() => window.open("https://github.com", "_blank")}
        >
          <div className="w-5 h-5 relative">
            <Image src="/github_logo.png" alt="GitHub" layout="fill" objectFit="contain" />
          </div>
          <span>GitHub</span>
        </ButtonNav>

        {/* Dark mode toggle */}
        <ToggleSwitch isToggled={isDarkMode} setIsToggled={toggleDarkMode} />
      </div>
    </nav>
  );
};

export default Navbar;