import { Link } from "react-router-dom";

export const Schedule = ({ schedules, team, bgColor }) => {
  // Helper function to transform the bet string
  const transformBetString = (odds) => {
    if (!odds?.odds || (odds?.odds).length === 0) return ''; // Return empty string if odds are undefined, null, or empty
  
    // Find the object with market 'total_points'
    const moneylineBet = odds.odds?.find(bet => bet.market === 'moneyline' && bet.name === team[0].team_name);
  
    if (!moneylineBet) return ''; // Return empty string if no total points bet is found
  
    const points = moneylineBet.price;
    const line = String(moneylineBet.price).charAt(0) === '-' ? 'U' : 'O';
  
    return `${line} ${points}`;
  };

  return (
    <div className="w-full bg-white">
      <table className="w-full border-collapse border-2 border-gray-400">
        <thead className="bg-slate-200" style={{backgroundColor: bgColor}}>
          <tr>
            <th colSpan="4" className="py-2 px-4 font-bold text-lg border-2 border-gray-400 text-start">
              {schedules[0]?.season_type}
            </th>
          </tr>
          <tr>
            <th className="font-bold px-1 py-2 border-2 border-gray-400">Date</th>
            <th className="font-bold px-1 py-2 border-2 border-gray-400">Teams (H-A)</th>
            <th className="font-bold px-1 py-2 border-2 border-gray-400">ATS</th>
            <th className="font-bold px-1 py-2 border-2 border-gray-400">O/U</th>
          </tr>
        </thead>
        <tbody>
          {schedules && schedules.length > 0 && schedules.map((game, index) => (
            <tr key={index} className="border-2 border-gray-400">
              <td className="px-3 py-1 border-2 border-gray-400">
                {new Date(game.start_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td className="px-3 py-1 border-2 border-gray-400">
                <Link to={`/sports/propBets/${game.game_id}`} className="flex items-center justify-around">
                  <div>
                    <img
                      className="w-8 h-8"
                      src={game.home_team_info?.logo || 'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png'}
                      alt="Home Team" />
                    <span className="font-bold underline">{game.home_team_info?.team_abbreviation}</span>
                  </div>
                  <span className="font-bold">VS</span>
                  <div>
                    <img
                      className="w-8 h-8"
                      src={game.away_team_info?.logo || 'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png'}
                      alt="Away Team" />
                    <span className="font-bold underline">{game.away_team_info?.team_abbreviation}</span>
                  </div>
                </Link>
              </td>
              <td className="px-3 py-1 border-2 border-gray-400 font-bold">
                {game.ats}
              </td>
              <td className="px-3 py-1 border-2 border-gray-400 text-black text-lg font-normal leading-relaxed tracking-tight">
                {transformBetString(game.odds)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
