import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getStocks } from '../../../redux/actions/StocksActions';
import { Navigate, useParams } from "react-router-dom";
import { stockData, stockCodes } from '../../../constant/stock';
import { Navbar } from "../../../components/Navbar"
import { Sidebar } from "../../../components/Sidebar"
import { StocksAndCryptoTicker } from "../../../components/StocksAndCryptoTicker";
import { StocksMarket } from "./StocksMarket";
import { IndividualStocksInfo } from "./IndividualStocksInfo";
import { icons } from "../../../assets";


export const IndividualView = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  const stockTickers = useSelector((state) => state.stocks.stocks);
  const dispatch = useDispatch();
  const params = useParams();

  const token = window.localStorage.getItem("userInfo");

  useEffect(() => {
    let data = [];

    if (stockTickers) {
      stockTickers.forEach((ticker) => {
        data = [
          ...data,
          {
            ...stockData.find((stock) => stock.code === ticker.ticker),
            price: `$${ticker.day.c.toFixed(2)}`,
            change: `${ticker.todaysChange < 0 ? '' : '+'}${ticker.todaysChange.toFixed(2)}%`,
          }
        ]
      });
    }

    setStocks(data);
  }, [stockTickers]);

  useEffect(() => {
    dispatch(getStocks(stockCodes));
  }, []);

  useEffect(() => {
    if (params.id) {
      setSelectedStock(stocks.find((stock) => stock.code === params.id));
    }
  }, [stocks, params]);
  
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
          <StocksAndCryptoTicker selectedCategory={'stocks'} stocks={stocks} />
        </div>
        <div className="mt-10 ml-10 flex flex-col w-11/12">
          <div className="flex flex-row justify-between items-center">
            <div className="w-1/3 h-16">
              <div className="flex items-center gap-4 ml-2" >
                <div className="image-container">
                  <img className="Ellipse w-16 h-16 rounded-full" src={selectedStock ? selectedStock.image : ''} alt="img" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="Company text-stone-900 text-lg font-bold tracking-tight">{selectedStock ? selectedStock.name : ''}</div>
                  <div className="w-20 h-4 relative">
                    <img src={icons.starDark} className="w-4 h-4 left-0 top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starDark} className="w-4 h-4 left-[18px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starDark} className="w-4 h-4 left-[36px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starDark} className="w-4 h-4 left-[54px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                    <img src={icons.starHalf} className="w-4 h-4 left-[72px] top-0 absolute flex-col justify-start items-start inline-flex" alt="img" />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="text-zinc-400 text-base font-semibold tracking-tight">{selectedStock ? selectedStock.code : ''}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-zinc-400 text-xs font-normal tracking-tight">(rating from Bloomberg Experts)</div>
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
              <IndividualStocksInfo />
            </div>
            <div className="w-1/3">
              <StocksMarket />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}