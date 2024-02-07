import React from 'react';
import '../styles/Dashboard/dashboardStyle.css';
import { Link } from 'react-router-dom';
import { cryptoData } from '../constant/stock';

export const StocksAndCryptoTicker = ({selectedCategory, stocks}) => {
    let content;
    if (selectedCategory === 'stocks') {
        content = stocks.map((item, index) => stockTickerTemplate(item, index));
    } else if (selectedCategory === 'crypto') {
        content = cryptoData.map((item, index) => cryptoTickerTemplate(item, index));
    }

    return (
        <div className="TrendingTicker w-full bg-white rounded-lg p-2.5 flex flex-row gap-11 ml-10">
            <div className='overflow-auto w-full flex flex-row'>
                {content}
            </div>
        </div>
    );
}

const stockTickerTemplate = (data, index) => {
    return (
        <Link to={`/stocks/individualStocks/${data.code}`} className="flex items-center gap-4 ml-2" key={index}>
            <div className="image-container">
                <img className="Ellipse w-14 h-14 rounded-full object-cover" src={data.image} alt="img" />
            </div>
            <div className="flex flex-col gap-1.5">
                <div className="Company text-neutral-800 text-sm font-semibold">{data.name}</div>
                <div className="Code text-neutral-500 text-sm font-semibold">{data.code}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5 w-20">
                <div className="000 text-right text-neutral-800 text-sm font-semibold">{data.price}</div>
                <div className="flex items-center gap-2">
                    <div className={`00 text-right ${data.change.indexOf('-') > -1 ? 'text-red' : 'text-green'} text-sm font-semibold`}>{data.change}</div>
                </div>
            </div>
        </Link>
    )
}

const cryptoTickerTemplate = (data, index) => {

    return (
        <Link to={`/crypto/individualCrypto/${index}`} className="flex items-center gap-4 ml-2" key={index}>
            <img className="Shape w-5 h-6 ml-3 object-cover" src={data.image} alt="img" />
            <div className="flex flex-col gap-1.5">
                <div className="Bitcoin text-neutral-800 text-sm font-semibold">{data.name}</div>
                <div className="Btc text-neutral-500 text-sm font-semibold">{data.code}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5 w-20">
                <div className="4207105 text-right text-neutral-800 text-sm font-semibold">{data.price}</div>
                <div className="flex items-center gap-2">
                    <div className="00 text-right text-green text-sm font-semibold">{data.change}</div>
                </div>
            </div>
        </Link>
    )
}