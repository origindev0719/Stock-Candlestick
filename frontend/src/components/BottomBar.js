// BottomBar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { icons } from '../assets';

export const BottomBar = () => {
    const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    let lastItem = currentPath[currentPath.length - 1];

    const [activeButton, setActiveButton] = useState(lastItem);
    const [bottomBar, setBottomBar] = useState(window.innerWidth < 640);

    const validValues = ['dashboard', 'feed', 'sports', 'stocks', 'crypto', 'inbox', 'gameSchedule', 'propBets', 'evChart', 'profile'];

    if (!validValues.includes(lastItem)) {
        lastItem = currentPath[currentPath.length - 2];
    }

    useEffect(() => {
      const handleResize = () => {
          setBottomBar(window.innerWidth > 640);
      };

      window.addEventListener('resize', handleResize);

      // Initialize the isMobile state on component mount
      handleResize();

      // Clean up the event listener on component unmount
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

    return (
        <div className={`Sidebar bottom-bar fixed inset-x-0 bottom-0 bg-white shadow-lg z-50 ${bottomBar ? 'hidden' : 'flex'} justify-around items-center h-16`}> 
            <BottomBarItem
                icon={<img src={activeButton === 'dashboard' ? icons.dashboardLight : icons.dashboard} alt='img' />}
                text="Dashboard"
                active={activeButton === 'dashboard'}
                onClick={() => setActiveButton('dashboard')}
                link={`/dashboard/${userInfoFromStorage?.id}`}
            />
            <BottomBarItem
                icon={<img src={activeButton === 'feed' ? icons.tradeLight : icons.trade} alt='img' />}
                text="Feed"
                active={activeButton === 'feed'}
                onClick={() => setActiveButton('feed')}
                link='/feed'
            />
            <BottomBarItem
                icon={<img src={activeButton === 'sports' ? icons.cupLight : icons.cup} alt='img' />}
                text="Sports"
                active={activeButton === 'sports'}
                onClick={() => setActiveButton('sports')}
                link='/sports'
            />
            <BottomBarItem
                icon={<img src={activeButton === 'inbox' ? icons.coinLight : icons.coin} alt='img' />}
                text="Inbox"
                active={activeButton === 'inbox'}
                onClick={() => setActiveButton('inbox')}
                link='/inbox'
            />
            <BottomBarItem
                icon={<img src={userInfoFromStorage?.profileImg} className="w-6 h-6" alt='img' />}
                text="Profile"
                active={activeButton === 'profile'}
                onClick={() => setActiveButton('profile')}
                link={`/profile/${userInfoFromStorage?.id}`}
            />
        </div>
    );
};

const BottomBarItem = ({ icon, text, active, onClick, link }) => {
    return (
        <Link to={link} onClick={onClick} className={`flex flex-col items-center gap-1 justify-center w-full h-full ${active ? "text-white" : "text-zinc-400"}`}>
            {icon}
            <span className="text-xs">{text}</span>
        </Link>
    );
};
