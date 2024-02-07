import React, { useState } from 'react';
//import '../styles/Dashboard/dashboardStyle.css';
import { icons } from "../assets";

export const GetPremiumModal = ({ isVisible, onClose }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    isVisible && (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-lg z-50 overflow-hidden w-3/5 lg:w-1/2 xl:w-2/5"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col w-full p-5 h-full justify-center items-center">
            <h1 className="opacity-95 text-neutral-900 text-3xl font-bold mb-2">The Right Plan for You</h1>
            <p className="opacity-70 text-center text-zinc-500 text-base font-normal mb-5">Connect. Win. Repeat.</p>
            <div className="flex flex-row justify-around items-center w-3/5 my-5">
              <p className={`w-1/3 opacity-95 text-right text-neutral-900 transition-transform duration-300 ease-in-out text-base ${!isOn ? 'font-bold' : 'font-normal'}`}>Bill Monthly</p>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggleB"
                    className="sr-only"
                    checked={isOn}
                    onChange={() => setIsOn(!isOn)}
                  />
                  <div className="block bg-neutral-900 w-14 h-6 rounded-full"></div>
                  <div className={`dot absolute left-1 top-1 bg-primary w-4 h-4 rounded-full duration-300 ease-in-out ${isOn ? 'transform translate-x-8' : ''}`}></div>
                </div>
              </label>
              <p
                className={`w-1/3 opacity-95 text-neutral-900 transition-transform duration-300 ease-in-out text-base ${isOn ? 'font-bold' : 'font-normal'}`}>
                Bill Annually
              </p>
            </div>
            <div className='flex flex-row gap-4 mt-4'>
              <div className="bg-neutral-100 rounded-3xl flex flex-col w-1/2 p-6">
                <div className="flex-grow flex flex-col">
                  <div className="space-y-4 mb-4">
                    <span className="text-neutral-900 text-2xl font-bold">Crypto/Stocks</span>
                    <span className="text-neutral-900 text-2xl font-bold underline"> OR</span>
                    <br/>
                    <span className="text-neutral-900 text-2xl font-bold">Sports</span>
                  </div>
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center space-x-2">
                      <img src={icons.checkMark} alt='img' className="w-2.5 h-2" />
                      <p className="text-neutral-900 text-base font-normal">One (1) Area of Interest Included</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img src={icons.checkMark} alt='img' className="w-2.5 h-2" />
                      <p className="text-neutral-900 text-base font-normal">Advanced Analytics for One Area</p>
                    </div>
                  </div>
                  <div className="flex items-end space-x-1 mt-3 flex-grow">
                    <div className="opacity-95">
                      <span className="text-neutral-900 text-base font-normal">$</span>
                      <span className="text-neutral-900 text-2xl font-bold transition-transform duration-300 ease-in-out">{isOn ? '299' : '29.99'}</span>
                    </div>
                    <p className="opacity-70 text-zinc-500 text-base font-normal transition-transform duration-300 ease-in-out">{isOn ? '/year' : '/month'}</p>
                  </div>
                  <button className="w-full h-12 flex-grow bg-primary rounded-lg mt-3 flex items-center justify-center">
                    <p className="text-center text-neutral-900 text-base font-bold">Free Trial</p>
                  </button>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-3xl flex flex-col p-6 w-1/2 justify-between">
                <h3 className="text-white text-2xl font-bold flex-grow mb-4">All Inclusive</h3>

                <div className="w-28 bg-white rounded px-2 py-1 flex justify-start items-center flex-grow mb-4">
                  <p className="opacity-95 text-neutral-900 text-xs font-bold">Save $120/year</p>
                </div>

                <div className="space-y-4 flex-grow mb-3">
                  <div className="flex items-center space-x-2">
                    <img src={icons.checkMarkWhite} alt='img' className="w-3 h-2.5" />
                    <p className="text-white text-base font-normal">Sports, Stocks, & Crypto Included</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <img src={icons.checkMarkWhite} alt='img' className="w-3 h-2.5" />
                    <p className="text-white text-base font-normal">Advanced Analytics for Everything</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 flex-grow mb-3">
                  <div className="opacity-95">
                    <span className="text-white text-base font-normal">$</span>
                    <span className="text-white text-2xl font-bold transition-transform duration-300 ease-in-out">{isOn ? '499' : '49.99'}</span>
                  </div>
                  <p className="opacity-70 text-white text-base font-normal transition-transform duration-300 ease-in-out">{isOn ? '/year' : '/month'}</p>
                </div>

                <button className="w-full h-12 bg-primary rounded-lg flex items-center justify-center flex-grow">
                  <p className="text-center text-neutral-900 text-xl font-bold">Try 1 month</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    )
  );
}
