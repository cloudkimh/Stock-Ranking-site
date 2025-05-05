'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const HexagonRadarChart = () => {
   const categories = [
      'Code Security',
      '운영',    
      '커뮤니티',     
      '기본',       
      'Governance',
      '마켓',        
   ];

   const dataValues = [0, 0, 0, 0, 100, 100];

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
               colors: '#fff',
               fontSize: '14px',
            },
         },
      },
      fill: {
         opacity: 1,
         colors: ['#FFD700'], // Yellow/Gold
      },
      yaxis: {
         show: false,
      },
      stroke: {
         width: 2,
         colors: ['#FFD700'], // Yellow/Gold
      },
      markers: {
         size: 4,
         colors: ['#fff'],
         strokeColors: '#FFD700',
      },
      dataLabels: {
         enabled: false,
      },
      plotOptions: {
         radar: {
            polygons: {
               strokeColor: '#1e1e1e',
               fill: {
                  colors: ['#698b3f', '#698b3f'],
               },
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
            height={450}
         />
      </div>
   );
};

export default HexagonRadarChart;
