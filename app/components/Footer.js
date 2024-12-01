const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`py-4 ${isDarkMode ? 'bg-[#212121] text-white' : 'bg-[#FEF2E8] text-black'} border-t-2 ${isDarkMode ? 'border-gray-700' : 'border-[#333]'
        }`}
    >
      <div className="w-[70%] md:w-[70%] mx-auto flex justify-between items-center">
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
          © 2024 Lost Saga for Developer | Created by{' '}
          <a
            href="https://discord.com/users/939930682275283005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-700"
          >
            Mysticalx
          </a>
          . All rights reserved.
        </span>
        <div className="flex text-sm space-x-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-400'} ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Tools
          </a>
          <a
            href="https://github.com/LSFDC"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-400'} ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@lsfdyt"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:${isDarkMode ? 'text-gray-300' : 'text-gray-400'} ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Youtube
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  