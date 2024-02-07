import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { TrendingTicker } from "../../components/TrendingTicker";
import { UpcomingBettingOdds } from "./components/UpcomingBettingOdds";
import { Loading } from "../../components/LoadingComponent";
import { MainNews } from "./components/MainNewsComponent";
import { BettingAppCards } from "./components/BettingAppCards";
import { useDispatch, useSelector } from "react-redux";
import { 
    getLatestNews, 
    getCryptoNews,
    getStocksNews 
} from "../../redux/actions/NewsActions";
import { FollowUsComponent } from "./components/FollowUsComponent";
import { LatestNews } from "./components/LatestNewsComponent";
import { BottomBar } from "../../components/BottomBar";

export const DashboardView = ({userId}) => {
    const [trendingTickerLoaded, setTrendingTickerLoaded] = useState(false);
    const [selectedButton, setSelectedButton] = useState('NBA');
    const latestNews = useSelector(state => state.latestNews.latest);
    const cryptoNews = useSelector(state => state.cryptoNews.crypto);
  const stocksNews = useSelector(state => state.stocksNews.stocks);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLatestNews());
        dispatch(getCryptoNews());
        dispatch(getStocksNews());
    }, [userId]);

    return (
        <div className="DashboardElParlay w-screen h-screen bg-neutral-50 flex flex-row overflow-hidden">
            <Sidebar />
            {
                !(trendingTickerLoaded) && (
                    <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
                        <Loading />
                    </div>
                )
            }
            <div className={`Dashboard flex flex-col h-screen overflow-y-auto overflow-x-hidden ${!(trendingTickerLoaded) ? 'hidden' : ''}`}>
                <div className="sticky top-0 z-20 bg-white">
                    <Navbar title='Dashboard' />
                </div>
                <div className="sticky top-24 bg-white z-10">
                    <TrendingTicker setTrendingTickerLoaded={setTrendingTickerLoaded} selectedButton={selectedButton} />
                </div>
                <div className="flex flex-col lg:flex-row space-y-4 ml-3 sm:ml-10 sm:mt-10 xl:space-y-0 xl:space-x-4">
                    {/* FEED */}
                    <div className="Feed flex flex-col space-y-4 sm:w-full lg:w-2/3">
                        {/*<MainNews latestNews={latestNews} />*/}

                        <div className="flex flex-col">
                            <h2 className="text-justify text-indigo-950 text-2xl md:text-3xl font-extrabold uppercase mt-4">
                                UPCOMING BETTING ODDS
                            </h2>
                            <div className="flex flex-row w-full sm:w-2/5 mt-4">
                                <button
                                    onClick={() => setSelectedButton('NBA')}
                                    className={`flex-grow text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'NBA' ? 'border-b-2 border-neutral-900' : ''}`}
                                >
                                    NBA
                                </button>
                                <button
                                    onClick={() => setSelectedButton('NFL')}
                                    className={`flex-grow text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'NFL' ? 'border-b-2 border-neutral-900' : ''}`}
                                >
                                    NFL
                                </button>
                                <button
                                    onClick={() => setSelectedButton('MLB')}
                                    className={`flex-grow text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'MLB' ? 'border-b-2 border-neutral-900' : ''}`}
                                >
                                    MLB
                                </button>
                                <button
                                    onClick={() => setSelectedButton('NHL')}
                                    className={`flex-grow text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'NHL' ? 'border-b-2 border-neutral-900' : ''}`}
                                >
                                    NHL
                                </button>
                                <button
                                    onClick={() => setSelectedButton('UFC')}
                                    className={`flex-grow text-center text-neutral-900 text-base font-normal font-['SF Pro Text'] leading-snug ${selectedButton === 'UFC' ? 'border-b-2 border-neutral-900' : ''}`}
                                >
                                    UFC
                                </button>
                            </div>
                            <div className="mt-5 mr-3">
                                <UpcomingBettingOdds selectedButton={selectedButton} />
                            </div>
                        </div>''

                        <FollowUsComponent />
                    </div>

                    {/* Best Sports Betting Sites */}
                    <BettingAppCards />
                </div>
                <LatestNews title='LATEST STOCKS NEWS' data={stocksNews} />
                <LatestNews title='LATEST CRYPTO NEWS' data={cryptoNews} />
                <LatestNews title='LATEST SPORTS NEWS' data={latestNews} />
            </div>
            <BottomBar />
        </div>
    );
};
