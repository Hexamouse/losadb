'use client';

import Image from "next/image";
import Button from '../components/Button'; // Import Button component
import Badge_Type from './Badge_Type'; // Import Badge_Type component
import Badge from '../components/Badge'; // Import Badge component

const MercenaryGrid = ({ mercenaries, hoveredMercenary, setHoveredMercenary, isDarkMode, handleViewClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {mercenaries.map((mercenary) => (
        <div
          key={mercenary.id}
          className={`transition-all duration-50 p-4 border-2 border-[black] rounded-lg shadow-lg hover:shadow-2xl flex flex-col sm:flex-row items-center sm:items-start
            ${isDarkMode ? 'bg-[#212121]0 border-2 border-gray-700 text-white' : 'bg-white border-black text-black'}`}
        >
          <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] mb-4 sm:mb-0">
            <Image
              src={`/images/mercenary/${String(mercenary.id).padStart(3, '0')}/${String(mercenary.id).padStart(3, '0')}_${hoveredMercenary === mercenary.id ? 'thumb_female' : 'thumb_male'}.jpg`}
              alt={mercenary.name}
              layout="fill"
              objectFit="cover"
              className={`rounded-lg border-2 ${isDarkMode ? 'border-[#374151]' : 'border-black'}`}
              onMouseEnter={() => setHoveredMercenary(mercenary.id)}
              onMouseLeave={() => setHoveredMercenary(null)}
            />
          </div>

          <div className="ml-0 sm:ml-4 flex flex-col justify-between flex-grow text-center sm:text-left">
            <h3 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'} mb-1`}>
              {mercenary.name}
              <span className="bg-[#333] px-2 py-1 text-sm text-white rounded-md ml-2">
                {String(mercenary.id).padStart(3, '0')}
              </span>
            </h3>

            <div className="flex flex-wrap justify-center sm:justify-start space-x-3 mt-2">
              <Badge_Type text={mercenary.type} />
              <Badge text={mercenary.AttackType} />
            </div>

            <Button
              className="mt-4"
              onClick={() => handleViewClick(mercenary.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MercenaryGrid;
