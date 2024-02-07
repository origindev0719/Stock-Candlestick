import { useNavigate } from "react-router-dom";

export const Roster = ({ players, bgColor }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      <table className="w-full border-collapse border-2 border-gray-400">
        <thead className="bg-slate-200" style={{backgroundColor: bgColor}}>
          <tr>
            <th className="font-bold px-2 py-2 border-2 border-gray-400 text-center">Player</th>
            <th className="font-bold px-2 py-2 border-2 border-gray-400 text-center">Number</th>
            <th className="font-bold px-2 py-2 border-2 border-gray-400 text-center">Position</th>
            <th className="font-bold px-2 py-2 border-2 border-gray-400 text-center">Height</th>
            <th className="font-bold px-2 py-2 border-2 border-gray-400 text-center">Weight</th>
            <th className="font-bold px-2 py-2 border-2 border-gray-400 text-center">Age</th>
          </tr>
        </thead>
        <tbody>
          {players && players.length > 0 && players.map((player, index) => (
            <tr 
              key={index} 
              onClick={() => navigate(`/sports/playerInfo/${player.id}`)}
              className={`border-2 border-gray-400 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
              <td className="px-3 py-1 border-2 border-gray-400">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 object-cover" src={player.logo ? player.logo : 'https://ojasyog.com/wp-content/uploads/2022/02/421-4212617_person-placeholder-image-transparent-hd-png-download.png'} alt="img" />
                  <span>{player.player_name}</span>
                </div>
              </td>
              <td className="font-bold text-center border-2 border-gray-400">{player.number}</td>
              <td className="font-bold text-center border-2 border-gray-400">{player.position}</td>
              <td className="font-bold text-center border-2 border-gray-400">
                {Math.floor(player.height / 12)}’ {player.height % 12}”
              </td>
              <td className="font-bold text-center border-2 border-gray-400">{player.weight}</td>
              <td className="font-bold text-center border-2 border-gray-400">{player.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
