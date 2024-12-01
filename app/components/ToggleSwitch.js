import React from 'react';

export default function ToggleSwitch({ 
  isToggled, 
  setIsToggled, 
  ariaLabel = 'Switch between light and dark mode' 
}) {
  return (
    <label 
      className="inline-flex items-center cursor-pointer" 
      aria-label={ariaLabel}
    >
      {/* Sun Icon */}
      <span className="mr-2 w-5 h-5 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-5 h-5 transition-colors duration-300 ${
            isToggled ? 'text-gray-400' : 'text-yellow-500'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      </span>

      {/* Checkbox Input */}
      <input
        type="checkbox"
        role="switch"
        aria-checked={isToggled}
        onChange={(e) => setIsToggled(e.target.checked)}
        checked={isToggled}
        className="sr-only peer"
        id="theme-toggle"
      />

      {/* Toggle Switch Track */}
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full 
        peer dark:bg-gray-700 
        peer-checked:after:translate-x-full 
        peer-checked:bg-gray-700 
        after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
        after:bg-white after:rounded-full after:h-5 after:w-5 
        after:transition-all after:duration-300 
        hover:bg-gray-300 dark:hover:bg-gray-600 
        transition-colors"
      ></div>

      {/* Moon Icon */}
      <span className="ml-2 w-5 h-5 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-5 h-5 transition-colors duration-300 ${
            isToggled ? 'text-white' : 'text-gray-400'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </span>
    </label>
  );
}