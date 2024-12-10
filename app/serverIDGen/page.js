'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useDarkMode from '../hooks/useDarkMode';

export default function ServerIDGen() {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [gameServerID, setGameServerID] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);

  // Get dark mode state and toggler from the custom hook
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Handle conversion from IP & port to Game Server ID
  const handleConvertToServerID = async () => {
    setError('');
    setResult('');

    if (!ip || !port) {
      setError('IP address and port are required.');
      return;
    }

    try {
      const res = await fetch('/api/serverIDGen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, port }),
      });
      const data = await res.json();

      console.log('ServerID response:', data); // Cek data respons

      if (data.gameServerID) {
        setResult(`ServerID: ${data.gameServerID}`);
        setIsModalOpen(true); // Open modal on success
        console.log('Modal should be open now.');
      } else {
        setError(data.error || 'Error in conversion');
        setIsModalOpen(true); // Open modal on error
        console.log('Modal should be open now.');
      }
    } catch (err) {
      setError('Something went wrong.');
      setIsModalOpen(true); // Open modal on error
      console.log('Modal should be open now.');
    }
  };

  // Handle conversion from Game Server ID to IP & Port
  const handleConvertToAddress = async () => {
    setError('');
    setResult('');

    if (!gameServerID) {
      setError('ServerID is required.');
      return;
    }

    try {
      const res = await fetch('/api/serverIDGen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameServerID }),
      });
      const data = await res.json();

      if (data.ip) {
        setResult(`IP Address: ${data.ip}, Port: ${data.port}`);
        setIsModalOpen(true); // Open modal on success
      } else {
        setError(data.error || 'Error in conversion');
        setIsModalOpen(true); // Open modal on error
      }
    } catch (err) {
      setError('Something went wrong.');
      setIsModalOpen(true); // Open modal on error
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResult('');
    setError('');
  };

  const closeTutorial = () => {
    setIsTutorialVisible(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? 'bg-[#2D2D2D] text-white' : 'bg-[#FEF2E8] text-black'
      } transition-all duration-500`}
    >
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {isTutorialVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div
            className={`border-2 border-black ${
              isDarkMode ? 'bg-[#333]' : 'bg-white'
            } shadow-2xl max-w-lg p-8`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              How to Use
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              This tool allows you to convert between GameServer ID and its
              corresponding IP address and port. To convert from IP &amp; Port to
              Game Server ID, simply enter the values and click &quot;Convert&quot;.
              To convert from Game Server ID to IP &amp; Port, input the Game Server
              ID and click &quot;Convert&quot;. Results will appear in the modal.
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeTutorial}
                className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500"
              >
                Close Tutorial
              </Button>
            </div>
          </div>
        </div>
      )}

      <h1
        className={`text-4xl mt-12 font-extrabold text-center ${
          isDarkMode ? 'text-white' : 'text-[#212121]'
        }`}
      >
        GameServerID Generator
      </h1>

      <div className="flex flex-col items-center md:flex-row md:space-x-8 w-[90%] md:w-[80%] mx-auto mb-8 flex-grow justify-center gap-8">
        <div
          className={`w-full border-2 border-black rounded-xl max-w-md ${
            isDarkMode ? 'bg-[#333]' : 'bg-white'
          } p-8 shadow-xl`}
        >
          <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-6">
            Convert IP & Port to Game Server ID
          </h2>
          <div className="mb-4">
            <Input
              label="IP Address"
              className="w-full"
              value={ip}
              setValue={setIp}
              placeholder="192.168.1.1"
            />
          </div>
          <div className="mb-6">
            <Input
              label="Port"
              className="w-full"
              value={port}
              setValue={setPort}
              placeholder="8080"
            />
          </div>
          <Button
            onClick={handleConvertToServerID}
            className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
          >
            Convert
          </Button>

          <Button
            onClick={() => setIsTutorialVisible(true)}
            className="w-full py-3 mt-4 bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-500"
          >
            Show Tutorial
          </Button>
        </div>

        <div className="flex justify-center items-center mb-8 md:mb-0">
          <Image src="/convert.svg" alt="Conversion Icon" width={100} height={100} />
        </div>

        <div
          className={`w-full border-2 border-black rounded-xl max-w-md ${
            isDarkMode ? 'bg-[#333]' : 'bg-white'
          } p-8 shadow-xl`}
        >
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Convert Game Server ID to IP & Port
          </h2>
          <div className="mb-6">
            <Input
              label="ServerID"
              className="w-full"
              value={gameServerID}
              setValue={setGameServerID}
              placeholder="1234567890123456"
            />
          </div>
          <Button
            className="w-full py-3 bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-500"
            onClick={handleConvertToAddress}
          >
            Convert
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className={`bg-white rounded-lg shadow-2xl max-w-lg p-8 ${
              isDarkMode ? 'bg-[#333]' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Result
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              {result || error}
            </p>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeModal}
                className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer isDarkMode={isDarkMode} className="bg-gray-800 text-white py-2 mt-auto" />
    </div>
  );
}