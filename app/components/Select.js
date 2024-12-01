'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Select({ items, selectedCategory, setSelectedCategory }) {
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track the highlighted index for keyboard navigation

  // Handle item selection
  const handleItemClick = (itemName) => {
    setSelectedCategory(itemName === "All" ? "" : itemName); // Set empty string for "All"
    setIsActiveSelect(false); // Close the dropdown when an item is selected
  };

  // Handle keyboard navigation (Up and Down arrows)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
    }
    if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
    if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleItemClick(items[highlightedIndex]);
    }
  };

  return (
    <div
      className="relative group text-text"
      aria-expanded={isActiveSelect}
      onKeyDown={handleKeyDown} // Allow keyboard navigation
      tabIndex="0" // Make the select component focusable
    >
      <button
        onClick={() => setIsActiveSelect(!isActiveSelect)}
        onBlur={() => setIsActiveSelect(false)} // Close on blur (when clicking outside)
        aria-haspopup="listbox"
        className="flex min-w-[100px] w-max cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-2 font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
      >
        <div className="mx-auto flex items-center">
          {selectedCategory || "All"} {/* Display selected item, or default "Type" */}
          <ChevronDown
            className={`ml-2 h-5 w-5 transition-transform ${isActiveSelect ? 'rotate-180' : 'rotate-0'} ease-in-out`}
          />
        </div>
      </button>

      {/* Dropdown menu */}
      <div
        role="listbox"
        className={`absolute left-0 min-w-[100px] overflow-x-hidden w-max ${isActiveSelect ? 'top-14 opacity-100 visible' : 'top-[50px] opacity-0 invisible'} rounded-base border-2 border-border dark:border-darkBorder font-base shadow-light dark:shadow-dark transition-all`}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item)}
            className={`block w-full border-b-2 border-border dark:border-darkBorder bg-main px-5 py-3 hover:bg-mainAccent ${
              index === highlightedIndex ? 'bg-mainAccent' : '' // Highlight the selected item
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}