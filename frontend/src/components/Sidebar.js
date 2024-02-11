import React, { useState, useContext, createContext, useEffect } from 'react';
import icons from '../assets/icons';
import '../styles/Dashboard/dashboardStyle.css';
import { Link, useLocation } from 'react-router-dom';
import { NotificationsModal } from './NotificationsModal';
import { SupportModal } from './SupportModal';
import { GetPremiumModal } from './GetPremiumModal';
import { ProfileModal } from './ProfileModal';

export const SidebarContext = createContext();

export const Sidebar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth > 768);
    const [bottomBar, setBottomBar] = useState(window.innerWidth > 640);
    const [expanded, setExpanded] = useState(!isMobile);
    const [isSportsDropdownVisible, setSportsDropdownVisible] = useState(false);
    const [isNotificationsModalVisible, setNotificationsModalVisible] = useState(false);
    const [isSupportModalVisible, setSupportModalVisible] = useState(false);
    const [isPremiumModalVisible, setPremiumModalVisible] = useState(false);
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);

    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    const location = useLocation();
    const currentPath = location.pathname.split('/');
    let lastItem = currentPath[currentPath.length - 1];

    const validValues = ['dashboard', 'feed', 'sports', 'stocks', 'crypto', 'inbox', 'gameSchedule', 'propBets', 'evChart', 'profile'];

    if (!validValues.includes(lastItem)) {
        lastItem = currentPath[currentPath.length - 2];
    }

    const [activeButton, setActiveButton] = useState(lastItem);

    // Event listener to update 'isMobile' based on window width
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setBottomBar(window.innerWidth < 640);
            if (window.innerWidth < 768) {
                setExpanded(false);  // Automatically set to collapsed on small screens
            }
        };

        window.addEventListener('resize', handleResize);

        // Initialize the isMobile state on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (activeButton.includes('gameSchedule') || activeButton.includes('propBets') || activeButton.includes('evChart')) {
            setSportsDropdownVisible(true);
        }
    }, [activeButton]);

    const handleMouseEnter = () => {
        // Only expand if not on mobile
        if (!isMobile) {
            setExpanded(true);
        }
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        // Only collapse if not on mobile
        if (!isMobile) {
            setExpanded(false);
        }
    };

    return (
        <aside
            className={`${bottomBar ? 'hidden' : 'flex'} h-screen`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <nav className="Sidebar h-full flex flex-col justify-between bg-white border-r shadow-sm transition ease-in-out duration-700">
                <div>
                    <div className="p-4 pb-2 flex justify-between items-center">
                        {expanded ? <img className="LogoHorWhiteColor w-44 h-10 mb-8 mt-4" src={icons.sidebarLogo} alt="img" /> : <img className="LogoHorWhiteColor h-10 mb-8 mt-4" src={icons.logo} alt="img" />}
                        {/*<button onClick={() => setExpanded(prev => !prev)} className="p-1.5 rounded-lg bg-zinc-400 hover:bg-zinc-400 z-0">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>*/}
                    </div>

                    <SidebarContext.Provider value={{ activeButton, setActiveButton, expanded }}>
                        <Link to={`/dashboard/${userInfoFromStorage?.id}`} >
                            <SidebarItem
                                icon={<img src={activeButton === 'dashboard' ? icons.dashboardLight : icons.dashboard} alt='img' />}
                                text="Dashboard"
                                active={activeButton === 'dashboard'}
                                onClick={() => setActiveButton('dashboard')}
                            />
                        </Link>
                        <Link to='/feed' >
                            <SidebarItem
                                icon={<img src={activeButton === 'feed' ? icons.tradeLight : icons.trade} alt='img' />}
                                text="Feed"
                                active={activeButton === 'feed'}
                                onClick={() => setActiveButton('feed')}
                            />
                        </Link>

                        <Link to='/sports' >
                            <SidebarItem
                                icon={<img src={activeButton === 'sports' ? icons.cupLight : icons.cup} alt='img' />}
                                text="Sports"
                                active={activeButton === 'sports'}
                                onClick={() => {
                                    setActiveButton('sports');
                                }}
                                dropdown={true}
                                dropdownClick={() => {
                                    setSportsDropdownVisible(true);
                                }}
                            />
                        </Link>

                        {isSportsDropdownVisible && expanded && (
                            <div className="ml-6 mt-2">
                                <Link to={`/sports/gameSchedule/football?sport=football&league=NFL`}>
                                    <SidebarItem
                                        text="Game Schedule"
                                        active={activeButton === 'gameSchedule'}
                                        onClick={() => setActiveButton('gameSchedule')}
                                    />
                                </Link>
                                <Link to='/sports/selectPropBets' >
                                    <SidebarItem
                                        text="Prop Bets"
                                        active={activeButton === 'propBets'}
                                        onClick={() => setActiveButton('propBets')}
                                    />
                                </Link>
                                <Link to='/sports/evChart' >
                                    <SidebarItem
                                        text="EV Chart"
                                        active={activeButton === 'evChart'}
                                        onClick={() => setActiveButton('evChart')}
                                    />
                                </Link>
                            </div>
                        )}
                        <Link to='/stocks'>
                            
                            <SidebarItem
                                icon={<img src={activeButton === 'stocks' ? icons.chartLight : icons.chart} alt='img' />}
                                text="Stocks"
                                active={activeButton === 'stocks'}
                                onClick={() => setActiveButton('stocks')}
                            />
                        </Link>
                        {/* <Link to='/crypto'> 
                            <SidebarItem
                                icon={<img src={activeButton === 'crypto' ? icons.bitcoinLight : icons.bitcoin} alt='img' />}
                                text="Cryptos"
                                active={activeButton === 'crypto'}
                                onClick={() => setActiveButton('crypto')}
                            />
                        </Link>*/}
                        <Link to='/inbox'>
                            <SidebarItem
                                icon={<img src={activeButton === 'inbox' ? icons.coinLight : icons.coin} alt='img' />}
                                text="Inbox"
                                active={activeButton === 'inbox'}
                                onClick={() => setActiveButton('inbox')}
                            />
                        </Link>

                    </SidebarContext.Provider>
                </div>

                {expanded && (
                    <div className='SidebarFooter m-3'>
                        <button
                            onClick={() => {
                                setActiveButton('Notifications')
                                setNotificationsModalVisible(!isNotificationsModalVisible)
                            }}
                            className="Notifications mb-4 flex items-center gap-4"
                        >
                            <img className="icon-size w-6 h-6" src={icons.bell} alt="Notification Icon" />
                            <span className={`text-base font-semibold ${activeButton === 'Notifications' ? 'text-white' : 'text-zinc-400'}`}>Notifications</span>
                            <div className="relative w-4 h-4 ml-2">
                                <div className="absolute w-4 h-4 bg-red rounded-full"></div>
                                <span className="absolute text-xs font-semibold text-white leading-none left-[5px] top-[1px]">2</span>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                setActiveButton('Support')
                                setSupportModalVisible(!isSupportModalVisible)
                            }}
                            className="SupportSection mb-4 flex items-center gap-4"
                        >
                            <img className="icon-size w-6 h-6 bg-neutral-800" src={icons.headphones} alt="img" />
                            <span className={`text-base font-semibold ${activeButton === 'Support' ? 'text-white' : 'text-zinc-400'}`}>Support</span>
                        </button>

                        <button
                            onClick={() => {
                                setActiveButton('Get Premium')
                                setPremiumModalVisible(!isPremiumModalVisible)
                            }}
                            className="PremiumSection mb-4 flex items-center gap-5 w-64 h-9 bg-primary rounded-lg">
                            <img className="icon-size w-4 h-6 ml-2" src={icons.award} alt="img" />
                            <span className={`text-base font-semibold ${activeButton === 'Get Premium' ? 'text-white' : 'text-neutral-900'}`}>Get Premium</span>
                        </button>

                        <button
                            onClick={() => {
                                setActiveButton('profile')
                                setProfileModalVisible(!isProfileModalVisible)
                            }}
                            className="Notification mb-4 flex items-center gap-1.5"
                            >
                            <div className="relative w-10 h-10">
                                <img className="icon-size w-10 h-10 rounded-full" src={userInfoFromStorage?.profileImg} alt="img" />
                            </div>
                            <span className="text-base font-semibold text-white">{userInfoFromStorage?.name}</span>
                        </button>
                    </div>
                )}
            </nav>
            <NotificationsModal
                isVisible={isNotificationsModalVisible}
                onClose={() => {
                    setNotificationsModalVisible(false)
                    setActiveButton(lastItem)
                }}
            />

            <SupportModal
                isVisible={isSupportModalVisible}
                onClose={() => {
                    setSupportModalVisible(false)
                    setActiveButton(lastItem)
                }}
            />

            <GetPremiumModal
                isVisible={isPremiumModalVisible}
                onClose={() => {
                    setPremiumModalVisible(false)
                    setActiveButton(lastItem)
                }}
            />

            <ProfileModal
                isVisible={isProfileModalVisible}
                onClose={() => {
                    setProfileModalVisible(false)
                    setActiveButton(lastItem)
                }}
                userId={userInfoFromStorage?.id}
            />

        </aside>
    );
}

export const SidebarItem = ({ icon, text, active, alert, onClick, dropdown, dropdownClick }) => {
    const { expanded } = useContext(SidebarContext);
    const iconStyle = !expanded ? { width: '50px', height: '50px' } : {};

    const textStyle = expanded ? "opacity-100" : "opacity-0";
    const textTransition = "transition-opacity duration-300 ease";

    return (
        <li
            className={`
                relative flex items-center py-2 px-3 my-1
                text-base font-semibold rounded-md cursor-pointer
                transition-colors group
                ${active
                    ? "text-white"
                    : "text-zinc-400"
                }
            `}
            onClick={onClick}
        >
            <div className="flex items-center justify-center" style={iconStyle}>
                {icon}
            </div>
            <span
                className={`flex items-center overflow-hidden transition-all ${textTransition} ${textStyle} ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {text}
                {dropdown ? (
                    <button onClick={dropdownClick} className='ml-2'>
                        <img src={icons.chevronDown} alt='img' />
                    </button>
                ) : null}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-zinc-400 ${expanded ? "" : "top-2"}`}
                />
            )}
            {!expanded && (
                <div
                    className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-zinc-100 text-zinc-800 text-sm z-10
                    invisible opacity-20 -translate-x-3 transition-opacity duration-300 ease
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
