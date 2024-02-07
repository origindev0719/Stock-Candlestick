import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getStocks } from '../../redux/actions/StocksActions';
import {stockData, stockCodes} from '../../constant/stock';
import { Feed } from "../../components/FeedComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { StocksAndCryptoTicker } from "../../components/StocksAndCryptoTicker";
import { StocksInfo } from "./components/StocksInfo";
import { StocksNews } from "./components/StocksNews";

export const StocksView = () => {
  const [stocks, setStocks] = useState([]);

  const stockTickers = useSelector((state) => state.stocks.stocks);
  const dispatch = useDispatch();

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

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Stocks' />
        </div>
        <div className="sticky top-24 z-10 bg-white">
          <StocksAndCryptoTicker selectedCategory={'stocks'} stocks={stocks} />
        </div>
        <div className="mt-10 ml-10 flex flex-row h-full justify-center">
          <div className="w-1/4">
            <StocksInfo />
          </div>
          <div className="w-2/5">
            <Feed />
          </div>
          <div className="w-1/4 ml-10">
            <StocksNews />
          </div>
        </div>
      </div>
    </div>
  )
}