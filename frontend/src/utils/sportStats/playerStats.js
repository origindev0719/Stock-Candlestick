export const calculateStats = (lastGame, statsMap) => {
  return statsMap.map(statMap => {
    const statValue = lastGame[statMap.stat] || 0; // Get the stat value, default to 0 if undefined
    return {
      ...statMap,      // Spread the existing statMap object to include 'stat' and 'display'
      value: statValue // Add a new key 'value' to hold the stat value
    };
  });
};

export const getLastGameStats = (player, stats) => {
  if (!player?.playerResultsWithScores || !Array.isArray(player.playerResultsWithScores)) {
    return null;
  }

  // Filter games that are completed
  const completedGames = player.playerResultsWithScores.filter(game => game.status === 'completed');

  // Sort the completed games by start_date in descending order
  const sortedCompletedGames = completedGames.sort((a, b) => {
    const dateA = new Date(a?.gameScore?.start_date);
    const dateB = new Date(b?.gameScore?.start_date);
    return dateB - dateA; // Sorts in descending order
  });

  // The first game in the sorted array is the most recent completed game
  const lastGame = sortedCompletedGames[0];
  return lastGame ? calculateStats(lastGame, stats) : null;
};

export const getAwayStats = (player, statsMap) => {
  if (!player?.playerResultsWithScores || !Array.isArray(player.playerResultsWithScores)) {
    return null;
  }
  // Filter games that are completed and where the player's team was the away team
  const awayGames = player?.playerResultsWithScores.filter(game => 
    game.status === 'completed' && game.gameScore.away_team === player?.playerDetails[0].team_name
  );

  // Sort the away games by start_date in descending order
  const sortedAwayGames = awayGames.sort((a, b) => {
    const dateA = new Date(a?.gameScore?.start_date);
    const dateB = new Date(b?.gameScore?.start_date);
    return dateB - dateA; // Sorts in descending order
  });

  // The first game in the sorted array is the most recent completed away game
  const lastAwayGame = sortedAwayGames[0];
  return lastAwayGame ? calculateStats(lastAwayGame, statsMap) : null;
};

export const filterGames = (player, button) => {
  const currentYear = new Date().getFullYear();
  switch (button) {
    case '2023':
      return player.playerResultsWithScores.filter(game => {
        const gameYear = new Date(game?.gameScore?.start_date).getFullYear();
        return gameYear === currentYear || gameYear === currentYear + 1;
      });
    case 'L10':
      return player.playerResultsWithScores.slice(0, 10);
    case 'L5':
      return player.playerResultsWithScores.slice(0, 5);
    case 'L20':
      return player.playerResultsWithScores.slice(0, 20);
    case 'All':
    case 'vs':
    default:
      return player.playerResultsWithScores;
  }
}

export const calculatePlayerStat = (player, button, stat) => {
  let filteredGames = filterGames(player, button);
  if (filteredGames.length === 0) return 0;

  const totalStat = filteredGames.reduce((acc, game) => {
    const statValue = (typeof game[stat] === 'number') ? game[stat] : 0;
    return acc + statValue;
  }, 0);

  return (totalStat / filteredGames.length).toFixed(1);
}

export const calculateStat = (playerResultsWithScores, specificStat, selectedButton, option, line) => {
  let filteredResults = [];

  switch (option) {
    case '2023':
      // Filter results for the year 2023
      filteredResults = playerResultsWithScores?.filter(result => new Date(result?.gameScore?.start_date).getFullYear() === 2023);
      break;
    case 'L10':
      // Get the last 10 results
      filteredResults = playerResultsWithScores?.slice(-10);
      break;
    case 'L5':
      // Get the last 5 results
      filteredResults = playerResultsWithScores?.slice(-5);
      break;
    case 'L20':
      // Get the last 20 results
      filteredResults = playerResultsWithScores?.slice(-20);
      break;
    case 'ALL':
      // Use all results
      filteredResults = playerResultsWithScores;
      break;
    default:
      break;
  }

 // Check if specificStat is a combo stat
 if (selectedButton?.includes('+') || specificStat?.includes('touchdowns')) {
  // Use calculateComboStats for combo stats
  const comboStats = calculateComboStats(filteredResults, specificStat);
  return comboStats.reduce((acc, val) => acc + val, 0);
} else {
  // Count the number of times the specific stat was above the line
  const aboveLineCount = filteredResults.reduce((acc, result) => acc + (result[specificStat] > line ? 1 : 0), 0);
  // Count the number of times the specific stat was below or equal to the line
  const belowOrEqualLineCount = filteredResults.length - aboveLineCount;

  if (belowOrEqualLineCount === 0) {
    // If the specific stat was always above the line, return 100% to indicate certainty
    return '100%';
  } else {
    // Calculate the odds
    const odds = aboveLineCount / belowOrEqualLineCount;
    // Convert odds to probability
    const probability = odds / (odds + 1);
    // Convert probability to percentage
    const percentage = probability * 100;

    // Format the percentage string
    return (percentage % 1 === 0 ? percentage.toString() : percentage.toFixed(2)) + '%';
  }
}
}

const statMapping = {
  football: {
    player_passing_yards: "Pass Yards", 
    player_receiving_yards: "Receiving Yards", 
    player_rushing_yards: "Rush Yards", 
    player_passing_rushing_receiving_touchdowns: "Pass+Rush+Rec TDs", 
    player_field_goals_made: "FG Made", 
    player_passing_touchdowns: "Pass TDs", 
    player_rushing_receiving_yards: "Rush+Rec Yards", 
    player_receptions: "Receptions", 
    player_passing_attempts: "Pass Attempts", 
    player_sacks: "Sacks", 
    player_passing_completions: "Pass Completions", 
    player_interceptions: "Int", 
    player_passing_rushing: "Pass+Rush Yards", 
    player_rushing_attempts: "Rush Attempts", 
    player_kicking_points: "Kicking Points", 
    player_tackles_assists: "Tackles+Ast", 
  },
  basketball: {
    player_points: "Points", 
    player_total_rebounds: "Rebounds", 
    player_assists: "Assists", 
    player_points_rebounds_assists: "Pts+Reb+Asts", 
    player_fantasy_score: "Fantasy Score", 
    player_points_rebounds: "Pts+Reb",
    player_points_assists: "Pts+Asts",
    player_made_threes: "3-PT Made",
    player_blocks: "Blocked Shots", 
    player_fouls: "Fouls", 
    player_total_rebounds_assists: "Rebs+Asts",
    player_blocks_steals: "Blks+Stls",
    player_turnovers: "Turnovers",
    player_steals: "Steals",    
  },
  baseball: {
    player_strikeouts: "Strikeouts",
    player_earned_runs: "Earned Runs",
    player_hits: "Hits",
    player_walks: "Walks",
    player_innings_pitched: "IP",
    player_home_runs: "Runs",
  },
  hockey: {
    player_time_on_ice: 'Time On Ice', 
    player_goals: "Points", 
    player_shots_on_goal: "Shots On Goal",
    player_assists: "Assists", 
    player_hits: "Hits",  
  },
};

// Function to transform keys
const transformKey = (key, value) => {
  if (value.includes('+') && key.startsWith('player_')) {
    // Special handling for 'touchdowns' and 'yards'
    const specialWords = ['touchdowns', 'yards'];
    let parts = key.substring(7).split('_');
    let transformedParts = [];

    for (let i = 0; i < parts.length; i++) {
      transformedParts.push(parts[i]);
      // Add '+' if the next part is not a special word and the current part is not a special word
      if (i < parts.length - 1 && !specialWords.includes(parts[i + 1]) && !specialWords.includes(parts[i])) {
        transformedParts.push('+');
      }
    }

    return 'player_' + transformedParts.join('_');
  }
  return key;
};

export const formatPlayerStats = (player) => {
  const sportStats = statMapping[player.sport];
  const gameStatsMap = sportsStatToOddsMap[player.sport];
  let formattedStats = [];

  for (const [key, value] of Object.entries(sportStats)) {
    // Transform the key if the value contains '+'
    const transformedKey = transformKey(key, value);

    // Find the corresponding game stat key in the gameStatsMap
    const gameStatKey = Object.keys(gameStatsMap).find(gameKey => gameStatsMap[gameKey] === value);

    formattedStats.push({
      value: transformedKey, // Use the transformed key as the value
      stat: value,
      gameStat: gameStatKey || '' // Set the corresponding game stat key or an empty string if not found
    });
  }

  return formattedStats;
}

export const formatPlayerAbbStats = (player) => {
  // Retrieve the abbreviation map for the player's sport
  const abbrevMap = sportsStatToAbbrevMap[player.sport];
  let formattedAbbrevStats = [];

  // Loop through the abbreviation map and create an array of formatted stats
  for (const [statKey, abbrev] of Object.entries(abbrevMap)) {
    formattedAbbrevStats.push({
      stat: statKey,       // Original stat key
      display: abbrev      // Abbreviation for the stat
    });
  }

  return formattedAbbrevStats;
};


export const getTopStatsForPosition = (sport, position, stats) => {
  if (sport === "football") {
    switch (position) {
      case "QB":
        return ['stat_passing_yards', 'stat_passing_touchdowns', 'stat_passing_qb_rating', 'stat_passing_sacks'];
      case "S":
        return ['stat_interceptions', 'stat_tackles', 'stat_defensive_passes_defended', 'stat_defensive_qb_hits'];
      case "G":
      case "OT":
      case "C":
        return ['stat_fumbles_recovered', 'stat_touchbacks', 'stat_rushing_yards_per_rush_attempt', 'stat_fumbles'];
      case "WR":
        return ['stat_receptions', 'stat_receiving_yards', 'stat_receiving_touchdowns', 'stat_receiving_targets'];
      case "DT":
      case "DE":
        return ['stat_tackles', 'stat_sacks', 'stat_defensive_tackles_for_loss', 'stat_defensive_qb_hits'];
      case "CB":
        return ['stat_interceptions', 'stat_tackles', 'stat_defensive_passes_defended', 'stat_fumbles_recovered'];
      case "RB":
        return ['stat_rushing_yards', 'stat_rushing_touchdowns', 'stat_receptions', 'stat_fumbles'];
      case "LB":
        return ['stat_tackles', 'stat_sacks', 'stat_interceptions', 'stat_defensive_passes_defended'];
      case "TE":
        return ['stat_receptions', 'stat_receiving_yards', 'stat_receiving_touchdowns', 'stat_fumbles'];
      default:
        return [];
    }
  } else if (sport === "basketball") {
    switch (position) {
      case "C":
        return ['stat_points', 'stat_total_rebounds', 'stat_blocks', 'stat_field_goals_attempted'];
      case "SF":
      case "F":
        return ['stat_points', 'stat_assists', 'stat_total_rebounds', 'stat_steals'];
      case "G":
      case "SG":
      case "PG":
        return ['stat_points', 'stat_assists', 'stat_steals', 'stat_three_point_field_goals_made'];
      case "PF":
        return ['stat_points', 'stat_total_rebounds', 'stat_field_goals_made', 'stat_blocks'];
      default:
        return [];
    }
  } else if (sport === "baseball") {
    switch (position) {
      case "P":
        return ['stat_strikeouts', 'stat_earned_runs', 'stat_innings_pitched', 'stat_walks_allowed'];
      case "3B":
      case "SS":
      case "2B":
        return ['stat_hits_allowed', 'stat_walks_allowed', 'stat_home_runs_allowed', 'stat_strikeouts'];
      case "C":
        return ['stat_hits_allowed', 'stat_earned_runs', 'stat_strikeouts', 'stat_walks_allowed'];
      case "DH":
        return ['stat_hits_allowed', 'stat_home_runs_allowed', 'stat_walks_allowed', 'stat_strikeouts'];
      case "CF":
      case "LF":
      case "RF":
        return ['stat_hits_allowed', 'stat_earned_runs', 'stat_strikeouts', 'stat_walks_allowed'];
      default:
        return [];
    }
  } else if (sport === "hockey") {
    switch (position) {
      case "C":
        return ['stat_shifts', 'stat_goals', 'stat_assists', 'stat_faceoff_percent', 'stat_hits'];
      case "LW":
      case "RW":
        return ['stat_goals', 'stat_assists', 'stat_shots_on_goal', 'stat_hits'];
      case "D":
        return ['stat_blocked_shots', 'stat_takeaways', 'stat_giveaways', 'stat_hits'];
      case "G":
        return ['stat_goals', 'stat_assists', 'stat_penalties', 'stat_hits'];
      default:
        return [];
    }
  }
  return [];
}

export function findNewestOdds(stat, player_odds, sport) {
  // Filter the odds to only include those with the correct market
  const relevantOdds = player_odds.filter(odds => odds.market === stat && odds.is_main);

  // If there are no relevant odds, return null
  if (relevantOdds.length === 0) {
    return null;
  }

  // Find the odds object with the latest timestamp
  const newestOdd = relevantOdds.reduce((latest, odds) =>
    new Date(latest.timestamp) > new Date(odds.timestamp) ? latest : odds, relevantOdds[0]
  );

  // Find the corresponding 'over' or 'under' odd with the same bet_points as the newest odd
  const oppositeLine = newestOdd.selection_line === 'over' ? 'under' : 'over';
  const correspondingOdd = relevantOdds.find(odds =>
    odds.bet_points === newestOdd.bet_points && odds.selection_line === oppositeLine
  );

  // Return both the newest odd and the corresponding odd
  return [newestOdd, correspondingOdd].filter(Boolean); // filter out any undefined or null values
}

export const calculateComboStats = (data, comboStatKey) => {
  // Split the comboStatKey into individual stats
  const stats = comboStatKey.split('_').filter(part => !['stat', 'plus'].includes(part));

  // Adjust the individual stats for special words
  const adjustedStats = stats.flatMap(stat => {
      if (['touchdowns', 'yards'].includes(stat)) {
          // If the stat is a special word, append it to each previous stat in the array
          return stats.slice(0, -1).map(prevStat => `${prevStat}_${stat}`);
      } else {
          // If it's not a special word, return the stat as is
          return [stat];
      }
  });


  // Calculate the sum for each stat and add it to the corresponding game sum
  return data.map(gameData => {
      return adjustedStats.reduce((sum, stat) => {
          const fullStatKey = `stat_${stat}`;
          return sum + (gameData[fullStatKey] || 0);
      }, 0);
  });
};

const sportsStatToOddsMap = {
  basketball: {
    stat_points: 'Points',
    stat_assists: 'Assists',
    stat_blocks: 'Blocked Shots',
    stat_steals: 'Steals',
    stat_turnovers: 'Turnovers',
    stat_total_rebounds: 'Rebounds',
    stat_three_point_field_goals_made: '3-PT Made',
    stat_points_rebounds_assists: "Pts+Reb+Asts",
    stat_fantasy_score: "Fantasy Score", 
    stat_points_rebounds: "Pts+Reb",
    stat_points_assists: "Pts+Asts",
    stat_fouls: "Fouls",
    stat_total_rebounds_assists: "Rebs+Asts",
    stat_blocks_steals: "Blks+Stls",
  },
  football: {
    stat_punts: "Punts",
    stat_assists: 'Assists',
    stat_passing_yards: 'Pass Yards',
    stat_rushing_yards: 'Rush Yards',
    stat_rush_receiving_touchdowns: "Rush+Rec TDs", 
    stat_receiving_yards: 'Receiving Yards',
    stat_passing_touchdowns: 'Pass TDs',
    stat_rushing_touchdowns: 'Rush TDs',
    stat_receiving_touchdowns: 'Receiving TDs',
    stat_interceptions: 'Int',
    stat_fumbles_recovered: 'Fumbles Recovered',
    stat_sacks: 'Sacks',
    stat_tackles_assists: 'Tackles+Ast',
    stat_defensive_touchdowns: 'Defensive TDs',
    stat_passing_attempts: 'Pass Attempts',
    stat_passing_completions: 'Pass Completions',
    stat_rushing_attempts: 'Rush Attempts',
    stat_kicking_points: 'Kicking Points',
    stat_passing_rushing_yards: "Pass+Rush Yards",
    stat_passing_rushing_receiving_touchdowns: "Pass+Rush+Rec TDs",
    stat_rushing_receiving_yards: "Rush+Rec Yards", 
    stat_receptions: "Receptions",
    stat_field_goals_made: "FG Made",
  },
  baseball: {
    stat_strikeouts: 'Strikeouts',
    stat_earned_runs: 'Earned Runs',
    stat_hits: 'Hits',
    stat_walks: 'Walks',
    stat_innings_pitched: 'Innings Pitched',
    stat_home_runs: 'Home Runs',
    // Add more mappings as needed
  },
  hockey: {
    stat_hits: 'Hits',
    stat_goals: 'Points',
    stat_assists: 'Assists',
    stat_blocked_shots: 'Blocked Shots',
    stat_shots_on_goal: 'Shots On Goal',
    // Additional mappings can be added as needed
  }
};

const sportsStatToAbbrevMap = {
  basketball: {
    stat_points: 'PTS',
    stat_assists: 'AST',
    stat_blocks: 'BLK',
    stat_steals: 'STL',
    stat_turnovers: 'TO',
    stat_total_rebounds: 'TRB',
    stat_three_point_field_goals_made: '3PM',
    stat_fouls: 'F',
  },
  football: {
    stat_punts: "PNT",
    stat_assists: 'AST',
    stat_passing_yards: 'PYD',
    stat_rushing_yards: 'RYD',
    stat_receiving_yards: 'REY',
    stat_passing_touchdowns: 'PTD',
    stat_rushing_touchdowns: 'RTD',
    stat_receiving_touchdowns: 'RETD',
    stat_interceptions: 'INT',
    stat_fumbles_recovered: 'FR',
    stat_sacks: 'SK',
    stat_tackles_assists: 'TKL',
    stat_defensive_touchdowns: 'DT',
    stat_passing_attempts: 'PAT',
    stat_passing_completions: 'PC',
    stat_rushing_attempts: 'RA',
    stat_kicking_points: 'KP',
    stat_receptions: "REC",
    stat_field_goals_made: "FGM",
  },
  baseball: {
    stat_strikeouts: 'SO',
    stat_earned_runs: 'ER',
    stat_hits: 'H',
    stat_walks: 'BB',
    stat_innings_pitched: 'IP',
    stat_home_runs: 'HR',
  },
  hockey: {
    stat_hits: 'HIT',
    stat_goals: 'G',
    stat_assists: 'A',
    stat_blocked_shots: 'BS',
    stat_shots_on_goal: 'SOG',
  }
};
