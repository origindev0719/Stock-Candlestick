import { useEffect, useState } from "react";
import { icons } from "../../../assets";
import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { getTeam, getTeamPlayers, getTeamSchedule, getTeamStats } from "../../../redux/actions/SportsActions";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/LoadingComponent";
import { TeamStats } from "./TeamStatsComponent";
import { Roster } from "./RosterComponent";
import { PastResults } from "./PastResultsComponent";
import { Schedule } from "./ScheduleComponent";

export const TeamView = () => {
  const { id: teamId } = useParams();
  const location = useLocation();
  const sportData = location.state?.sportData;
  const [selectedTab, setSelectedTab] = useState('Team Stats');

  const dispatch = useDispatch()

  useEffect(() => {
    if (teamId) {
      dispatch(getTeam(teamId))
    }
  }, [dispatch, teamId]);

  const getTeamState = useSelector(state => state.getTeam);
  const { team } = getTeamState;

  useEffect(() => {
    if (team && team.length > 0 && teamId) {
      dispatch(getTeamStats(team[0]?.sport, team[0]?.league, team[0]?.team_name))
      dispatch(getTeamPlayers(team[0]?.sport, team[0]?.league, teamId))
    }
  }, [dispatch, team, teamId]);

  useEffect(() => {
    if (teamId && team && team.length > 0) {
      dispatch(getTeamSchedule(team[0]?.sport, team[0]?.league, team[0]?.team_name));
    }
  }, [dispatch, team, teamId]);

  const getTeamStatsState = useSelector(state => state.getTeamStats);
  const { stats } = getTeamStatsState;
  const getTeamPlayersState = useSelector(state => state.getTeamPlayers);
  const { players } = getTeamPlayersState;
  const getTeamScheduleState = useSelector(state => state.getTeamSchedule);
  const { schedules } = getTeamScheduleState;

  const renderContent = () => {
    switch (selectedTab) {
      case 'Team Stats':
        return <TeamStats stats={stats} team={team} bgColor={team[0].dominantColor} />;
      //case 'Roster':
      //  return <Roster players={players} />;
      case 'Past Results':
        return <PastResults stats={stats} team={team} bgColor={team[0].dominantColor} />;
      case 'Schedule':
        return <Schedule schedules={schedules} team={team} bgColor={team[0].dominantColor} />;
      case 'Player stats':
        return <Roster players={players} bgColor={team[0].dominantColor} />;
      default:
        return null;
    }
  };

  const getFormattedRecord = (team) => {
    // Safely access nested properties with optional chaining
    const winLossAllGames = team?.records?.['Win/Loss']?.['Regular Season Games'];
    // Use nullish coalescing to provide a default value in case of undefined
    const wins = winLossAllGames?.wins ?? '';
    const losses = winLossAllGames?.losses ?? '';
    return `${wins} - ${losses}`;
  };
  

  const token = window.localStorage.getItem("userInfo");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!team || team.length === 0) {
    return (
      <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
        <Loading />
      </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-neutral-50 flex overflow-hidden">
      <Sidebar />
      {stats && stats.length > 0 ? (
        <div className="flex flex-col h-full w-full overflow-y-auto">
          <Navbar title='Sports' />
          <div className="flex flex-col justify-around items-center flex-1">
            <div className="flex flex-col w-5/6">
              <div className="flex w-full h-96 bg-sky-950 rounded-2xl p-4" style={{backgroundColor: team[0].dominantColor}}>

                <div className="flex flex-col w-1/3 items-start gap-6">
                  <p className="w-full px-3 py-6 text-xl font-bold text-white font-Manrope leading-tight">
                    {team[0].team_name}
                  </p>
                </div>

                <div className="flex flex-col w-1/3 items-center gap-6 py-10">
                  <div className="w-48 h-48">
                    <img className="w-full h-full" src={team[0].logo} alt="Placeholder" />
                  </div>
                  <p className="p-3.5 text-xl font-normal text-white font-Manrope leading-tight">
                  {team && team.length > 0 ? getFormattedRecord(team[0]) : 'Loading...'} • {stats[0].season_type}
                  </p>
                </div>

                <div className="relative w-1/3">
                  <button className="absolute top-0 right-0 p-2">
                    <img className="text-white" src={icons.star} alt="img" />
                  </button>
                </div>
              </div>
            </div>
            <div className="Content flex flex-col flex-1 w-5/6">
              <div className="flex flex-col bg-white rounded-xl backdrop-blur-2xl">
                <div className="flex p-4">
                  <div className="ContentHeader w-full flex flex-col bg-white rounded-xl backdrop-blur-2xl">
                    <div className="flex lg:flex-row flex-col p-4">
                      <div className="flex gap-5 items-center">
                        <img className="w-20 h-20" src={team[0].logo} alt="Placeholder" />
                        <div className="flex flex-col justify-start">
                          <div className="flex flex-row justify-between">
                            <p className="text-lg font-bold underline">{team[0].team_name}</p>
                            <p className="text-base text-slate-600 ml-3">{stats[0].season_type} ({team && team.length > 0 ? getFormattedRecord(team[0]) : 'Loading...'})</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:ml-auto justify-center p-4">
                        <button className="p-2 bg-white rounded-full border-2 border-sky-700 flex items-center">
                          <img src={icons.play} alt="img" />
                          <p className="text-lg">Live Game</p>
                        </button>
                      </div>
                    </div>
                    <div className="flex p-4 gap-4">
                      <button
                        className={`p-1.5 cursor-pointer ${selectedTab === 'Team Stats' ? 'text-black font-bold underline' : 'text-slate-500'}`}
                        onClick={() => setSelectedTab('Team Stats')}
                      >
                        Team Stats
                      </button>
                      <button
                        className={`p-1.5 cursor-pointer ${selectedTab === 'Past Results' ? 'text-black font-bold underline' : 'text-slate-500'}`}
                        onClick={() => setSelectedTab('Past Results')}
                      >
                        Past Results
                      </button>
                      <button
                        className={`p-1.5 cursor-pointer ${selectedTab === 'Schedule' ? 'text-black font-bold underline' : 'text-slate-500'}`}
                        onClick={() => setSelectedTab('Schedule')}
                      >
                        Schedule
                      </button>
                      <button
                        className={`p-1.5 cursor-pointer ${selectedTab === 'Player stats' ? 'text-black font-bold underline' : 'text-slate-500'}`}
                        onClick={() => setSelectedTab('Player stats')}
                      >
                        Player stats
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white backdrop-blur-2xl overflow-hidden mx-6">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
          <Loading />
        </div>
      )}
    </div>
  )
}