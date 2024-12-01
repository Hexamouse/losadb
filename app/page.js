'use client';

import { useRouter } from "next/navigation";
import Select from './components/Select';
import Search from './components/Search';
import MercenaryGrid from './components/MercenaryGrid';
import Button from './components/Button';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import useMercenaries from './hooks/useMercenaries';
import useDarkMode from './hooks/useDarkMode';
import useScrollTopButton from './hooks/useScrollTopButton';
import useFilters from './hooks/useFilters';
import { useState } from 'react'; // Import useState
import Head from 'next/head';  // Import Head from next/head

export default function Home() {
  const { mercenaries, isMounted } = useMercenaries();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const showScrollTopBtn = useScrollTopButton();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedAttackType,
    setSelectedAttackType,
    filterMercenaries,
  } = useFilters();

  const [hoveredMercenary, setHoveredMercenary] = useState(null); // Add hoveredMercenary state
  const router = useRouter();

  // Apply filtering logic
  const filteredMercenaries = filterMercenaries(mercenaries);

  // Handle mercenary view
  const handleViewClick = (id) => {
    router.push(`/Mercenary/${id}`);
  };

  // Handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate unique categories and attack types for filters
  const mercenaryTypes = ["All", ...new Set(mercenaries.map((mercenary) => mercenary.type))];
  const attackTypes = ["All", ...new Set(mercenaries.map((mercenary) => mercenary.AttackType))];

  // Avoid rendering before mounting (to prevent hydration issues)
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-50 ${isDarkMode ? 'bg-[#212121] text-white' : 'bg-[#FEF2E8] text-black'}`}>
      {/* Add favicon here using next/head */}
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <meta name="description" content="Lost Saga Database - A Web Database for Lost Saga" />
      </Head>

      {/* Navbar */}
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Main content */}
      <div className="w-[70%] md:w-[70%] mx-auto mb-8 flex-grow transition-all duration-500">
        {/* Filter section */}
        <div className="flex items-center space-x-4 mb-4 mt-10 relative z-10">
          <Select
            items={mercenaryTypes}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            placeholder="Select Category"
          />

          <Select
            items={attackTypes}
            selectedCategory={selectedAttackType}
            setSelectedCategory={setSelectedAttackType}
            placeholder="Select Attack Type"
          />

          {/* Search Component */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} isDarkMode={isDarkMode} />
        </div>

        {/* Mercenaries Grid */}
        <MercenaryGrid
          mercenaries={filteredMercenaries}
          hoveredMercenary={hoveredMercenary}
          setHoveredMercenary={setHoveredMercenary}
          isDarkMode={isDarkMode}
          handleViewClick={handleViewClick}
        />
      </div>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />

      {/* Scroll to Top Button */}
      {showScrollTopBtn && (
        <Button
          onClick={handleScrollToTop}
          className="fixed bottom-20 right-10 p-4 bg-[#FFDC58] text-black rounded-lg shadow-lg hover:bg-[#FFDC58] transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          ↑
        </Button>
      )}
    </div>
  );
}