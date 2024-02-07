import { Navbar } from "../../../components/Navbar"
import { Sidebar } from "../../../components/Sidebar"
import { StocksAndCryptoTicker } from "../../../components/StocksAndCryptoTicker";
import { icons } from "../../../assets";
import { IndividualCryptoInfo } from "./IndividualCryptoInfo";
import { CryptoMarket } from "./CryptoMarket";
import { Navigate } from "react-router-dom";

export const IndividualCryptoView = () => {

  const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Crypto' />
        </div>
        <div className="sticky top-24 z-10 bg-white">
          <StocksAndCryptoTicker selectedCategory={'crypto'} />
        </div>
        <div className="mt-10 ml-10 flex flex-col w-11/12">
          <div className="flex flex-row justify-between items-center">
            <div className="w-1/3 h-16">
              <div className="flex items-center gap-4 ml-2" >
                <div className="image-container">
                  <img className="Ellipse w-16 h-16 rounded-full" src='https://cryptologos.cc/logos/bitcoin-btc-logo.png' alt="img" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="Company text-stone-900 text-lg font-bold tracking-tight">Bitcoin</div>
                  <div className="w-20 h-4 relative">
                    <img src={icons.starDark} className="w-4 h-4 left-0 top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starDark} className="w-4 h-4 left-[18px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starDark} className="w-4 h-4 left-[36px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starDark} className="w-4 h-4 left-[54px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starHalf} className="w-4 h-4 left-[72px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="text-zinc-400 text-base font-semibold tracking-tight">BTC</div>
                  <div className="flex items-center gap-2">
                    <div className="text-zinc-400 text-xs font-normal tracking-tight">4.4</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/4 flex flex-row justify-around">
              <button className="h-10 w-36 flex items-center justify-center rounded-md border border-zinc-400">
                <span className="text-stone-900 text-sm font-medium font-manrope tracking-tight">Add to favorites</span>
              </button>

              <button className="h-10 w-36 flex items-center justify-around rounded-md border border-zinc-400 p-2 ml-3">
                <img className="w-3.5 h-5" src={icons.award} alt="Icon" />
                <span className="text-stone-900 text-sm font-medium font-manrope tracking-tight">Get Premium</span>
              </button>
            </div>
          </div>
          <div className="flex flex-row h-full justify-around">
            <div className="w-3/5">
              <IndividualCryptoInfo />
            </div>
            <div className="w-1/3">
              <CryptoMarket />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}