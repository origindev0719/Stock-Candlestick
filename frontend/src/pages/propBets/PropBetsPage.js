import { Navigate, useParams } from "react-router-dom";
import { PropBetsView } from "./PropBetsView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLiveScores, getPlayer, getPropBets } from "../../redux/actions/SportsActions";
import { Loading } from "../../components/LoadingComponent";
import _ from 'lodash';

export const PropBetsPage = () => {
    const { id: gameId } = useParams();
    const [playersData, setPlayersData] = useState([]);
    const [liveGame, setLiveGame] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPlayersLoaded, setTotalPlayersLoaded] = useState(0);
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [homePlayersCount, setHomePlayersCount] = useState(0);
    const [awayPlayersCount, setAwayPlayersCount] = useState(0);
    const [teamSelection, setTeamSelection] = useState('home');
    const [loadMoreClicked, setLoadMoreClicked] = useState(false);

    const dispatch = useDispatch();
    const getPropBetsState = useSelector(state => state.getPropBets);
    const { propBets } = getPropBetsState;

    useEffect(() => {
        if (gameId) {
            dispatch(getPropBets(gameId));
            setPlayersData([]); // Clear players data when gameId changes
            setCurrentPage(1);
        }
    }, [gameId, dispatch]);

    useEffect(() => {
        fetchPlayersData(1);
    }, [propBets, teamSelection, currentPage]);
    
    //useEffect(() => {
    //    if (propBets && propBets.gameScore) {
    //        dispatch(getLiveScores(propBets.gameScore.sport, propBets.gameScore.league, propBets.gameScore.id));
    //    }
    //}, [propBets, dispatch]);

    //useEffect(() => {
        //const checkGameStart = () => {
        //    const currentTime = new Date();
        //    const gameStartTime = new Date(propBets?.gameScore?.start_date);
//
        //    if (gameStartTime && currentTime > gameStartTime) {
        //        console.log(currentTime > gameStartTime)
        //        dispatch(getLiveScores(propBets.gameScore.sport, propBets.gameScore.league, propBets.gameScore.id));
        //        clearInterval(intervalId); // Clear the interval once the game has started
        //    }
        //};
//
        //let intervalId;
        //if (propBets && propBets.gameScore && propBets.gameScore.start_date) {
        //    intervalId = setInterval(checkGameStart, 60000); // Check every minute
        //}
//
        //return () => {
        //    if (intervalId) {
        //        clearInterval(intervalId); // Clear the interval when the component unmounts
        //    }
        //};
    //}, [propBets, dispatch]);

    const showLoadMoreButton = teamSelection === 'home'
        ? homePlayersCount < (propBets?.home_team_players?.length || 0)
        : awayPlayersCount < (propBets?.away_team_players?.length || 0);

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchPlayersData(nextPage); // Load more players when button is clicked
    };

    const fetchPlayersData = async (page) => {
        if (propBets) {
            const playersPerPage = 10;
            const teamPlayers = teamSelection === 'home' ? propBets.home_team_players : propBets.away_team_players;
            const startIndex = (page - 1) * playersPerPage;
            const endIndex = startIndex + playersPerPage;

            // Group odds by player ID
            const oddsByPlayerId = _.groupBy(propBets.gameOdds.odds, 'player_id');

            let activePlayers = teamPlayers.filter(player => player.is_active);
            let playersWithOdds = [];

            for (let player of activePlayers) {
                if (oddsByPlayerId[player.id]) {
                    playersWithOdds.push({
                        ...player,
                        odds: oddsByPlayerId[player.id],
                        oddsCount: oddsByPlayerId[player.id].length
                    });
                }
            }

            playersWithOdds.sort((a, b) => b.oddsCount - a.oddsCount);

            if (playersWithOdds.length > 0) {
                activePlayers = playersWithOdds.concat(activePlayers.filter(player => !oddsByPlayerId[player.id]));
            }

            const playerIds = activePlayers.slice(startIndex, endIndex).map(player => player.id);
            const playersPromises = playerIds.map(playerId => dispatch(getPlayer(playerId, true)));
            const newPlayersData = await Promise.all(playersPromises);

            setPlayersData([...newPlayersData]);
        }
    };

    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        propBets ? (
            <PropBetsView
                data={propBets}
                playersData={playersData}
                liveGame={liveGame}
                totalPlayersLoaded={totalPlayersLoaded}
                setCurrentPage={setCurrentPage}
                setTeamSelection={setTeamSelection}
                showLoadMoreButton={showLoadMoreButton}
                handleLoadMore={handleLoadMore}
            />
        ) : (
            <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
                <Loading />
            </div>
        )
    );
}
