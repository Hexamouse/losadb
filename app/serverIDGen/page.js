'use client'

import { useState } from 'react';

export default function ServerIDGen() {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [gameServerID, setGameServerID] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

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
        body: JSON.stringify({ ip, port })
      });
      const data = await res.json();

      if (data.gameServerID) {
        setResult(`Game Server ID: ${data.gameServerID}`);
        setIsModalOpen(true);
      } else {
        setError(data.error || 'Error in conversion');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  const handleConvertToAddress = async () => {
    setError('');
    setResult('');

    if (!gameServerID) {
      setError('Game Server ID is required.');
      return;
    }

    try {
      const res = await fetch('/api/serverIDGen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameServerID })
      });
      const data = await res.json();

      if (data.ip) {
        setResult(`IP Address: ${data.ip}, Port: ${data.port}`);
        setIsModalOpen(true);
      } else {
        setError(data.error || 'Error in conversion');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResult('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-white">Game Server ID Converter</h1>

      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg text-center text-black font-semibold mb-4">Convert IP & Port to Game Server ID</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">IP Address</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 text-black border rounded-lg border-gray-300"
              placeholder="192.168.1.1"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black">Port</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 text-black border rounded-lg border-gray-300"
              placeholder="8080"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
          <button
            onClick={handleConvertToServerID}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Convert
          </button>
        </div>

        {/* Convert Game Server ID to IP & Port */}
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg text-center text-black font-semibold mb-4">Convert Game Server ID to IP & Port</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black">ServerID</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 text-black border rounded-lg border-gray-300"
              placeholder="1234567890123456"
              value={gameServerID}
              onChange={(e) => setGameServerID(e.target.value)}
            />
          </div>
          <button
            onClick={handleConvertToAddress}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Convert
          </button>
        </div>
        
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Result</h2>
            <p className="text-lg text-black">{result || error}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full text-center mt-6 py-4 text-white absolute bottom-0 left-0">
        <p>by Mysticalx | LostSaga for Developers</p>
      </footer>
    </div>
  );
}