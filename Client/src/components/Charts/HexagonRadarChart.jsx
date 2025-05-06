'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HexagonRadarChart = ({ height }) => {
   const categories = [
      'Market Cap (Rank 2)',
      'Revenue (Rank 7)',
      'PBR (Rank 23)',
      'PER (Rank 12)',
      'Operating Profit (Rank 2)',
   ];

   const dataValues = [0, 0, 0, 100, 100];

   const chartOptions = {
      chart: {
         type: 'radar',
         toolbar: { show: false },
      },
      xaxis: {
         categories,
         labels: {
            show: true,
            style: {
               colors: '#000',
               fontSize: '10px',
            },
         },
      },
      fill: {
         opacity: 1,
         colors: ['rgb(225, 245, 250)'],
         strokeColors: '#47caeb',
      },
      yaxis: {
         show: false,
      },
      colors: ['red'],
      stroke: {
         width: 2,
         show: true,
         colors: ['#47caeb'],
      },
      markers: {
         size: 4,
         colors: ['#fff'],
         strokeColors: '#47caeb',
      },
      dataLabels: {
         enabled: false,
      },
      plotOptions: {
         radar: {
            polygons: {
               strokeColor: '#47caeb',
               // fill: {
               //    colors: ['#fff', '#000'],
               // },
            },
         },
      },
   };

   const chartSeries = [
      {
         name: 'Skynet Score',
         data: dataValues,
      },
   ];

   return (
      <div className="w-full max-w-md mx-auto">
         <ApexChart
            type="radar"
            options={chartOptions}
            series={chartSeries}
            height={height}
         />
      </div>
   );
};

export default HexagonRadarChart;
