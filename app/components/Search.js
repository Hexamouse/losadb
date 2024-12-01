// components/Search.js

'use client';

import Input from './Input'; // Import Input component

const Search = ({ searchTerm, setSearchTerm, isDarkMode }) => {
  return (
    <Input
      value={searchTerm}
      setValue={setSearchTerm}
      placeholder="Search Mercenary ..."
      className={`w-full ${isDarkMode ? 'bg-[#212121] duration-50 text-white' : 'bg-white text-black'}`}
    />
  );
};

export default Search;