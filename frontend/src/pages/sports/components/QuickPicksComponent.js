import React from 'react';
import { Link } from 'react-router-dom';

const QuickPicks = () => {
    const sportsData = [
        {
            league: 'NFL',
            sport: 'football',
            title: 'NFL',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png'
        },
        {
            league: 'NBA',
            sport: 'basketball',
            title: 'NBA',
            imageUrl: 'https://pngimg.com/d/nba_PNG15.png'
        },
        {
            league: 'MLB',
            sport: 'baseball',
            title: 'MLB',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1200px-Major_League_Baseball_logo.svg.png'
        },
        {
            league: 'NHL',
            sport: 'hockey',
            title: 'NHL',
            imageUrl: 'https://logos-world.net/wp-content/uploads/2021/09/NHL-Logo.png'
        },
        /*
            teamId: '73AEB6743EC2',
            league: 'NBA',
            sport: 'basketball',
            title: 'Lakers',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1200px-Los_Angeles_Lakers_logo.svg.png'
    */
        {
            league: 'NCAAF',
            sport: 'football',
            title: 'NCAAF',
            imageUrl: 'https://seeklogo.com/images/N/ncaa-football-logo-36487E0FA2-seeklogo.com.png'
        },
        {
            league: 'NCAAB',
            sport: 'basketball',
            title: 'NCAAB',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/NCAA_logo.svg/2048px-NCAA_logo.svg.png'
        },
        /*
            teamId: '26BB4DC5722F',
            league: 'NBA',
            sport: 'basketball',
            title: 'Miami Heat',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/800px-Miami_Heat_logo.svg.png'
        */
        /*
            sport: 'basketball',
            title: 'Basketball',
            imageUrl: 'https://img.freepik.com/free-vector/basketball-logo-orange-ball_78370-1101.jpg'
        */
        /*
            teamId: '032D4F9C6C55',
            league: 'NFL',
            sport: 'football',
            title: 'New York Jets',
            imageUrl: 'https://cdn.oddsjam.com/team-logos/nfl/new_york_jets.png'
        */
        /*
            sport: 'baseball',
            title: 'Baseball',
            imageUrl: 'https://seeklogo.com/images/B/baseball-logo-8DD18EC9B4-seeklogo.com.png'
        */
        {
            league: 'UFC',
            sport: 'mma',
            title: 'UFC',
            imageUrl: 'https://logowik.com/content/uploads/images/ufc-ultimate-fighting-championship3349.jpg'
        },
        /*
            teamId: '0DBD3AEC9A84',
            league: 'NFL',
            sport: 'football',
            title: 'Denver Broncos',
            imageUrl: 'https://cdn.oddsjam.com/team-logos/nfl/denver_broncos.png'
        */
        /*
            teamId: '121EBAED4535',
            league: 'MLB',
            sport: 'baseball',
            title: 'New York Yankees',
            imageUrl: 'https://cdn.oddsjam.com/team-logos/mlb/new_york_yankees.png'
        */
        /*
            teamId: '23CD4450ABA7',
            league: 'NHL',
            sport: 'hockey',
            title: 'Ottawa Senators',
            imageUrl: 'https://cdn.oddsjam.com/team-logos/nhl/ottawa_senators.png'
        *//*
        {
            teamId: '4F11A5896C24',
            league: 'MLB',
            sport: 'baseball',
            title: 'Houston Astros',
            imageUrl: 'https://cdn.oddsjam.com/team-logos/mlb/houston_astros.png'
        },
        {
            teamId: '3C2AC63F5318',
            league: 'NHL',
            sport: 'hockey',
            title: 'New York Rangers',
            imageUrl: 'https://cdn.oddsjam.com/team-logos/nhl/new_york_rangers.png'
        },
        {
            teamId: '01FBDB1511E0',
            league: 'NCAAF',
            sport: 'football',
            title: 'Memphis',
            imageUrl: 'https://a.espncdn.com/i/teamlogos/ncaa/500/235.png'
        },
        {
            teamId: '048E01CFDFFD',
            league: 'NCAAF',
            sport: 'football',
            title: 'Abilene Christian',
            imageUrl: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2000.png'
        },*/
    ];


    return (
        <div className="w-full p-4">
            <div className="text-indigo-950 text-xl font-semibold mb-2">
                Quick Picks
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-7 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {sportsData.map((sport, index) => (
                    <Link 
                        to={sport.teamId ?
                            `/sports/team/${sport.teamId}` :
                            `/sports/gameSchedule/${sport.sport}?sport=${sport.sport}&league=${sport.league}`
                        }
                        key={index} 
                        className="flex flex-col items-center bg-white rounded-xl border border-zinc-400 text-center p-2"
                    >
                        <img className="w-auto h-12 object-cover" src={sport.imageUrl} alt={sport.title} />
                        <span className="mt-2 text-zinc-800 text-xs font-normal leading-tight">
                            {sport.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickPicks;
