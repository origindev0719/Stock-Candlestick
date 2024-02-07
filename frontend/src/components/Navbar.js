import React, { useState, useEffect, useRef } from 'react';
import '../styles/Dashboard/dashboardStyle.css';
import icons from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchNews } from '../redux/actions/NewsActions';

export const Navbar = ({ title, saveInterests }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTab, setSelectedTab] = useState('All');

    const dispatch = useDispatch()

    const latestNews = useSelector(state => state.latestNews.latest);
    const cryptoNews = useSelector(state => state.cryptoNews.crypto);
    const stocksNews = useSelector(state => state.stocksNews.stocks);
    const searchedNews = useSelector(state => state.searchNews.search);

    const renderContent = () => {
        switch (selectedTab) {
            case 'All':
                return <SearchContent crypto={cryptoNews?.news?.slice(0, 5)} news={latestNews?.news?.slice(0, 5)} stocks={stocksNews?.news?.slice(0, 5)} />;
            case 'Crypto':
                return <SearchContent crypto={cryptoNews?.news} news={[]} stocks={[]} />;
            case 'Stocks':
                return <SearchContent crypto={[]} news={[]} stocks={stocksNews?.news} />;
            case 'Sports':
                return <SearchContent crypto={[]} news={latestNews?.news} stocks={[]} />;
            case 'News':
                return <SearchContent crypto={[]} news={latestNews?.news} stocks={[]} />;
            case 'Articles':
                return <SearchContent crypto={[]} news={latestNews?.news} stocks={[]} />;
            case 'Search':
                return <SearchContent crypto={[]} news={searchedNews?.news} stocks={[]} />;
            default:
                return null;
        }
    };

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            console.log(`Searching for: ${searchTerm}`);
            // Here you can add the logic to perform the search
            await dispatch(searchNews(searchTerm))
            setSelectedTab('Search')
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`Rectangle22483 w-full xs:h-24 bg-neutral-50 flex sm:flex-row flex-col sm:items-center px-5 py-5 ${title === 'Getting started' ? 'justify-between' : null}`}>
            <h2 className="Title sm:text-center text-neutral-900 text-lg xs:text-2xl font-bold leading-loose mr-10">{title}</h2>

            <div className="flex-grow relative">
                <div className="SearchField flex items-center bg-white rounded-xl border border-gray sm:w-96 h-8 px-4">
                    <div className="SearchIicon w-4 h-4 mr-2">
                        <img className="Shape" src={icons.search} alt="img" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                        onClick={toggleDropdown}
                        placeholder="Search for Games, Teams, Players, Stocks, or Crypto"
                        className="SearchByCollection text-zinc-400 text-xs font-semibold leading-none bg-transparent outline-none w-full"
                    />
                </div>

                {showDropdown && (
                    <div ref={dropdownRef} className="absolute top-full mt-2 w-96 bg-white rounded-lg border border-black border-opacity-10 z-99">
                        <div className="w-full h-96 bg-white rounded-lg border border-black border-opacity-10 flex flex-col p-4 overflow-hidden">
                            <div className="Tabs text-center flex items-center justify-center">
                                <p
                                    onClick={() => setSelectedTab('All')}
                                    className={`text-sm font-normal cursor-pointer flex-grow ${selectedTab === 'All' ? 'text-slate-700 font-semibold border-b-2 border-slate-700' : 'text-black'}`}
                                >
                                    All
                                </p>
                                <p
                                    onClick={() => setSelectedTab('Crypto')}
                                    className={`text-sm font-normal cursor-pointer flex-grow ${selectedTab === 'Crypto' ? 'text-slate-700 font-semibold border-b-2 border-slate-700' : 'text-black'}`}
                                >
                                    Crypto
                                </p>
                                <p
                                    onClick={() => setSelectedTab('Stocks')}
                                    className={`text-sm font-normal cursor-pointer flex-grow ${selectedTab === 'Stocks' ? 'text-slate-700 font-semibold border-b-2 border-slate-700' : 'text-black'}`}
                                >
                                    Stocks
                                </p>
                                <p
                                    onClick={() => setSelectedTab('Sports')}
                                    className={`text-sm font-normal cursor-pointer flex-grow ${selectedTab === 'Sports' ? 'text-slate-700 font-semibold border-b-2 border-slate-700' : 'text-black'}`}
                                >
                                    Sports
                                </p>
                                <p
                                    onClick={() => setSelectedTab('News')}
                                    className={`text-sm font-normal cursor-pointer flex-grow ${selectedTab === 'News' ? 'text-slate-700 font-semibold border-b-2 border-slate-700' : 'text-black'}`}
                                >
                                    News
                                </p>
                                <p
                                    onClick={() => setSelectedTab('Articles')}
                                    className={`text-sm font-normal cursor-pointer flex-grow ${selectedTab === 'Articles' ? 'text-slate-700 font-semibold border-b-2 border-slate-700' : 'text-black'}`}
                                >
                                    Articles
                                </p>
                            </div>

                            {renderContent()}
                        </div>

                    </div>
                )}
            </div>

            {title === 'Getting started' ? (
                <div className="flex space-x-4">
                    <button onClick={() => saveInterests()} className="flex items-center justify-center bg-neutral-900 rounded-xl px-4 py-1">
                        <div className="Group156 w-4 h-4 mr-2.5">
                            <img className="CombinedShape299" src={icons.save} alt="img" />
                        </div>
                        <p className="SaveFavorites text-center text-white text-sm font-semibold leading-tight">Save Favorites</p>
                    </button>

                    <button className="flex items-center justify-center bg-lightGray rounded-xl px-4 py-1">
                        <p className="Skip text-center text-neutral-900 text-sm font-semibold leading-tight">Skip</p>
                    </button>
                </div>
            ) : null}
        </div>
    )
}

const SearchContent = ({ crypto, news, stocks }) => {

    return (
        <div className='h-[calc(100vh-20px)] flex flex-col overflow-y-auto'>
            <div className="text-black text-sm font-bold my-3">Crypto</div>
            {/*<div className="flex items-center gap-4 mb-3 whitespace-nowrap">
                <img className="w-6 h-6 rounded-full flex-grow" src="https://via.placeholder.com/26x26" alt="Crypto" />

                <p className="text-neutral-800 flex-grow text-sm font-semibold leading-tight tracking-tight">Meta</p>
                <p className="text-neutral-500 flex-grow text-sm font-semibold leading-tight tracking-tight">META</p>

                <img src={icons.graphGreen} alt='img' className='w-14 h-6 flex-grow' />
                <p className="text-right text-neutral-800 flex-grow text-sm font-semibold leading-tight tracking-tight">$90.79</p>
                <p className="text-right text-green flex-grow text-sm font-semibold leading-tight tracking-tight">+ 2.94%</p>

                <img className="w-4 h-4 rounded-full flex-grow" src={icons.chevronRight} alt="Crypto" />
            </div>*/}
            {crypto ? crypto.map((item, index) => (
                <Link to={item.Url} key={index} className="flex items-center justify-between gap-4 mb-3">
                    <img className="w-6 h-6" src={icons.newspapers} alt="News" />
                    <p className="text-neutral-900 text-base font-normal flex-grow">{item.Title}</p>
                    <img className="w-4 h-4 rounded-full" src={icons.chevronRight} alt="Crypto" />
                </Link>
            )) : null}

            <p className="text-black text-sm font-bold mb-3">News</p>
            {news ? news.map((item, index) => (
                <Link to={item.Url} key={index} className="flex items-center justify-between gap-4 mb-3">
                    <img className="w-6 h-6" src={icons.newspapers} alt="News" />
                    <p className="text-neutral-900 text-base font-normal flex-grow">{item.Title}</p>
                    <img className="w-4 h-4 rounded-full" src={icons.chevronRight} alt="Crypto" />
                </Link>
            )) : null}

            <p className="text-black text-sm font-bold mb-3">Articles</p>
            {stocks ? stocks.map((item, index) => (
                <Link to={item.Url} key={index} className="flex items-center justify-between gap-4 mb-3">
                    <img className="w-6 h-6" src={icons.articles} alt="Article" />
                    <p className="text-neutral-900 text-base font-normal leading-tight flex-grow">{item.Title}</p>
                    <img className="w-4 h-4 rounded-full" src={icons.chevronRight} alt="Crypto" />
                </Link>
            )) : null}
        </div>
    )
}