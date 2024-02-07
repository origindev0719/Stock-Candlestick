import React, { useState, useRef, useEffect } from 'react';
import { icons } from '../../../assets';
import { Chart, registerables } from 'chart.js';
//import { CandlestickController, CandlestickElement, OhlcController, OhlcElement } from 'chartjs-chart-financial';
import moment from 'moment';
import { Link } from 'react-router-dom';
//import 'chartjs-adapter-date-fns';
//import 'chartjs-adapter-moment';

export const IndividualCryptoInfo = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isIndicatorDropdownVisible, setIndicatorDropdownVisible] = useState(false);
  const [isCompareDropdownVisible, setCompareDropdownVisible] = useState(false);
  const [isChartVisible, setChartVisible] = useState(false);

  const buttons = [
    '1 min', '5 min', '10 min', '30 min', '1 hour', '1 day', '1 week', '1 month', '3 month', '1 year', 'Custom Range'
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIndicatorDropdownVisible(false);
        setCompareDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col mt-10">
      <div className="w-full h-5 ml-7 justify-around items-center inline-flex whitespace-nowrap">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => setSelectedButton(index)}
            className={`flex-grow text-stone-900 text-sm font-normal ${selectedButton === index ? 'underline' : ''}`}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col w-7 justify-around items-center'>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.bxCross} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.unit} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.polyline} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.text} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.mesh} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.climateChange} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.shockerEmoji} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.ruler} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.zoom} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.hideIcon} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.padlock} alt='img' />
          </button>
          <button className="w-4 h-4 m-2">
            <img className="w-4 h-4" src={icons.trashCan} alt='img' />
          </button>
        </div>

        {/* <ComboChartComponent /> */}
      </div>
      {isChartVisible ? (
        <LineChartComponent />
      ) : null}
      <div className='flex flex-row w-full mt-5 justify-around'>
        <div className="relative">
          <button
            className="h-9 p-2 flex items-center gap-4"
            onClick={() => setIndicatorDropdownVisible(!isIndicatorDropdownVisible)}
          >
            <img className="w-5 h-5" src={icons.formula} alt="Indicator Icon" />
            <div className="flex-grow flex-shrink-0 text-black text-sm font-semibold">Indicators</div>
            <img className="w-2.5 h-2.5" src={icons.chevronDown} alt="Dropdown Icon" />
          </button>
          {isIndicatorDropdownVisible && (
            <div className="absolute top-full left-0 flex flex-col justify-start items-start gap-2.5 overflow-y-auto" ref={dropdownRef}>
              <div className="w-80 h-72 flex flex-col items-start">
                <div className="w-80 h-8 flex items-center bg-white rounded-xl border border-lightGray">
                  <img className="w-3.5 h-3.5 ml-2 mr-4" src={icons.search} alt="Search Icon" />
                  <input
                    type="text"
                    placeholder="Search for Indicators"
                    className="flex-grow text-zinc-400 text-xs font-semibold leading-none bg-transparent outline-none border-none"
                  />
                </div>
                <div className="w-80 h-64 bg-white rounded-xl border border-lightGray flex flex-col justify-start items-start p-4 gap-2.5 overflow-y-auto">
                  {["24-Hour Volume", "Accumulation/Distribution", "Advanced Decline Line", "Advanced Decline Ratio", "Advanced/Decline Ratio (Bars)", "Aroon", "Auto Fib Extension", "Auto Fib Retracement", "Auto Pitchfork", "Average Day Range", "Average Directional Index", "Average True Range"].map((label) => (
                    <button
                      key={label}
                      onClick={() => {
                        setChartVisible(true);
                        setIndicatorDropdownVisible(false);
                      }}
                      className="text-zinc-400 text-xs font-semibold leading-none px-2 py-1 hover:bg-lightGray transition duration-150 ease-in-out rounded-md w-full text-left">
                      {label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        <button className="h-9 p-2 flex items-center gap-4">
          <img className="w-5 h-5" src={icons.alarmClock} alt="Alert Icon" />
          <div className="text-black text-sm font-semibold">Alerts</div>
        </button>

        <div className="relative">
          <button 
            onClick={() => setCompareDropdownVisible(!isCompareDropdownVisible)}
            className="h-9 p-2 flex items-center gap-4"
          >
            <img className="w-5 h-5" src={icons.add} alt="Compare Icon" />
            <div className="text-black text-sm font-semibold">Compare</div>
          </button>
          {isCompareDropdownVisible && (
            <div className="absolute top-full left-0 flex flex-col justify-start items-start gap-2.5 overflow-y-auto" ref={dropdownRef}>
              <div className="w-80 h-72 flex flex-col items-start">
                <div className="w-80 h-8 flex items-center bg-white rounded-xl border border-lightGray">
                  <img className="w-3.5 h-3.5 ml-2 mr-4" src={icons.search} alt="Search Icon" />
                  <input
                    type="text"
                    placeholder="Search for Stocks to Compare"
                    className="flex-grow text-zinc-400 text-xs font-semibold leading-none bg-transparent outline-none border-none"
                  />
                </div>
                <div className="w-80 h-auto bg-white rounded-xl border border-lightGray flex flex-col justify-start items-start p-4 gap-2.5 overflow-y-auto">
                  {["S&P 500", "DOW", "NSADAQ"].map((label) => (
                    <Link 
                      to={`/stocks/individualStocks/1/compareStocks`}
                      key={label}
                      onClick={() => {
                        setIndicatorDropdownVisible(false);
                      }}
                      className="text-zinc-400 text-xs font-semibold leading-none px-2 py-1 hover:bg-lightGray transition duration-150 ease-in-out rounded-md w-full text-left">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        <div className="p-2 flex items-center gap-9">
          <button>
            <img className="w-5 h-5" src={icons.replyLeft} alt="Icon 1" />
          </button>
          <button>
            <img className="w-5 h-5" src={icons.replyRight} alt="Icon 2" />
          </button>
        </div>
        <button className="p-2 flex items-center gap-3">
          <img className="w-5 h-5" src={icons.camera} alt="Snapshot Icon" />
          <div className="text-black text-sm font-semibold">Snapshot</div>
        </button>
      </div>
      <div className="flex flex-row h-full justify-center mt-5">
        <div className="w-2/3">
          <div className="w-60 h-5 flex space-x-4 mb-4">
            <button className="text-slate-700 text-sm font-semibold">All</button>
            <button className="text-black text-sm font-normal">News</button>
            <button className="text-black text-sm font-normal">Press Releases</button>
          </div>

          <div className="flex mb-4">
            <img className="w-36 h-28 rounded-lg" src="https://via.placeholder.com/146x109" alt="News Thumbnail" />
            <div className="flex flex-col justify-between ml-4 space-y-2">
              <div className="flex justify-between">
                <div className="text-black text-xs font-normal">Coin Desk</div>
                <div className="text-black text-xs font-normal">20 hours ago</div>
              </div>
              <div className="text-black text-sm font-semibold w-80">Better than Bitcoin? Steve Wozniak's crypto token takes off—but you can't buy it in the US</div>
              <div className="text-black text-xs font-normal leading-3 w-80">On Friday, Wozniak launched his new company Efforce, a blockchain-based “energy efficiency market” for crowdfunding eco-friendly business projects.</div>
            </div>
          </div>

          <div className="flex mb-4">
            <img className="w-36 h-28 rounded-lg" src="https://via.placeholder.com/146x109" alt="News Thumbnail" />
            <div className="flex flex-col justify-between ml-4 space-y-2">
              <div className="flex justify-between">
                <div className="text-black text-xs font-normal">Business Wire</div>
                <div className="text-black text-xs font-normal">Yesterday</div>
              </div>
              <div className="text-black text-sm font-semibold w-80">Is Apple Stock A Buy Right Now? Here's What Its Stock Chart Shows</div>
              <div className="text-black text-xs font-normal leading-3 w-80">Apple has been an American success story several times over with the Mac, iPod, iPhone and other inventions. But is Apple stock a buy now? Here's what its stock chart and earnings show.</div>
            </div>
          </div>

          <div className="flex">
            <img className="w-36 h-28 rounded-lg" src="https://via.placeholder.com/146x109" alt="News Thumbnail" />
            <div className="flex flex-col justify-between ml-4 space-y-2">
              <div className="flex justify-between">
                <div className="text-black text-xs font-normal">Forbes</div>
                <div className="text-black text-xs font-normal">06/15/23</div>
              </div>
              <div className="text-black text-sm font-semibold w-80">Is Apple Stock A Buy Right Now? Here's What Its Stock Chart Shows</div>
              <div className="text-black text-xs font-normal leading-3 w-80">Apple has been an American success story several times over with the Mac, iPod, iPhone and other inventions. But is Apple stock a buy now? Here's what its stock chart and earnings show.</div>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-wrap h-60">
          <div className="w-full text-stone-900 text-sm font-semibold tracking-tight mb-4">Quote Overview</div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">Open</div>
            <div className="text-black text-base font-normal leading-snug">124.37</div>
          </div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">Day Low</div>
            <div className="text-black text-base font-normal leading-snug">123.09</div>
          </div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">Day High</div>
            <div className="text-black text-base font-normal leading-snug">124.98</div>
          </div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">52 Wk Low</div>
            <div className="text-black text-base font-normal leading-snug">53.15</div>
          </div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">52 Wk High</div>
            <div className="text-black text-base font-normal leading-snug">137.98</div>
          </div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">Avg. Volume</div>
            <div className="text-black text-base font-normal leading-snug">91,010,576</div>
          </div>

          <div className="w-1/2 mb-4">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">Market Cap</div>
            <div className="text-black text-base font-normal leading-snug">2,103.97 B</div>
          </div>

          <div className="w-1/2">
            <div className="text-black text-opacity-80 text-xs font-normal uppercase leading-3">Dividend</div>
            <div className="text-black text-base font-normal leading-snug">0.82 ( 0.66%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ComboChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const mockData = {
    klines: [
      {
        from: '2022-01-01',
        open_price: 100,
        close_price: 104,
        high_price: 105,
        low_price: 95,
        quote_asset_volume: 50
      },
      {
        from: '2022-01-02',
        open_price: 104,
        close_price: 107,
        high_price: 108,
        low_price: 100,
        quote_asset_volume: 60
      },
      {
        from: '2022-01-03',
        open_price: 107,
        close_price: 109,
        high_price: 110,
        low_price: 105,
        quote_asset_volume: 70
      }
    ]
  };

  const maxVolume = Math.max(...mockData.klines.map(kline => kline.quote_asset_volume));

  useEffect(() => {
    Chart.register(...registerables);
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'candlestick', // Default type
        data: {
          labels: ['2022-01-01', '2022-01-02', '2022-01-03'],
          datasets: [
            {
              type: 'candlestick', // this must stay
              label: 'Financial Graph',
              data: mockData.klines.map(function (kline) {
                return {
                  'x': moment(kline['from']),
                  'o': kline['open_price'],
                  'c': kline['close_price'],
                  'h': kline['high_price'],
                  'l': kline['low_price']
                };
              }),
              color: {
                up: 'rgb(26, 152, 129)', // those colors are better than defaults
                down: 'rgb(239, 57, 74)', // those colors are better than defaults
                unchanged: '#999', // those colors are better than defaults
              },
              borderColor: {
                up: 'rgb(26, 152, 129)',
                down: 'rgb(239, 57, 74)',
                unchanged: '#999',
              },
              order: 10,
              yAxisID: 'y', // this must stay
            },
            {
              type: 'bar',
              label: 'Volume',
              data: mockData.klines.map(function (kline) {
                return {
                  'x': moment(kline['from']), // i used moment, feel free to use your own time library
                  'y': kline.quote_asset_volume,
                }
              }),
              backgroundColor: mockData.klines.map(function (kline) {
                return kline.open_price < kline.close_price ? 'rgb(26, 152, 129)' : 'rgb(239, 57, 74)' // for better presentation
              }),
              borderColor: '#fff',
              borderWidth: 1,
              order: 12,
              yAxisID: 'volume', // this must stay
              barPercentage: 0.5, // this must stay
              barThickness: 6, // this must stay
              maxBarThickness: 8, // this must stay
            },
          ]
        },
        options: {
          parsing: false, // must be here, solves another stupid problem
          spanGaps: true, // for better performance
          animation: false, // for better performance
          pointRadius: 0, // for better performance
          plugins: {
            title: {
              display: false,
              text: 'Fiyat Grafiği'
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'timeseries',
            },
            y: {
              type: 'linear',
            },
            volume: {
              type: 'linear',
              beginAtZero: true,
              position: 'right',
              max: maxVolume * 10, // maxVolume should be the maximum number of volumes
              grid: {
                display: false, // for better presentation
              },
              ticks: {
                display: false, // for better presentation
              },
            }
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
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
    <div className="canvas-container w-full h-96">
      <canvas ref={chartRef}></canvas>
    </div>
  );
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
          labels: ['29 Sept', '', '', '', '', '', '', '', '', '', '', '13 Oct', '', '', '', '', '', '', '', '', '', '', '27 Oct', '', '', '', '', '', '', '', '', '', '', '11 Nov', '', '', '', '', '', '', '', '', '', '', '26 Nov'],
          datasets: [{
            label: 'Dataset Name',
            data: [382, -217, 309, -365, 278, 115, -78, 299, -333, -142, 173, -399, -205, 134, -58, 287, 245, -89, 320, 173, -399, 245, -89, 320, -205, 134, -58, 287, -311, 198, -172, 356, -244, 115, -78, 299, -333, 212, 150, -100, 250, -50, 180, -220],
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
              max: 400,
              ticks: {
                callback: function (value, index, values) {
                  return value.toLocaleString();
                }
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
