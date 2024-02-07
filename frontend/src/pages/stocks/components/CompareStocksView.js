import React, { useState, useRef, useEffect } from 'react';
import { icons } from '../../../assets';
import { Chart, registerables } from 'chart.js';
//import moment from 'moment';
import { Navbar } from "../../../components/Navbar"
import { Sidebar } from "../../../components/Sidebar"
import { StocksAndCryptoTicker } from "../../../components/StocksAndCryptoTicker";
import { Link, Navigate } from 'react-router-dom';

export const CompareStocksView = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isIndicatorDropdownVisible, setIndicatorDropdownVisible] = useState(false);
  const [isCompareDropdownVisible, setCompareDropdownVisible] = useState(false);
  const [isChartVisible, setChartVisible] = useState(false);

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

  const buttons = [
    '1 min', '5 min', '10 min', '30 min', '1 hour', '1 day', '1 week', '1 month', '3 month', '1 year', 'Custom Range'
  ];

  const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Stocks'  />
        </div>
        <div className="sticky top-24 z-10 bg-white">
          <StocksAndCryptoTicker selectedCategory={'stocks'} />
        </div>
        <div className="m-24 flex flex-col p-10 w-11/12 bg-white rounded-xl">
          <div className="flex flex-row justify-between items-center">
            <div className='flex flex-col w-7 mt-16 justify-around items-center'>
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
            <div className="w-1/2 flex flex-col mr-5">
              <div className="flex justify-start items-start h-16">
                <div className="flex items-center gap-4 w-2/5 ml-2" >
                  <div className="w-full">
                    <img className="Ellipse w-16 h-16 rounded-full" src='https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png' alt="img" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="Company text-stone-900 text-lg font-bold tracking-tight">Apple Inc</div>
                    <div className="w-20 h-4 relative">
                      <img src={icons.starDark} className="w-4 h-4 left-0 top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starDark} className="w-4 h-4 left-[18px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starDark} className="w-4 h-4 left-[36px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starDark} className="w-4 h-4 left-[54px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starHalf} className="w-4 h-4 left-[72px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="text-zinc-400 text-base font-semibold tracking-tight">AAPL</div>
                    <div className="flex items-center gap-2">
                      <div className="text-zinc-400 text-xs font-normal tracking-tight">4.4</div>
                    </div>
                  </div>
                </div>
              </div>
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
                <ComboChartComponent />
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
            </div>
            <div className="w-1/2 flex flex-col ml-5">
              <div className="flex justify-start items-start w-2/5 h-16">
                <div className="flex items-center gap-4 ml-2" >
                  <div className="w-full">
                    <img className="Ellipse w-16 h-16 rounded-full" src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' alt="img" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="Company text-stone-900 text-lg font-bold tracking-tight">Amazon</div>
                    <div className="w-20 h-4 relative">
                      <img src={icons.starDark} className="w-4 h-4 left-0 top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starDark} className="w-4 h-4 left-[18px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starDark} className="w-4 h-4 left-[36px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starDark} className="w-4 h-4 left-[54px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                      <img src={icons.starHalf} className="w-4 h-4 left-[72px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <div className="text-zinc-400 text-base font-semibold tracking-tight">AMZN</div>
                    <div className="flex items-center gap-2">
                      <div className="text-zinc-400 text-xs font-normal tracking-tight">4.4</div>
                    </div>
                  </div>
                </div>
              </div>
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

                  <ComboChartComponent />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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

  //const maxVolume = Math.max(...mockData.klines.map(kline => kline.quote_asset_volume));

  useEffect(() => {
    Chart.register(...registerables);
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'bar', // Default type
        data: {
          labels: ['2022-01-01', '2022-01-02', '2022-01-03'],
          datasets: [{
            label: 'Candlestick Dataset',
            data: [
              { t: '2021-01-01', o: 100, h: 105, l: 95, c: 104 },
              { t: '2021-01-02', o: 104, h: 108, l: 100, c: 107 },
              // ... add more data points
            ],
            type: 'bar',
            borderColor: 'black',
            backgroundColor: function (context) {
              var value = context.dataset.data[context.dataIndex].c - context.dataset.data[context.dataIndex].o;
              return value < 0 ? 'red' : 'green';
            }
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              position: 'right'
            }
          },
          elements: {
            bar: {
              borderWidth: 2,
              borderSkipped: false
            }
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
    <div className="canvas-container w-11/12 h-full">
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