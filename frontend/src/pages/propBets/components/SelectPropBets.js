import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOdds, getTeams } from "../../../redux/actions/SportsActions";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { Navbar } from "../../../components/Navbar";
import PropBetsQuickPicks from "./PropBetsQuickPicks";
import PropBetsTeams from "./PropBetsTeams";
import { OddsTable } from "../../gameSchedule/components/OddsTable";
import { Loading } from "../../../components/LoadingComponent";


export const SelectPropBetsPage = () => {
  const [odds, setOdds] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedLeague, setSelectedLeague] = useState('NFL');
  const dispatch = useDispatch();

  const handleSportSelection = async (sport, league) => {
    setSelectedSport(sport);
    setSelectedLeague(league);

      const teamsData = await dispatch(getTeams(sport, league));
      setTeams(teamsData);
  };

  useEffect(() => {
    const fetchTeamsAndOdds = async () => {
      const oddsData = await dispatch(getOdds(selectedSport, selectedLeague));
      setOdds(oddsData);
    };

    fetchTeamsAndOdds();
  }, [dispatch, selectedSport, selectedLeague]);

  const token = window.localStorage.getItem("userInfo");

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      {odds ? (
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-10 bg-white">
            <Navbar title='Prop Bets' />
          </div>
          <div className="mt-10 ml-10 flex flex-row h-full w-full">
            <div className="flex flex-col w-1/5">
              {
                teams.length > 0 ? <PropBetsTeams sportsData={teams} title={selectedLeague} /> : <PropBetsQuickPicks onSportSelect={handleSportSelection} />
              }
            </div>
            <div className="ml-10 w-3/5">
              {
                odds && odds.length > 0 ? (
                  <OddsTable oddsData={odds} />
                ) : null
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
          <Loading />
        </div>
      )}
    </div>
  );
}
