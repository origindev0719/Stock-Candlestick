import { useEffect, useState } from "react";
import { Feed } from "../../components/FeedComponent";
import { Matchup } from "../../components/MatchupComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { TrendingTicker } from "../../components/TrendingTicker";
import QuickPicks from "./components/QuickPicksComponent";
import { Loading } from "../../components/LoadingComponent";
import { BottomBar } from "../../components/BottomBar";

export const SportsView = () => {
  const [matchupLoaded, setMatchupLoaded] = useState(false);
  const [trendingTickerLoaded, setTrendingTickerLoaded] = useState(false);

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      {
        !(matchupLoaded && trendingTickerLoaded) && (
          <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
            <Loading />
          </div>
        )
      }
      <div className={`flex flex-col h-screen overflow-y-auto overflow-x-hidden ${!(matchupLoaded && trendingTickerLoaded) ? 'hidden' : ''}`}>
        <div className="sticky top-0 z-20 bg-white">
          <Navbar title='Sports' />
        </div>
        <div className="sticky top-24 bg-white">
          <TrendingTicker setTrendingTickerLoaded={setTrendingTickerLoaded} selectedButton='NBA' />
        </div>
        <div className="mt-10 sm:ml-10 flex flex-col lg:flex-row mb-24 md:mb-0">
          <div className="w-full lg:w-1/3">
            <QuickPicks />
          </div>
          <div className="w-11/12 flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-3/5 lg:w-1/2 ml-5 sm:ml-0">
              <Feed />
            </div>
            <div className="w-full md:w-1/3 lg:w-2/5">
              <Matchup setMatchupLoaded={setMatchupLoaded} />
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}
