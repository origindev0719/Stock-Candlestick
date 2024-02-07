  // Extracts odds based on the team name.
  const getTeamOdds = (odds, teamName) => {
    return odds?.filter(o => {
      if (o.selection === ('Yes' || 'No' || '')) {
        return o
      } else {
        return o.selection === teamName
      }
    });
  };

  // Extracts the moneyline for a given team.
  export const getMoneylineForTeam = (odds, teamName) => {
    const teamOdds = getTeamOdds(odds, teamName);
    return teamOdds?.find(o => o.market === "moneyline" && o.is_main);
  };

  export const getSpreadOrTotalGoalsForTeam = (odds, homeTeam, awayTeam, sport) => {
    const marketType = sport === 'hockey' ? 'puck_line' : 'point_spread';

    const homeTeamOdds = getTeamOdds(odds, homeTeam).filter(o => o.market === marketType && o.is_main)
    const awayTeamOdds = getTeamOdds(odds, awayTeam).filter(o => o.market === marketType && o.is_main)

    // Find matching selection_points with one positive and one negative
    for (let homeOdds of homeTeamOdds) {
        for (let awayOdds of awayTeamOdds) {
            if (Math.abs(homeOdds.selection_points) === Math.abs(awayOdds.selection_points) &&
                ((homeOdds.selection_points < 0 && awayOdds.selection_points > 0) || 
                (homeOdds.selection_points > 0 && awayOdds.selection_points < 0))) {
                return { homeOdds, awayOdds };
            }
        }
    }

    return null;
};
  
// Extracts the total points or team total for a given team.
export const getTotalForTeam = (odds, selectionLine) => {
  // First, try to find the total_points market
  let total = odds.find(o => o.market === "total_points" && o.is_main && o.selection_line === selectionLine);
  
  // If the total_points market is not found, try to find the total_goals market
  if (!total) {
    total = odds.find(o => o.market === "total_goals" && o.is_main && o.selection_line === selectionLine);
  }
  
  // Return the found market or null if neither are found
  return total;
};


  export const getTotalRounds = (odds) => {
    return odds.find(o => o.selection === '' && o.market === "total_rounds" && o.is_main);
  }

  export const findOppositeCorrespondingOdds = (playerOdds, mainOdd) => {
    // If mainOdd does not have selection_line, return empty values
    if (!mainOdd.selection_line) {
      return {
        under: '',
        over: ''
      };
    }

    // Determine the opposite line type
    const oppositeLine = mainOdd.selection_line === 'over' ? 'under' : 'over';

    // Find the corresponding odd with the opposite line type
    const correspondingOdd = playerOdds.find(odd =>
      odd.market_name === mainOdd.market_name &&
      odd.selection_points === mainOdd.selection_points &&
      odd.selection_line === oppositeLine
    );

    // Set the under and over values
    return {
      under: mainOdd.selection_line === 'under' ? mainOdd.price : (correspondingOdd?.price || ''),
      over: mainOdd.selection_line === 'over' ? mainOdd.price : (correspondingOdd?.price || '')
    };
  };