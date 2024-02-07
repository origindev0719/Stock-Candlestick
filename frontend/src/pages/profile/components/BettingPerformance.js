import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from 'chart.js';
import { icons } from "../../../assets";

export const BettingPerformance = () => {
  const [selectedTime, setSelectedTime] = useState('Month');

  return (
    <div className="w-full flex flex-col mb-60">
      {/* STATS HEADER */}
      <div className="w-full flex flex-row justify-between gap-3">
        <div className="flex-grow h-36 bg-white rounded-2xl shadow flex flex-col justify-between items-start p-6">
          <p className="text-slate-800 text-lg font-bold leading-normal">Profit</p>
          <div className="flex flex-col items-start">
            <h2 className="text-slate-800 text-4xl font-bold leading-10 mb-2">70.71u</h2>
            <span className="text-green-600 text-sm font-medium leading-none">+21.01%</span>
          </div>
        </div>

        <div className="flex-grow h-36 bg-white rounded-2xl shadow flex flex-col justify-between items-start p-6">
          <p className="text-slate-800 text-lg font-bold leading-normal">Wagers</p>
          <div className="flex flex-col items-start">
            <h2 className="text-slate-800 text-4xl font-bold leading-10 mb-2">819.0u</h2>
            <span className="text-green-600 text-sm font-medium leading-none">+19.06%</span>
          </div>
        </div>

        <div className="flex-grow h-36 bg-white rounded-2xl shadow flex flex-col justify-between items-start p-6">
          <p className="text-slate-800 text-lg font-bold leading-normal">Wins</p>
          <div className="flex flex-col items-start">
            <h2 className="text-slate-800 text-4xl font-bold leading-10 mb-2">52.8%</h2>
            <span className="text-green-600 text-sm font-medium leading-none">+2.21%</span>
          </div>
        </div>

        <div className="flex-grow h-36 bg-white rounded-2xl shadow flex flex-col justify-between items-start p-6">
          <p className="text-slate-800 text-lg font-bold leading-normal">ROI</p>
          <div className="flex flex-col items-start">
            <h2 className="text-slate-800 text-4xl font-bold leading-10 mb-2">6.2%</h2>
            <span className="text-green-600 text-sm font-medium leading-none">+1.01%</span>
          </div>
        </div>
      </div>
      {/* CHART SECTION */}
      <div className="w-full bg-white rounded-2xl shadow flex flex-col items-start p-6 mt-6">
        <div className="w-full flex flex-row justify-between mb-3">
          <div className="flex flex-col">
            <p className="text-zinc-400 text-lg font-normal leading-tight">Statistics</p>
            <h3 className="text-slate-800 text-xl font-bold leading-7">Bet Performance</h3>
          </div>
          <div className="w-72 h-12 bg-slate-50 rounded-2xl flex items-center justify-between px-4">
            <button
              className={`flex-grow text-center py-2.5 rounded-xl ${selectedTime === 'Day' ? 'bg-neutral-900 text-white' : 'text-zinc-400'}`}
              onClick={() => setSelectedTime('Day')}
            >
              Day
            </button>
            <button
              className={`flex-grow text-center py-2.5 rounded-xl ${selectedTime === 'Week' ? 'bg-neutral-900 text-white' : 'text-zinc-400'}`}
              onClick={() => setSelectedTime('Week')}
            >
              Week
            </button>
            <button
              className={`flex-grow text-center py-2.5 rounded-xl ${selectedTime === 'Month' ? 'bg-neutral-900 text-white' : 'text-zinc-400'}`}
              onClick={() => setSelectedTime('Month')}
            >
              Month
            </button>
            <button
              className={`flex-grow text-center py-2.5 rounded-xl ${selectedTime === 'Year' ? 'bg-neutral-900 text-white' : 'text-zinc-400'}`}
              onClick={() => setSelectedTime('Year')}
            >
              Year
            </button>
          </div>
        </div>
        <LineChartComponent />
      </div>

      {/* PIE CHART SECTION */}
      <div className="w-2/3 bg-white rounded-2xl shadow flex flex-col items-start p-6 mt-6">
        <div className="w-full flex flex-row justify-between mb-3">
          <div className="flex flex-col">
            <p className="text-zinc-400 text-lg font-normal leading-tight">Statistics</p>
            <h3 className="text-slate-800 text-xl font-bold leading-7">Bets by Sport</h3>
          </div>
          <button className="w-32 h-10 px-4 py-2.5 bg-lightGray rounded-2xl justify-end items-center gap-6 inline-flex">
            <p className="text-gray text-sm font-normal leading-none">By Sport</p>
            <img className="w-2.5 h-1.5" src={icons.chevronDown} alt="" />
          </button>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="w-2/5">
            <PieChartComponent />
          </div>
          <div className="w-3/5 flex flex-col gap-5 ml-3">
            <div className="flex justify-between items-center">
              <p className="text-slate-800 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-3xl mr-2"></span>
                NFL
              </p>
              <p className="text-gray text-sm font-normal">39.11%</p>
              <p className="text-green text-sm font-normal ml-2">(+2.98%)</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-800 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-3xl mr-2"></span>
                NBA
              </p>
              <p className="text-gray text-sm font-normal">28.02%</p>
              <p className="text-red text-sm font-normal ml-2">(-3.25%)</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-800 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-indigo-300 rounded-3xl mr-2"></span>
                PGA
              </p>
              <p className="text-gray text-sm font-normal">23.13%</p>
              <p className="text-green text-sm font-normal ml-2">(+0.14%)</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-800 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-indigo-200 rounded-3xl mr-2"></span>
                UFC
              </p>
              <p className="text-gray text-sm font-normal">5.03%</p>
              <p className="text-red text-sm font-normal ml-2">(-1.11%)</p>
            </div>
          </div>
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
      gradient.addColorStop(0, 'rgba(147, 170, 253, 1)');
      gradient.addColorStop(0.5, 'rgba(198, 210, 253, 1)');
      gradient.addColorStop(1, 'rgba(229, 234, 252, 0.31)');

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1 Oct', '3 Oct', '7 Oct', '10 Oct', '14 Oct', '20 Oct', '23 Oct', '27 Oct', '30 Oct'],
          datasets: [{
            label: 'Dataset Name',
            data: [50, 25, 0, 0, -25, 0, 50, 0, 25],
            borderColor: 'rgba(45, 91, 255, 1)',
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
              min: -50,
              max: 50,
              ticks: {
                stepSize: 25,
                callback: function (value, index, values) {
                  if ([50, 25, 0, -25, -50].includes(value)) {
                    return value.toLocaleString();
                  }
                  return null;
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

const PieChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['NFL', 'NBA', 'PGA', 'UFC'],
          datasets: [{
            data: [39.11, 28.02, 23.13, 5.03],
            backgroundColor: [
              'rgb(74,58,255)',
              'rgb(45,91,255)',
              'rgb(147,170,253)',
              'rgb(198,210,253)',
              'rgb(229,234,252)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true
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