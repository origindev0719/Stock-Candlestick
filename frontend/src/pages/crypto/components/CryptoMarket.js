import { icons } from "../../../assets";

export const CryptoMarket = () => {
  const BuyPercentage = 70;
  const HoldPercentage = 25;
  const SellPercentage = 5;

  let recommendation = '';
  let color = '';

  if (BuyPercentage > HoldPercentage && BuyPercentage > SellPercentage) {
    recommendation = 'BUY';
    color = 'bg-green';
  } else if (HoldPercentage > BuyPercentage && HoldPercentage > SellPercentage) {
    recommendation = 'HOLD';
    color = 'bg-yellow-400';
  } else {
    recommendation = 'SELL';
    color = 'bg-rose-500';
  }

  const data = [
    {
      title: "Period Length",
      values: [
        "12 Months",
        "52 Weeks",
        "52 Weeks"
      ]
    },
    {
      title: "Total Revenue",
      values: [
        "274,515.00",
        "260,174.00",
        "260,174.00"
      ]
    },
    {
      title: "Cost of Revenue",
      values: [
        "169,559.00",
        "161,782.00",
        "161,782.00"
      ]
    },
    {
      title: "Gross Profit",
      values: [
        "104,956.00",
        "98,392.00",
        "98,392.00"
      ]
    },
    {
      title: "Selling, General and Administrative",
      values: [
        "19,916.00",
        "18,245.00",
        "18,245.00"
      ]
    },
    {
      title: "Research and Development",
      values: [
        "18,752.00",
        "16,217.00",
        "16,217.00"
      ]
    },
    {
      title: "Unusual Expense/Income",
      values: [
        "-",
        "-",
        "-"
      ]
    },
    {
      title: "Total Operating Expense",
      values: [
        "208,227.00",
        "196,244.00",
        "196,244.00"
      ]
    },
    {
      title: "Operating Income",
      values: [
        "66,288.00",
        "63,930.00",
        "63,930.00"
      ]
    },
    {
      title: "Interest Income Net",
      values: [
        "890.00",
        "1,385.00",
        "1,385.00"
      ]
    },
    {
      title: "Net Income Before Taxes",
      values: [
        "67,091.00",
        "65,737.00",
        "65,737.00"
      ]
    },
    {
      title: "Provision for Income Taxes",
      values: [
        "9,680.00",
        "10,481.00",
        "10,481.00"
      ]
    },
    {
      title: "Net Income",
      values: [
        "57,411.00",
        "55,256.00",
        "55,256.00"
      ]
    },
    {
      title: "Income Avail. to Common Excl. Extraord.",
      values: [
        "57,411.00",
        "55,256.00",
        "55,256.00"
      ]
    },
    {
      title: "Diluted Average Shares",
      values: [
        "17,528.21",
        "18,595.65",
        "18,595.65"
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full mt-10">
      <section className="w-full h-auto">
        <h1 className="text-stone-900 text-sm font-semibold tracking-tight">Crypto Research</h1>

        <p className="mt-3 text-stone-900 text-xs font-normal leading-tight">
          BUY-rated Bitcoin (BTC) slid by 1.3% in a down market on 06/30/23 after ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        <footer className="mt-auto text-slate-700 text-xs font-medium tracking-tight">
          <a href="/stocks/individualStocks/1">Learn more</a>
        </footer>
      </section>

      <section className="w-full h-16 mt-7">
        <h1 className="text-stone-900 text-sm font-semibold tracking-tight">Supply/demand</h1>

        <div className="w-96 h-0.5 mt-2 bg-green rounded-sm">
          <div className="w-52 h-0.5 bg-red rounded-sm"></div>
        </div>

        <div className="flex flex-row justify-between">
          <p className="mt-2 text-stone-900 text-xs font-normal">
            48.50% decrease
          </p>
          <p className="mt-2 text-stone-900 text-xs font-normal">
            51.50% growth
          </p>
        </div>

        <footer className="mt-2 text-slate-700 text-xs font-medium tracking-tight">
          Request queue
        </footer>
      </section>

      <div className="w-full flex-col justify-center items-start gap-5 inline-flex mt-10">
        <div className="self-stretch h-12 flex-col justify-start items-start gap-2 flex">
          <h1 className="self-stretch text-neutral-800 text-base font-medium leading-snug tracking-tight">What the Experts Say</h1>
          <h2 className="self-stretch text-neutral-500 text-base font-medium leading-snug tracking-tight">15 Crypto Analyst Ratings</h2>
        </div>
        <div className="justify-between items-center inline-flex">
          <div className={`w-20 h-20 p-5 rounded-full ${color} justify-center items-center gap-3 flex`}>
            <div className="text-center text-white text-base font-medium leading-snug tracking-tight">{recommendation}</div>
          </div>
          <div className="flex flex-col justify-start items-start ml-4">
            <div className="flex justify-start items-center gap-3">
              <div className="w-44 h-2 relative">
                <div className="w-44 h-2 absolute bg-zinc-100 rounded-full"></div>
                <div className="w-36 h-2 absolute bg-green rounded-full"></div>
              </div>
              <span className="w-10 text-green text-base font-medium leading-snug tracking-tight">{BuyPercentage}%</span>
              <span className="text-center text-green text-base font-medium leading-snug tracking-tight">Buy</span>
            </div>
            <div className="flex justify-start items-center gap-3">
              <div className="w-44 h-2 relative">
                <div className="w-44 h-2 absolute bg-zinc-100 rounded-full"></div>
                <div className="w-12 h-2 absolute bg-yellow-400 rounded-full"></div>
              </div>
              <span className="w-10 text-yellow-400 text-base font-medium leading-snug tracking-tight">{HoldPercentage}%</span>
              <span className="text-center text-yellow-400 text-base font-medium leading-snug tracking-tight">Hold</span>
            </div>
            <div className="flex justify-start items-center gap-3">
              <div className="w-44 h-2 relative">
                <div className="w-44 h-2 absolute bg-zinc-100 rounded-full"></div>
                <div className="w-2.5 h-2 absolute bg-rose-500 rounded-full"></div>
              </div>
              <span className="w-10 text-rose-500 text-base font-medium leading-snug tracking-tight">{SellPercentage}%</span>
              <span className="text-center text-rose-500 text-base font-medium leading-snug tracking-tight">Sell</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start gap-3 mt-7">
          <div className="flex-grow flex-shrink-0 h-14 flex justify-start items-center gap-4">
            <div className="flex flex-col justify-start items-center gap-3">
              <div className="p-4 bg-blue-600 bg-opacity-10 rounded-full flex justify-center items-center gap-2.5">
                <div className="w-7 h-7 p-0.5 flex justify-center items-center">
                  <img className="w-6 h-6" src={icons.tickBlue} alt="Icon" />
                </div>
              </div>
            </div>
            <div className="flex-grow flex-shrink-0 flex flex-col justify-center items-start gap-1">
              <span className="text-neutral-500 text-base font-medium leading-snug tracking-tight">Target Price</span>
              <span className="text-neutral-800 text-base font-medium leading-snug tracking-tight">$177.25</span>
            </div>
          </div>
          <div className="flex-grow flex-shrink-0 h-14 flex justify-start items-center gap-4">
            <div className="flex flex-col justify-start items-center gap-3">
              <div className="p-4 bg-green-600 bg-opacity-10 rounded-full flex justify-center items-center gap-2.5">
                <div className="w-7 h-7 p-0.5 flex justify-center items-center">
                  <img className="w-6 h-6" src={icons.stocksGreen} alt="Icon" />
                </div>
              </div>
            </div>
            <div className="flex-grow flex-shrink-0 flex flex-col justify-center items-start gap-1">
              <span className="text-neutral-500 text-base font-medium leading-snug tracking-tight">Est Return</span>
              <span className="text-green text-base font-medium leading-snug tracking-tight">+ 65.20%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-20 flex flex-col justify-start items-center mt-10">
        <div className="w-full flex flex-col">
          <div className="flex justify-start items-start gap-5 w-full mb-4">
            <div className="text-slate-700 text-sm font-semibold underline">Income statement</div>
            <div className="text-black text-sm font-normal">Balance sheet</div>
            <div className="text-black text-sm font-normal">Cash flow</div>
          </div>
          <div className="flex flex-col">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-row w-full justify-between py-3">
                <div className="text-neutral-500 text-xs w-2/5 font-normal leading-3">{row.title}</div>
                <div className="flex flex-row w-3/5 justify-around">
                  {row.values.map((value, valueIndex) => (
                    <div key={valueIndex} className="text-neutral-500 text-xs font-normal leading-3">{value}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}