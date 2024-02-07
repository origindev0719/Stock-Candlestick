import { Navigate, useLocation } from "react-router-dom";
import { GameScheduleView } from "./gameScheduleView";
import { useEffect, useState } from "react";
import { getOdds, getTeams, getLeagues } from "../../redux/actions/SportsActions";
import { useDispatch } from 'react-redux';

export const GameSchedulePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sport = queryParams.get('sport');
  const league = queryParams.get('league');
  const [allLeagues, setAllLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [odds, setOdds] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      if (league === 'undefined') {
        const leaguesData = await dispatch(getLeagues(sport));
        setAllLeagues(leaguesData);
      }
    };
    fetchLeagues();
  }, [dispatch, league, sport]);

  useEffect(() => {
    const fetchTeamsAndOdds = async () => {
      if (allLeagues.length > 0) {
        for (let lg of allLeagues) {
          const teamsData = await dispatch(getTeams(sport, lg));
          setTeams(prevTeams => [...prevTeams, ...teamsData]);

          const oddsData = await dispatch(getOdds(sport, lg));
          setOdds(prevOdds => [...prevOdds, ...oddsData]);
        }
      } else if (league !== "undefined") {
        const teamsData = await dispatch(getTeams(sport, league));
        setTeams(teamsData);

        const oddsData = await dispatch(getOdds(sport, league));
        setOdds(oddsData);
      }
    };
    fetchTeamsAndOdds();
  }, [sport, league, dispatch, allLeagues]);

  //const test = odds && odds.length > 0 ? dispatch(getGameOdds(odds[0].id)) : null;

  const token = window.localStorage.getItem("userInfo");

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <GameScheduleView teams={teams} odds={odds} league={league === 'undefined' ? allLeagues.join(', ') : league} />
  );
}
