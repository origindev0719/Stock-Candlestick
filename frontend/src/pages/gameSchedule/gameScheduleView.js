import { BottomBar } from "../../components/BottomBar";
import { Loading } from "../../components/LoadingComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { OddsTable } from "./components/OddsTable";
import TeamsCards from "./components/TeamsCards";

export const GameScheduleView = ({ teams, odds, league }) => {

  // Define the teams for each conference
  const EASTERN_CONFERENCE_TEAMS = [
    "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets",
    "Chicago Bulls", "Cleveland Cavaliers", "Detroit Pistons", "Indiana Pacers",
    "Miami Heat", "Milwaukee Bucks", "New York Knicks", "Orlando Magic",
    "Philadelphia 76ers", "Toronto Raptors", "Washington Wizards"
  ];

  const WESTERN_CONFERENCE_TEAMS = [
    "Dallas Mavericks", "Denver Nuggets", "Golden State Warriors", "Houston Rockets",
    "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Minnesota Timberwolves",
    "New Orleans Pelicans", "Oklahoma City Thunder", "Phoenix Suns", "Portland Trail Blazers",
    "Sacramento Kings", "San Antonio Spurs", "Utah Jazz"
  ];

  // Filter the teams data based on the conference arrays
  const easternTeams = league === 'NBA' ? teams?.filter(team => EASTERN_CONFERENCE_TEAMS.includes(team.team_name)) : null;
  const westernTeams = league === 'NBA' ? teams?.filter(team => WESTERN_CONFERENCE_TEAMS.includes(team.team_name)) : null;

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      {teams && teams.length > 0 ? (
        <div className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-10 bg-white">
            <Navbar title={league} />
          </div>
          <div className="mt-10 ml-5 md:ml-10 flex flex-col md:flex-row h-full w-full">
            <div className="flex flex-row md:flex-col w-11/12 md:w-1/5 gap-3">
              {
                league === 'NBA' ? (
                  <>
                    <TeamsCards sportsData={easternTeams} title="Eastern Conference" />
                    <TeamsCards sportsData={westernTeams} title="Western Conference" />
                  </>
                ) : (
                  <TeamsCards sportsData={teams} title={league} />
                )
              }
            </div>
            <div className="md:ml-10 w-11/12 md:w-4/6">
              {
                odds && odds.length > 0 ? (
                  <OddsTable oddsData={odds} />
                ) : (
                  <div className="content h-full w-full flex items-center justify-center bg-white animate-bg">
                    <Loading />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
          <Loading />
        </div>
      )}
      <BottomBar />
    </div>
  )
}