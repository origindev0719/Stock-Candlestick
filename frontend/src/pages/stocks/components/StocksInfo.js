import { useEffect, useRef } from "react";
import { icons, images } from "../../../assets"
import { Chart, registerables } from 'chart.js';

export const StocksInfo = () => {

  return (
    <div className="flex flex-col w-full">

      <div className="flex-row h-36 justify-start items-start gap-3 inline-flex">
        <div className="w-28 pt-4 bg-white rounded-2xl border border-neutral-100 flex-col justify-end items-center gap-0.5 inline-flex">
          <div className="self-stretch h-12 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch text-neutral-800 text-base font-bold font-['Urbanist'] leading-snug tracking-tight">DOW</div>
            <div className="self-stretch text-green text-base font-bold font-['Urbanist'] leading-snug tracking-tight">+ 3.57%</div>
            <img src={images.vector1} alt="img" />
          </div>
        </div>
        <div className="w-28 pt-4 bg-white rounded-2xl border border-neutral-100 flex-col justify-end items-center gap-1 inline-flex">
          <div className="self-stretch h-12 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch text-neutral-800 text-base font-bold font-['Urbanist'] leading-snug tracking-tight">S&P 500</div>
            <div className="self-stretch text-rose-500 text-base font-bold font-['Urbanist'] leading-snug tracking-tight">- 1.96%</div>
            <img src={images.vector2} alt="img" />
          </div>
        </div>
        <div className="w-28 h-36 relative bg-white rounded-2xl border border-neutral-100">
          <div className="h-12 left-[16px] top-[16px] absolute flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch text-neutral-800 text-base font-bold font-['Urbanist'] leading-snug tracking-tight">NASDAQ</div>
            <div className="self-stretch text-green text-base font-bold font-['Urbanist'] leading-snug tracking-tight">+ 2.85%</div>
            <img src={images.vector3} alt="img" />
          </div>
        </div>
      </div>

      <div className="flex-col w-full mt-6">
        <span
          className='flex items-center overflow-hidden transition-all text-neutral-900 text-xl font-semibold leading-relaxed'
        >
          <img src={icons.tradeColor} className='mr-2' alt='img' />
          Snapshot
        </span>
        <div className="flex-col w-full mt-6 justify-center items-center">
          <div className="w-full h-7 pr-2 bg-white rounded-lg flex items-center gap-3 p-3 mb-5">
            <button className="flex-grow p-1.5 bg-primary rounded-lg flex justify-center items-center gap-1.5">
              <div className="text-neutral-900 text-xs font-medium">NASDAQ</div>
            </button>
            <button className="flex-grow p-1.5 rounded-lg flex justify-center items-center gap-1.5">
              <div className="text-center text-zinc-500 text-xs font-medium">DOW</div>
            </button>
            <button className="flex-grow p-1.5 rounded-lg flex justify-center items-center gap-1.5">
              <div className="text-zinc-500 text-xs font-medium">S&P 500</div>
            </button>
            <button className="flex-grow p-1.5 rounded-lg flex justify-center items-center gap-1.5">
              <div className="text-zinc-500 text-xs font-medium">NYSE</div>
            </button>
            <button className="w-4 h-4 flex justify-center items-center">
              <img className="w-3.5 h-3.5" src={icons.search} alt="Placeholder" />
            </button>
          </div>

          <div className="w-full h-5 flex justify-center items-center gap-5 p-3">
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

          <LineChartComponent />

          <div className="flex flex-col h-24 justify-between mb-6">
            <div className="w-full h-10 flex justify-start items-start gap-24">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="w-16 h-4 text-zinc-500 text-xs font-normal capitalize font-manrope">High</div>
                <div className="text-zinc-800 text-sm font-medium capitalize font-manrope">11,691.89</div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="text-zinc-500 text-xs font-normal capitalize font-manrope">Prev close (Avr 28 Days)</div>
                <div className="text-zinc-800 text-sm font-medium capitalize font-manrope">11,512.41</div>
              </div>
            </div>

            <div className="w-full h-10 flex justify-start items-start gap-24">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="w-16 h-4 text-zinc-500 text-xs font-normal capitalize font-manrope">Low</div>
                <div className="text-zinc-800 text-sm font-medium capitalize font-manrope">11,470.47</div>
              </div>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="text-zinc-500 text-xs font-normal capitalize font-manrope">Open</div>
                <div className="text-zinc-800 text-sm font-medium capitalize font-manrope">11,690.11</div>
              </div>
            </div>
          </div>

          <div className="flex-col w-full">
            <span
              className='flex items-center overflow-hidden transition-all text-neutral-900 text-xl font-semibold leading-relaxed mb-3'
            >
              Indices & Futures
            </span>

            <IndicatesChartComponent />
          </div>

        </div>
      </div>
    </div>
  )
}

const LineChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const yData = ['11550', '11600', '11650', '11700'];

  useEffect(() => {
    Chart.register(...registerables);
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['10am', '', '', '', '', '', '', '', '', '', '', '11am', '', '', '', '', '', '', '', '', '', '', '12pm'],
          datasets: [{
            label: 'Dataset Name',
            data: [11583, 11642, 11592, 11678, 11611, 11689, 11653, 11667, 11572, 11648, 11604, 11635, 11626, 11688, 11613, 11598, 11691, 11629, 11677, 11602, 11650, 11615, 11700],
            borderColor: 'rgba(52, 211, 153, 1)',
            borderWidth: 3,
            fill: false,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              max: 11700,
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

const IndicatesChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const yData = ['2550', '2600', '2650', '2700'];

  useEffect(() => {
    Chart.register(...registerables);
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['10am', '', '', '', '', '', '', '', '', '', '', '11am', '', '', '', '', '', '', '', '', '', '', '12pm'],
          datasets: [{
            label: 'Dataset Name',
            data: [2583, 2642, 2592, 2678, 2611, 2689, 2653, 2667, 2572, 2648, 2604, 2635, 2626, 2688, 2613, 2598, 2691, 2629, 2677, 2602, 2650, 2615, 2700],
            borderColor: 'rgba(52, 211, 153, 1)',
            borderWidth: 3,
            fill: false,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              max: 2700,
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