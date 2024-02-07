import { icons, images } from "../../../assets"

export const BettingAppCards = () => {

  return (
    <div className="BettingSites w-full space-y-4 lg:w-1/4">
      <div className="flex justify-start items-center gap-2.5">
        <div className=" text-indigo-950 text-3xl font-semibold">Best Sports Betting Sites</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col h-44 bg-neutral-900 rounded-lg">
          <div className="h-1/5 flex items-center">
            <span className="ml-5 text-white text-base font-semibold font-['Noto Sans'] -skew-x-12">Our Pick</span>
          </div>
          <div className="h-2/5 flex flex-row justify-around gap-3 mx-4">
            <img src={images.wiliamHill} alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">5.0</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">BET NOW</span>
            </div>
          </div>
          <div className="h-2/5 flex flex-col justify-center items-center">
            <span className="flex text-right text-white text-base -skew-x-12 font-semibold font-['Noto Sans'] flex justify-center items-center gap-1">
              100% up to $1000
              <img src={icons.info} className="w-4 h-4" alt="info" />
            </span>
            <span className="text-right text-gray-700 text-xs font-normal font-['Noto Sans']">T&Cs Apply</span>
          </div>
        </div>

        <div className="flex flex-col h-44 bg-white rounded-lg border-gray-200 border-2 justify-around">
          <div className="h-2/5 flex flex-row justify-around gap-3 mx-4">
            <img src={images.DraftKings} alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">4.7</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">BET NOW</span>
            </div>
          </div>
          <div className="h-2/5 flex flex-col justify-center items-center">
            <span className="text-right text-violet-900 text-base font-semibold font-['Noto Sans']">$30 of Free Bets</span>
            <span className="text-right text-gray-700 text-xs font-normal font-['Noto Sans']">T&Cs Apply</span>
          </div>
        </div>

        <div className="flex flex-col h-44 bg-white rounded-lg border-gray-200 border-2 justify-around">
          <div className="h-2/5 flex flex-row justify-around gap-3 mx-4">
            <img src={images.fanduel} alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">4.7</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">BET NOW</span>
            </div>
          </div>
          <div className="h-2/5 flex flex-col justify-center items-center">
            <span className="text-right text-violet-900 text-base font-semibold font-['Noto Sans']">$30 of Free Bets</span>
            <span className="text-right text-gray-700 text-xs font-normal font-['Noto Sans']">T&Cs Apply</span>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2.5">
        <div className=" text-indigo-950 text-3xl font-semibold">Best Crypto Apps</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col h-28 bg-neutral-900 rounded-lg">
          <div className="h-1/5 flex items-center mt-2">
            <span className="ml-5 text-white text-base font-semibold font-['Noto Sans'] -skew-x-12">Our Pick</span>
          </div>
          <div className="h-14 flex flex-row justify-around gap-3 mx-4">
            <img src={images.Coinbase} alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">5.0</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">SIGN UP</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-24 bg-white rounded-lg border-gray-200 border-2 justify-around">
          <div className="h-14 flex flex-row justify-around gap-3 mx-4">
            <img src={images.Kraken} alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">4.7</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">SIGN UP</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-24 bg-white rounded-lg border-gray-200 border-2 justify-around">
          <div className="h-14 flex flex-row justify-around gap-3 mx-4">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Crypto.com_logo.svg/2560px-Crypto.com_logo.svg.png' alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">4.7</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">SIGN UP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-center gap-2.5">
        <div className=" text-indigo-950 text-3xl font-semibold">Best Stock Apps</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col h-28 bg-neutral-900 rounded-lg">
          <div className="h-1/5 flex items-center mt-2">
            <span className="ml-5 text-white text-base font-semibold font-['Noto Sans'] -skew-x-12">Our Pick</span>
          </div>
          <div className="h-14 flex flex-row justify-around gap-3 mx-4">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Robinhood_%28company%29_logo.svg/2560px-Robinhood_%28company%29_logo.svg.png' alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">5.0</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">SIGN UP</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-24 bg-white rounded-lg border-gray-200 border-2 justify-around">
          <div className="h-14 flex flex-row justify-around gap-3 mx-4">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TD_Ameritrade.svg/2560px-TD_Ameritrade.svg.png' alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">4.7</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">SIGN UP</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-24 bg-white rounded-lg border-gray-200 border-2 justify-around">
          <div className="h-14 flex flex-row justify-around gap-3 mx-4">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/ETrade.svg/2560px-ETrade.svg.png' alt="wiliamHill" className="w-2/5 h-full object-contain" />
            <div className="bg-gray-300 flex w-1/5 justify-center items-center transform -skew-x-12 rounded-lg my-2">
              <span className="text-gray-700 text-base font-bold font-['Noto Sans'] ml-1">4.7</span>
              <img src={icons.yellowStar} alt="star" />
            </div>
            <div className="bg-primary flex w-2/5 justify-center items-center -skew-x-12 rounded-lg my-2">
              <span className="text-neutral-900 text-lg font-black font-['Noto Sans']">SIGN UP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}