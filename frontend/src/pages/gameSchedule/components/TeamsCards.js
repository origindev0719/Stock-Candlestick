import React from 'react';
import { Link } from 'react-router-dom';

const TeamsCards = ({ sportsData, title }) => {
  return (
    <div className="w-full mb-10">
      <div className="text-indigo-950 text-xl font-semibold mb-2">
        {title}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sportsData.map((sport, index) => {
          const cardContent = (
            <>
              <img className="w-auto h-12" src={sport.logo ? sport.logo : 'https://ojasyog.com/wp-content/uploads/2022/02/421-4212617_person-placeholder-image-transparent-hd-png-download.png'} alt={sport.team_name} />
              <span className="mt-2 text-zinc-800 text-xs font-normal leading-tight">
                {sport.team_name}
              </span>
            </>
          );

          return sport.sport === 'mma' ? (
            <div key={index} className="flex flex-col items-center bg-white rounded-xl border border-zinc-400 text-center p-2">
              {cardContent}
            </div>
          ) : (
            <Link
              to={{
                pathname: `/sports/team/${sport.id}`,
                state: { sportData: sport }
              }}
              key={index}
              className="flex flex-col items-center bg-white rounded-xl border border-zinc-400 text-center p-2"
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsCards;
