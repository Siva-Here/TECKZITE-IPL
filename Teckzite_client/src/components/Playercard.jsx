import React, { useState, useEffect } from 'react';
import { FaFlag, FaUser, FaBowlingBall, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { PiCricketBold } from 'react-icons/pi';


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(amount);
};

const PlayerCard = ({players}) => {
    console.log("Players inplayerscard:",players);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(players);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center p-4'>
      <div className=" w-full max-w-xs bg-black rounded-xl p-4 backdrop-blur-sm border border-cyan-500/20">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gray-800" />
          <div className="w-3/4 h-4 bg-gray-800 rounded" />
          <div className="w-1/2 h-4 bg-gray-800 rounded" />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="h-12 bg-gray-800 rounded" />
            <div className="h-12 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="w-full max-w-xs bg-gray-900/50 rounded-xl p-4 border border-red-500/20">
        <div className="text-red-500 text-center">
          <p className="text-sm font-semibold">Player data not available</p>
        </div>
      </div>
    );
  }

  const isSold = player.isSold;

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-sm  bg-[#161929] rounded-lg overflow-hidden shadow-md">
        <div
          className={`relative border rounded-lg ${
            isSold
              ? 'shadow-[0_0_15px_rgba(6,182,212,0.3)] border-cyan-500/30'
              : 'shadow-[0_0_10px_rgba(239,68,68,0.2)] border-red-500/20'
          }`}
        >
          <div className="relative">
            <div className="w-24 h-24 mx-auto mt-4 rounded-full overflow-hidden border-2 border-cyan-500/30">
              <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-3 right-3 bg-gray-900/70 px-2 py-1 rounded-full flex items-center space-x-1">
              <FaFlag className="text-cyan-500 w-3 h-3" />
              <span className="text-xs text-white">{player.nationality}</span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="text-center">
              <h2 className="text-lg font-bold text-cyan-400">{player.name}</h2>
              <div className="flex justify-center space-x-2 text-gray-400 text-xs">
                <div className="flex items-center">
                  <FaUser className="text-cyan-500 w-3 h-3" />
                  <span className="ml-1">{player.age} years</span>
                </div>
                <div className="flex items-center">
                  <PiCricketBold className="text-cyan-500 w-3 h-3" />
                  <span className="ml-1">{player.role}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#232533] p-2 rounded-lg">
                <p className="text-gray-400 text-xs">Runs</p>
                <p className="text-sm font-bold text-cyan-400">{player.runs}</p>
              </div>
              <div className="bg-[#232533] p-2 rounded-lg">
                <p className="text-gray-400 text-xs">Wickets</p>
                <p className="text-sm font-bold text-cyan-400">{player.wickets}</p>
              </div>
              <div className="bg-[#232533] p-2 rounded-lg">
                <p className="text-gray-400 text-xs">Strike Rate</p>
                <p className="text-sm font-bold text-cyan-400">{player.strikeRate}</p>
              </div>
            </div>
            <div className="bg-[#232533] p-2 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Auction Status</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isSold ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {isSold ? 'SOLD' : 'UNSOLD'}
                </span>
              </div>
              {isSold && (
                <div className="mt-1 text-xs flex justify-between text-gray-400">
                  <span>{player.soldTeam}</span>
                  <span className="text-cyan-400 font-bold">{formatCurrency(player.soldAmount)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
