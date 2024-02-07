import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

export const ThreePointsChart = ({ data, titleChartTwo }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Extract labels from the data
  const labels = data?.playerResultsWithScores.map(game => {
    const opponentAbb = game?.gameScore?.home_team_abb === data?.teamDetails[0]?.team_abbreviation ? game?.gameScore?.away_team_abb : game?.gameScore?.home_team_abb;
    const date = new Date(game?.gameScore?.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${opponentAbb} ${date}`;
  });

  useEffect(() => {
    Chart.register(...registerables, annotationPlugin);

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: titleChartTwo?.display,
            data: data.playerResultsWithScores.map(d => d[titleChartTwo?.value]),
            backgroundColor: 'rgb(184,184,184)',
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
      },
    });
  }, [data, titleChartTwo]);

  return <canvas ref={chartRef} style={{ width: '100%' }} />;
}