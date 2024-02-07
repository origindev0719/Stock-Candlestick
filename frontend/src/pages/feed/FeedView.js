import { useState } from "react";
import { Feed } from "../../components/FeedComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { TrendingTicker } from "../../components/TrendingTicker";
import { TopicsToFollow } from "./components/TopicsToFollow";
import { Trending } from "./components/Trending";
import { WhoToFollow } from "./components/WhoToFollow";
import { Loading } from "../../components/LoadingComponent";
import { useSelector } from "react-redux";
import { BottomBar } from "../../components/BottomBar";

export const FeedView = () => {
  const [trendingTickerLoaded, setTrendingTickerLoaded] = useState(false);
  const latestNews = useSelector(state => state.latestNews.latest);
  const cryptoNews = useSelector(state => state.cryptoNews.crypto);
  const stocksNews = useSelector(state => state.stocksNews.stocks);

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      {
        !(trendingTickerLoaded) && (
          <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
            <Loading />
          </div>
        )
      }
      <div className={`flex flex-col h-screen overflow-y-auto overflow-x-hidden ${!(trendingTickerLoaded) ? 'hidden' : ''}`}>
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Feed' />
        </div>
        <div className="sticky top-24 bg-white">
          <TrendingTicker setTrendingTickerLoaded={setTrendingTickerLoaded} selectedButton='NBA' />
        </div>
        <div className="mt-10 ml-10 flex flex-col sm:flex-row sm:justify-center h-full gap-3">
          <div className="w-full sm:w-2/5 lg:w-1/4">
            <Trending latestNews={latestNews} cryptoNews={cryptoNews} stocksNews={stocksNews} />
          </div>
          <div className="w-full sm:w-3/5 lg:w-2/5 mr-3 sm:mr-0 mb-24 sm:mb-0">
            <Feed />
          </div>
          <div className="hidden lg:block w-1/4 mr-3 sm:mr-0">
            <WhoToFollow />
            <TopicsToFollow />
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}