import { useState } from "react";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { Feed } from "../../components/FeedComponent";
import { BettingPerformance } from "./components/BettingPerformance";
import { StockPerformance } from "./components/StockPerformance";
import { About } from "./components/About";
import { Achievements } from "./components/Achievements";
import { useNavigate } from 'react-router-dom';
import { BottomBar } from "../../components/BottomBar";

export const ProfileView = ({ userDetails, followers, myId, isFollowing, follow, unfollow }) => {
  const [activeButton, setActiveButton] = useState('Feed');
  const navigate = useNavigate();

  const handleDirectMessage = () => {
    navigate(`/inbox?userId=${userDetails.id}`);
  };

  const renderContent = () => {
    switch (activeButton) {
      case 'Feed':
        return <Feed />;
      case 'Betting Performance':
        return <BettingPerformance />;
      case 'Stock Performance':
        return <StockPerformance />;
      case 'About':
        return <About />;
      case 'Achievements':
        return <Achievements />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full h-screen overflow-y-hidden overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Profile' />
        </div>
        <div className="mt-10 lg:ml-10 flex flex-row h-full w-full justify-center">
          <div className="w-5/6 lg:w-4/6 flex flex-col">
            {/* HEADER */}
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-row justify-between items-center">
                <div className="w-2/4 flex items-center">
                  <div className="w-16 h-16 pl-1 py-0.5 flex justify-end items-center">
                    <img className="w-14 h-14 rounded-full" src={userDetails?.profileImg} alt="Profile" />
                  </div>
                  <div className="h-14 flex flex-col justify-center items-start gap-1 ml-2">
                    <div className="flex items-center gap-1">
                      <p className="text-slate-900 text-base font-bold leading-relaxed">{userDetails?.name}</p>
                    </div>
                    <p className="text-slate-400 text-base font-normal leading-relaxed">Firefighter</p>
                  </div>
                </div>
                {userDetails?.id !== myId ? (
                  <div className="w-2/4 flex flex-row gap-3">
                    <button
                      className="flex-grow h-12 p-2 bg-primary rounded-xl justify-center items-center gap-2.5 inline-flex"
                      onClick={() => {
                        if (isFollowing) {
                          unfollow()
                        } else {
                          follow()
                        }
                      }}
                    >
                      <p className="text-neutral-900 text-base font-bold leading-relaxed">{isFollowing ? 'Unfollow' : 'Follow'}</p>
                    </button>
                    <div className="flex-grow h-12 p-2 bg-white rounded-xl border border-primary justify-center items-center gap-2.5 inline-flex">
                      <p className="text-neutral-900 text-base font-bold leading-relaxed">Message</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="w-full flex flex-row justify-around items-center mt-6">
                <div className="flex-grow h-12 flex flex-col items-center">
                  <p className="text-slate-400 text-base font-normal leading-relaxed">Followers</p>
                  <p className="text-slate-900 text-base font-normal leading-relaxed">{followers?.followers?.length}</p>
                </div>
                <div className="w-0.5 h-10 bg-slate-200 rounded" />
                <div className="flex-grow h-12 flex flex-col items-center">
                  <p className="text-slate-400 text-base font-normal leading-relaxed">Posts</p>
                  <p className="text-slate-900 text-base font-normal leading-relaxed">582</p>
                </div>
                <div className="w-0.5 h-10 bg-slate-200 rounded" />
                <div className="flex-grow h-12 flex flex-col items-center">
                  <p className="text-slate-400 text-base font-normal leading-relaxed">Likes</p>
                  <p className="text-slate-900 text-base font-normal leading-relaxed">2,347</p>
                </div>
                <div className="w-0.5 h-10 bg-slate-200 rounded" />
                <div className="flex-grow h-12 flex flex-col items-center">
                  <p className="text-slate-400 text-base font-normal leading-relaxed">Reposts</p>
                  <p className="text-slate-900 text-base font-normal leading-relaxed">219</p>
                </div>
              </div>
            </div>
            {/* CONTENT */}
            <div className="w-full flex flex-col sm:flex-row mt-10">
              {/* SIDEBAR */}
              <div className="w-full sm:w-1/4 mb-5 sm:mb-0 flex flex-row sm:flex-col sm:h-80">
                <div className="w-full p-3 bg-white rounded-t-lg shadow flex flex-row sm:flex-col justify-center items-center sm:justify-start sm:items-start flex-wrap">
                  <button
                    className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Feed' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                    onClick={() => setActiveButton('Feed')}
                  >
                    Feed
                  </button>
                  <button
                    className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Betting Performance' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                    onClick={() => setActiveButton('Betting Performance')}
                  >
                    Betting Performance
                  </button>
                  <button
                    className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Stock Performance' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                    onClick={() => setActiveButton('Stock Performance')}
                  >
                    Stock Performance
                  </button>
                  <button
                    className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'About' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                    onClick={() => setActiveButton('About')}
                  >
                    About
                  </button>
                  <button
                    className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Achievements' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                    onClick={() => setActiveButton('Achievements')}
                  >
                    Achievements
                  </button>
                </div>

                {
                  (userDetails.id === myId ? null : (
                    <div className="w-full p-3 bg-white rounded-b-lg shadow flex flex-col justify-start items-start">
                      <button
                        className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Direct Message' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                        onClick={() => handleDirectMessage()}
                      >
                        Direct Message
                      </button>
                      <button
                        className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Contact Info' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                        onClick={() => setActiveButton('Contact Info')}
                      >
                        Contact Info
                      </button>
                      <button
                        className={`sm:w-full flex-grow px-3 py-2 rounded-lg text-sm sm:text-lg text-left ${activeButton === 'Report User' ? 'bg-primary text-neutral-900 font-bold' : 'bg-white text-slate-400'}`}
                        onClick={() => setActiveButton('Report User')}
                      >
                        Report User
                      </button>
                    </div>
                  ))
                }
              </div>
              {/* TABS */}
              <div className="w-full sm:w-3/4 h-[calc(100vh-200px)] overflow-y-auto mb-10 ml-5">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}