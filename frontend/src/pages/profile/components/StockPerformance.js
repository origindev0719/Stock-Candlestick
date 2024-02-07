import { useEffect, useRef } from "react";
import { Chart, registerables } from 'chart.js';
import { icons } from "../../../assets";

export const StockPerformance = () => {

  const stockData = [
    {
      name: 'Amazon',
      code: 'AMZN',
      price: '$90.96',
      change: '+ 1.89%',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg'
    },
    {
      name: 'Apple',
      code: 'AAPL',
      price: '$150.50',
      change: '- 0.50%',
      image: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png'
    },
    {
      name: 'Microsoft',
      code: 'MSFT',
      price: '$210.20',
      change: '+ 2.10%',
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKYT-TGEQcsppAq_N2uWJBQ_wYVPy49zuRJhucrhNg=s900-c-k-c0x00ffffff-no-rj'
    },
    {
      name: 'Tesla',
      code: 'TESLA',
      price: '$700.00',
      change: '- 1.00%',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png'
    },
    {
      name: 'Amazon',
      code: 'AMZN',
      price: '$90.96',
      change: '+ 1.89%',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg'
    },
    {
      name: 'Apple',
      code: 'AAPL',
      price: '$150.50',
      change: '- 0.50%',
      image: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png'
    },
    {
      name: 'Microsoft',
      code: 'MSFT',
      price: '$210.20',
      change: '+ 2.10%',
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKYT-TGEQcsppAq_N2uWJBQ_wYVPy49zuRJhucrhNg=s900-c-k-c0x00ffffff-no-rj'
    },
    {
      name: 'Tesla',
      code: 'TESLA',
      price: '$700.00',
      change: '- 1.00%',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png'
    }
  ];

  return (
    <div className="w-full flex flex-col mb-52">
      {/* Portfolio Analytics */}
      <div className="flex flex-col w-full bg-white rounded-lg p-5">
        <div className="flex flex-row w-full justify-between h-10">
          <p className="text-center text-zinc-800 text-sm font-medium">Portfolio Analytics</p>
          <div className="h-5 flex justify-center items-center gap-5 p-3">
            <button className="w-7 text-center text-neutral-900 text-sm font-medium">1D</button>
            <div className="w-px h-3 bg-zinc-500 opacity-50"></div>
            <button className="w-7 text-center text-zinc-500 text-xs font-normal">5D</button>
            <div className="w-px h-3 bg-zinc-500 opacity-50"></div>
            <button className="w-7 text-center text-zinc-500 text-xs font-normal">1M</button>
            <div className="w-px h-3 bg-zinc-500 opacity-50"></div>
            <button className="w-7 text-center text-zinc-500 text-xs font-normal">6M</button>
            <div className="w-px h-3 bg-zinc-500 opacity-50"></div>
            <button className="w-7 text-center text-zinc-500 text-xs font-normal">1Y</button>
          </div>
        </div>

        <LineChartComponent />
      </div>
      {/* Balance and watchlist */}
      <div className="w-full flex flex-row gap-3 mt-5">
        <div className="w-1/2 flex flex-col items-start bg-white rounded-lg p-5">
          <div className="w-full flex flex-col items-start">
            <p className="text-center text-zinc-800 text-sm font-medium mb-2">Balance</p>
            <div className="flex flex-row w-full">
              <div className="w-4/5 h-14 pl-5 pr-38 py-4 mr-2 bg-white rounded-lg border border-black justify-start items-center gap-2.5 inline-flex">
                <h3 className="text-neutral-900 text-xl font-medium">$110,032.56</h3>
              </div>
              <div className="h-14 p-2.5 bg-green rounded-lg justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-white text-sm font-normal font-['Readex Pro'] uppercase">+6.2%</div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start mt-3">
            <p className="text-center text-zinc-800 text-sm font-medium mb-2">Invested</p>
            <div className="pl-4 pr-2.5 h-14 py-4 w-full bg-zinc-800 rounded-lg justify-between items-center inline-flex">
              <div className="text-white text-xl font-medium">$70,532.21</div>
              <div className="w-10 h-10 p-2.5 bg-lightGray rounded-lg justify-center items-center">
                <img className="w-6 h-6" src={icons.arrowRight} alt="img" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col bg-white rounded-lg">
          <div className="flex flex-row w-full justify-between mb-4">
            <p className="text-center text-zinc-800 text-sm font-medium">Watchlist</p>
            <button className="w-6 h-6 p-1.5 bg-primary rounded justify-center items-center">
              <img className="w-3.5 h-3.5" src={icons.plus} alt="img" />
            </button>
          </div>
          {stockData.map((item, index) => (
            <div className="flex flex-row w-full justify-between p-2 border-b border-violet-100" key={index}>
              <div className="flex flex-row justify-start items-center">
                <img className="w-7 h-7 object-cover" src={item.image} alt="img" />
                <div className="flex flex-col ml-2">
                  <span className="text-zinc-800 text-xs font-normal">{item.name}</span>
                  <span className="text-zinc-500 text-xs font-normal">{item.code}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right text-zinc-800 text-xs font-normal uppercase">{item.price}</div>
                <div className="text-right text-green text-xs font-normal uppercase">{item.change}</div>
              </div>
            </div>
          ))}
        </div>
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

      // Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(38, 166, 154, 1)');
      gradient.addColorStop(0.5, 'rgba(38, 166, 154, 0.1)');

      // Generate random data points
      const randomData = Array.from({ length: 60 }, () => Math.floor(Math.random() * 150001));

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['10am', '', '', '', '', '', '', '', '', '', '', '11am', '', '', '', '', '', '', '', '', '', '', '12pm', '', '', '', '', '', '', '', '', '', '', '1pm', '', '', '', '', '', '', '', '', '', '', '2pm', '', '', '', '', '', '', '', '', '', '', '3pm'],
          datasets: [{
            label: 'Dataset Name',
            data: randomData,
            borderColor: 'rgba(26, 188, 123, 0.5)',
            borderWidth: 3,
            fill: 'origin',
            backgroundColor: gradient,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              position: 'right',
              min: 0,
              max: 150000,
              ticks: {
                stepSize: 30000,
                callback: function (value, index, values) {
                  return `$${value.toLocaleString()}`;
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
    <div className="w-full">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
}