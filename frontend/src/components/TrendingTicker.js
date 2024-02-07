import React, { useEffect, useMemo, useState } from 'react';
import icons from '../assets/icons';
import '../styles/Dashboard/dashboardStyle.css';
import { getUpcomingMatchups } from '../redux/actions/SportsActions';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';

// Mapping of categories to their respective sports and leagues
const categoryToSportLeagueMap = {
    NBA: { sport: 'basketball', league: 'NBA' },
    NFL: { sport: 'football', league: 'NFL' },
    NHL: { sport: 'hockey', league: 'NHL' },
    MLB: { sport: 'baseball', league: 'MLB' },
    UFC: { sport: 'mma', league: 'UFC' },
};

export const TrendingTicker = ({ setTrendingTickerLoaded, selectedButton }) => {
    const [selectedCategory, setSelectedCategory] = useState('NBA');
    //const [notificationOn, setNotificationOn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [upcomingMatchups, setUpcomingMatchups] = useState([]);
    const matchupsFromStore = useSelector(state => state.getUpcomingMatchups.matchups[selectedCategory]);

    useEffect(() => {
        setSelectedCategory(selectedButton);
    }, [selectedButton]);

    const dispatch = useDispatch()

    useEffect(() => {
        const sportLeague = categoryToSportLeagueMap[selectedCategory];

        // Check if matchupsFromStore is defined and either empty or has a different league
        if (sportLeague && (!matchupsFromStore || matchupsFromStore.length === 0 || (matchupsFromStore[0].league && matchupsFromStore[0].league !== sportLeague.league))) {
            dispatch(getUpcomingMatchups(sportLeague.sport, sportLeague.league));
        }
    }, [dispatch, selectedCategory, matchupsFromStore]);


    // Use another useEffect to set the matchups when matchupsFromStore changes
    useEffect(() => {
        // Only update if the matchups have actually changed
        if (!isEqual(matchupsFromStore, upcomingMatchups)) {
            setUpcomingMatchups(matchupsFromStore);
            setTrendingTickerLoaded(true);
        }
    }, [matchupsFromStore]);

    const options = [
        //{ value: 'trending', label: 'Trending' },
        { value: 'nba', label: 'NBA' },
        { value: 'nfl', label: 'NFL' },
        { value: 'nhl', label: 'NHL' },
        { value: 'mlb', label: 'MLB' },
        { value: 'mma', label: 'UFC' },
        //{ value: 'stock', label: 'Stock' },
        //{ value: 'crypto', label: 'Crypto' }
    ];

    let content;

    if (selectedCategory === 'trending') {
        //content = [];
        //getTrendingData().forEach((item, index) => {
        //    if (nbaData.includes(item)) content.push(<NBATickerTemplate matchup={item} key={index} toggleNotification={toggleNotification} notificationOn={notificationOn} />);
        //    else if (stockData.includes(item)) content.push(stockTickerTemplate(item, index));
        //    else if (cryptoData.includes(item)) content.push(cryptoTickerTemplate(item, index));
        //});
    } else if (categoryToSportLeagueMap[selectedCategory]) {
        // Use the fetched matchups for the selected sport category
        content = upcomingMatchups?.map((matchup, index) => (
            <NBATickerTemplate key={index} matchup={matchup} />
        )
        );
    } else if (selectedCategory === 'stock') {
        //content = stockData.map((item, index) => stockTickerTemplate(item, index));
    } else if (selectedCategory === 'crypto') {
        //content = cryptoData.map((item, index) => cryptoTickerTemplate(item, index));
    }

    return (
        <div className="TrendingTicker w-full bg-white rounded-lg p-2.5 flex flex-row gap-11">
            {/* Trending Dropdown */}
            <div className="dropdown inline-block relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-lightGray border-2 rounded-lg text-gray font-semibold py-2 px-4 inline-flex items-center"
                >
                    <span className="mr-1">{options.find((option) => option?.label === selectedCategory)?.label}</span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul className={`dropdown-menu absolute ${isDropdownOpen ? 'block' : 'hidden'} text-gray pt-1`}>
                    {options.map((option, index) => (
                        <li key={index} className="">
                            <span
                                onClick={() => {
                                    setSelectedCategory(option?.label);
                                    setIsDropdownOpen(false);
                                }}
                                className="bg-lightGray hover:bg-gray py-2 px-4 block whitespace-no-wrap"
                            >
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='overflow-auto w-full flex flex-row'>
                {content}
            </div>
        </div>
    );
}

const NBATickerTemplate = ({ matchup, index }) => {

    const getFormattedRecord = (team) => {
        // Safely access nested properties with optional chaining
        const winLossAllGames = team?.records?.['Win/Loss']?.['Regular Season Games'];
        // Use nullish coalescing to provide a default value in case of undefined
        const wins = winLossAllGames?.wins ?? '';
        const losses = winLossAllGames?.losses ?? '';
        return `${wins} - ${losses}`;
    };

    function findHomeTeamPointSpread(gameDetails, oddsArray) {
        // Extract the home team abbreviation from the game details
        const homeTeamAbbreviation = gameDetails.home_team_abb;

        // Find the point spread market for the home team
        const pointSpreadMarket = oddsArray.find(odds =>
            odds.market === 'point_spread' && odds.normalized_selection.includes(homeTeamAbbreviation.toLowerCase()) && odds.is_main
        );

        // If a point spread market is found, format and return the string
        if (pointSpreadMarket) {
            const sign = pointSpreadMarket.selection_points > 0 ? '+' : ''; // Add '+' sign if positive
            return `${homeTeamAbbreviation.toUpperCase()} ${sign}${pointSpreadMarket.selection_points}`;
        } else {
            // If no point spread market is found for the home team, return a message indicating so
            return null;
        }
    }

    // Check if the game's sport is MMA, and conditionally render the Link or a div
    const isMMA = matchup.sport === 'mma';
    const WrapperComponent = isMMA ? 'div' : Link;
    const wrapperProps = isMMA ? {} : { to: `/sports/propBets/${matchup.game_id}` };

    return (
        <WrapperComponent key={index} {...wrapperProps} className="flex h-14 items-center justify-between whitespace-nowrap ml-3">
            <div className={`flex w-60 items-center ${matchup.away_team_details?.records ? 'justify-between' : 'justify-around'}`}>
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-4 w-full">
                        <img className="w-6 h-6 object-cover" src={matchup.away_team_details?.logo} alt='Default Name' />
                        <div className="flex flex-grow justify-between items-center">
                            <span className="text-neutral-900 text-base font-semibold font-['SF Pro Text'] leading-tight">
                                {matchup.away_team_details?.team_abbreviation ? matchup.away_team_details?.team_abbreviation : matchup.away_team_details?.team_name}
                            </span>
                            {
                                matchup.away_team_details?.records['Win/Loss'] ? (
                                    <span className="text-neutral-500 text-sm font-normal font-['SF Pro Text'] leading-tight ml-7">
                                        {getFormattedRecord(matchup.away_team_details)}
                                    </span>
                                ) : null
                            }
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full">
                        <img className="w-6 h-6 object-cover" src={matchup.home_team_details?.logo} alt='Default Name' />
                        <div className="flex flex-grow justify-between items-center">
                            <span className="text-neutral-900 text-base font-semibold font-['SF Pro Text'] leading-tight">
                                {matchup.home_team_details?.team_abbreviation ? matchup.home_team_details?.team_abbreviation : matchup.home_team_details?.team_name}
                            </span>
                            {
                                matchup.home_team_details?.records['Win/Loss'] ? (
                                    <span className="text-neutral-500 text-sm font-normal font-['SF Pro Text'] leading-tight ml-7">
                                        {getFormattedRecord(matchup.home_team_details)}
                                    </span>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-neutral-500 text-sm font-medium font-['SF Pro Text'] leading-none">
                        {
                            new Date(matchup.start_date).toDateString() !== new Date().toDateString() ?
                                new Date(matchup.start_date).toLocaleDateString() :
                                new Date(matchup.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                    </span>
                    <span className="text-neutral-500 text-sm font-normal font-['SF Pro Text'] leading-tight">
                        {matchup?.odds?.odds ? findHomeTeamPointSpread(matchup, matchup?.odds?.odds) : null}
                    </span>
                </div>
            </div>

            <div className="w-px h-11 bg-zinc-300 rounded-2xl ml-5"></div>

            {/*<img
                src={notificationOn ? icons.notificationOn : icons.notification}
                className="w-4 h-4 flex items-center justify-center ml-4 top-0 cursor-pointer"
                alt='Notification Icon'
                onClick={handleToggleNotification}
            />*/}
        </WrapperComponent>
    );
}


const stockTickerTemplate = (data, index) => {

    return (
        <div className="flex items-center gap-4 ml-3" key={index}>
            <div className="image-container">
                <img className="Ellipse w-14 h-14 rounded-full object-cover" src={data.image} alt="img" />
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="Company text-neutral-800 text-sm font-semibold">{data.name}</span>
                <span className="Code text-neutral-500 text-sm font-semibold">{data.code}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 w-20">
                <span className="text-right text-neutral-800 text-sm font-semibold">{data.price}</span>
                <div className="flex items-center gap-2">
                    <span className="text-right text-green text-sm font-semibold">{data.change}</span>
                </div>
            </div>
        </div>
    )
}

const cryptoTickerTemplate = (data, index) => {

    return (
        <div className="flex items-center gap-4 ml-3" key={index}>
            <img className="Shape w-10 h-10 object-cover" src={data.image} alt="img" />
            <div className="flex flex-col gap-1.5">
                <span className="Bitcoin text-neutral-800 text-sm font-semibold">{data.name}</span>
                <span className="Btc text-neutral-500 text-sm font-semibold">{data.code}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 w-20">
                <span className="4207105 text-right text-neutral-800 text-sm font-semibold">{data.price}</span>
                <div className="flex items-center gap-2">
                    <span className="00 text-right text-green text-sm font-semibold">{data.change}</span>
                </div>
            </div>
        </div>
    )
}