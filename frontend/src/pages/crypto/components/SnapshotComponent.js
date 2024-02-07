import React, { useEffect, useRef, useState } from 'react';
import { icons } from "../../../assets";
import { Chart, registerables } from 'chart.js';

export const SnapshotComponent = () => {
  const cryptoData = [
    {
        name: 'Bitcoin',
        code: 'BTC',
        price: '$42,071.05',
        change: '+ 2.94%',
        graph: icons.graphGreen,
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
    },
    {
        name: 'Ethereum',
        code: 'ETH',
        price: '$2,500.00',
        change: '+ 5.00%',
        graph: icons.graphGreen,
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
        name: 'Cardano',
        code: 'ADA',
        price: '$2.05',
        change: '- 0.50%',
        graph: icons.graphRed,
        image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
    },
    {
        name: 'Ripple',
        code: 'XRP',
        price: '$0.90',
        change: '+ 1.20%',
        graph: icons.graphGreen,
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
    }
    ,
    {
        name: 'Ethereum',
        code: 'ETH',
        price: '$2,500.00',
        change: '+ 5.00%',
        graph: icons.graphGreen,
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
        name: 'Cardano',
        code: 'ADA',
        price: '$2.05',
        change: '- 0.50%',
        graph: icons.graphRed,
        image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
    },
    {
        name: 'Ripple',
        code: 'XRP',
        price: '$0.90',
        change: '+ 1.20%',
        graph: icons.graphGreen,
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
    }
];

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <span
        className='flex items-center overflow-hidden transition-all text-neutral-900 text-xl font-semibold leading-relaxed'
      >
        <img src={icons.tradeColor} className='mr-2' alt='img' />
        Snapshot
      </span>
      <div className="flex-col w-full my-6 justify-center items-center p-3 border border-lightGray bg-white rounded-lg">
        <div className="w-full h-20 overflow-x-auto flex">
          {cryptoData.map((item, index) => (
            <div
              className={`w-16 h-20 flex flex-col justify-center items-center mr-4 p-2 rounded-xl border border-lightGray ${index === selectedCardIndex ? 'bg-primary' : 'bg-white'}`}
              key={index}
              onClick={() => setSelectedCardIndex(index)}
            >
              <div className="w-10 h-10 relative mt-2">
                <img className="w-6 h-6 absolute top-2 left-2" src={item.image} alt="img" />
              </div>
              <div className="text-center text-neutral-900 text-xs font-semibold mt-2">{item.code}</div>
            </div>
          ))}
        </div>

        <div className='flex flex-row w-full justify-between mt-6'>
          <div className='flex justify-between'>
            <div className="flex-col justify-between items-start inline-flex">
              <div className="text-neutral-900 text-lg font-semibold">BTC</div>
              <div className="text-neutral-900 text-xl font-bold leading-relaxed">22,228.00</div>
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-between">
              <div className='h-1/2 flex justify-end items-end mb-3'>
                <div className="w-14 h-6 bg-green rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs font-semibold leading-none">1.76%</div>
                </div>
              </div>

              <div className='h-1/2 grid grid-cols-2'>
                <div className="p-1 text-zinc-500 text-xs font-medium leading-none">24 High</div>
                <div className="p-1 text-neutral-900 text-xs font-medium leading-none">22,391.00</div>
                <div className="p-1 text-zinc-500 text-xs font-medium leading-none">24 Low</div>
                <div className="p-1 text-neutral-900 text-xs font-medium leading-none">21,439.40</div>
              </div>
            </div>

          </div>
        </div>

        <div className='flex flex-row justify-between w-full mt-6'>
          <div className='w-6 h-6'>
            <img src={icons.stocksGray} alt='img' />
          </div>
          <div className="w-11/12 h-6 flex justify-around">
            <button className="flex-grow flex items-center justify-center bg-white rounded-lg border border-lightGray">
              <div className="text-center text-zinc-500 text-xs font-medium leading-none">15m</div>
            </button>
            <button className="flex-grow flex items-center justify-center bg-white rounded-lg border border-lightGray">
              <div className="text-center text-zinc-500 text-xs font-medium leading-none">1h</div>
            </button>
            <button className="flex-grow flex items-center justify-center bg-white rounded-lg border border-lightGray">
              <div className="text-center text-zinc-500 text-xs font-medium leading-none">4h</div>
            </button>
            <button className="flex-grow flex items-center justify-center bg-white rounded-lg border border-lightGray">
              <div className="text-center text-zinc-500 text-xs font-medium leading-none">12h</div>
            </button>
            <button className="flex-grow flex items-center justify-center bg-neutral-900 rounded-lg border border-lightGray">
              <div className="text-center text-white text-xs font-medium leading-none">1D</div>
            </button>
            <button className="flex-grow flex items-center justify-center bg-white rounded-lg border border-lightGray">
              <div className="text-center text-zinc-500 text-xs font-medium leading-none">more</div>
            </button>
            <button className="flex-grow flex items-center justify-center bg-white rounded-lg border border-lightGray">
              <div className="text-center text-zinc-500 text-xs font-medium leading-none">more</div>
            </button>
          </div>
        </div>

        <LineChartComponent />
      </div>

      <span
        className='flex items-center overflow-hidden transition-all text-neutral-900 text-lg font-semibold leading-relaxed'
      >
        Top Cryptocurency
      </span>
      <div className="flex-col w-full mt-6 justify-center items-center p-3 border border-lightGray bg-white rounded-lg">
        {cryptoData.map((item, index) => (
          <div className='flex flex-row w-full justify-around mb-2' key={index}>
            <div className="w-10 h-10 relative flex-grow">
              <img className="w-6 h-6 absolute top-2 left-2" src={item.image} alt="img" />
            </div>
            <div className='flex flex-col flex-grow'>
              <div className="text-neutral-900 text-sm font-semibold">{item.name}</div>
              <div className="text-zinc-500 text-xs font-medium">{item.code}</div>
            </div>
            <div className="w-20 h-10 relative flex-grow">
              <img className="w-16 h-6 absolute top-2 left-2" src={item.graph} alt="img" />
            </div>
            <div className='flex flex-col justify-end items-end flex-grow'>
              <div className="text-neutral-900 text-sm font-semibold">{item.price}</div>
              <div className="text-zinc-500 text-xs font-medium">{item.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LineChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          datasets: [{
            label: 'Dataset Name',
            data: [16350, 16870, 17320, 18855, 18250, 18710, 17180, 18600, 18070, 18540,
              17050, 17580, 19030, 18500, 19920, 19390, 18860, 18330, 18800, 19270,
              18400, 19930, 18380, 18850, 19270, 18740, 19210, 20680, 20150, 21620,
              19750, 19280, 20730, 19200, 19620, 21090, 20560, 21030, 20500, 21970]
            ,
            borderColor: 'rgb(0,0,0)',
            borderWidth: 2,
            fill: false,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              position: 'right',
              max: 22487,
              min: 16300,
              grid: {
                display: false
              },
              ticks: {
                callback: function (value, index, values) {
                  return value.toLocaleString();
                }
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          legend: {
            display: false
          }
        }
      });
      chartInstanceRef.current = chartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-60">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
}

export default SnapshotComponent;
