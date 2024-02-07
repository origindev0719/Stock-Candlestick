import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { calculateComboStats } from '../utils/sportStats/playerStats';

export const PlayerStatsCharts = ({ data, selectedButton, titleChartOne, line }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Extract player results from the player prop
  const playerResultsWithScores = data.playerResultsWithScores;

  const extractDataForButton = (button) => {
    // Sort all games by date in descending order (most recent first)
  const sortedGames = playerResultsWithScores.sort((a, b) => 
  new Date(b?.gameScore?.start_date) - new Date(a?.gameScore?.start_date)
);

// Filter or slice the data according to the button selected
let filteredData;
switch (button) {
  case '2023':
    filteredData = sortedGames.filter(game => new Date(game?.gameScore?.start_date).getFullYear() === 2023);
    break;
  case 'L10':
    filteredData = sortedGames.slice(0, 10); // Get the first 10 elements after sorting
    break;
  case 'L5':
    filteredData = sortedGames.slice(0, 5); // Get the first 5 elements after sorting
    break;
  case 'L20':
    filteredData = sortedGames.slice(0, 20); // Get the first 20 elements after sorting
    break;
  case 'All':
    filteredData = sortedGames; // All games already sorted
    break;
  default:
    filteredData = sortedGames; // Default to sorted all games if no case matches
    break;
}

    // Sort the data by game date in ascending order
    return filteredData.sort((a, b) => 
      new Date(a?.gameScore?.start_date) - new Date(b?.gameScore?.start_date)
    );
}

  // Extract the relevant data
  const relevantData = extractDataForButton(selectedButton);

  // Extract labels from the relevant data
  const gameLabels = relevantData.map(game => {
    const opponentAbb = game?.gameScore?.away_team_abb === data?.teamDetails[0]?.team_abbreviation ?
      game?.gameScore?.home_team_abb :
      game?.gameScore?.away_team_abb;
    const gameDate = new Date(game?.gameScore?.start_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    return `${opponentAbb} ${gameDate}`;
  });

  const labelsMap = {
    '2023': gameLabels,
    'L10': gameLabels,
    'L5': gameLabels,
    'L20': gameLabels,
    // ... add other cases if needed
    'All': playerResultsWithScores.map(game => {
      const opponentAbb = game?.gameScore?.away_team_abb === data?.teamDetails[0]?.team_abbreviation ?
        game?.gameScore?.home_team_abb :
        game?.gameScore?.away_team_abb;
      const gameDate = new Date(game?.gameScore?.start_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      return `${opponentAbb} ${gameDate}`;
    })
  };

  useEffect(() => {
    Chart.register(...registerables, annotationPlugin);
  
    const ctx = chartRef.current.getContext('2d');
  
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    let chartData;
    if (titleChartOne?.display.includes('+')) {
      // Calculate combo stat
      chartData = calculateComboStats(relevantData, titleChartOne?.gameStat);
    } else {
      // Use single stat
      chartData = relevantData.map(d => d[titleChartOne?.gameStat]);
    }
  
    const chartOptions = {
      type: 'bar',
      data: {
        labels: labelsMap[selectedButton] || [],
        datasets: [
          {
            label: titleChartOne?.display,
            data: chartData,
            backgroundColor: chartData.map(
              d => d >= line ? 'rgba(52, 211, 153, 1)' : 'rgba(248, 113, 113, 1)'
            ),
          }
        ],
      },
      options: {
        elements: {
          bar: {
            borderWidth: 1,
            barPercentage: 0.4,
            categoryPercentage: 0.8,
          }
        }
      }
    };
  
    if (line) {
      chartOptions.options.plugins = {
        annotation: {
          annotations: {
            thresholdLine: {
              type: 'line',
              yMin: line,
              yMax: line,
              borderColor: 'black',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: 'Threshold',
                enabled: true,
                position: 'start',
              }
            }
          }
        }
      };
    }
  
    chartInstanceRef.current = new Chart(ctx, chartOptions);
  }, [data, line, relevantData, selectedButton, titleChartOne]);
  

  return <canvas ref={chartRef} style={{ width: '100%' }} />;
}