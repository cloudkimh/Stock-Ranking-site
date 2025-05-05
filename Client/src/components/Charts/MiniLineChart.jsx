'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MiniLineChart = ({ data = [], color = '#00E396', height = 50 }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    tooltip: {
      enabled: false,
    },
    colors: [color],
  };

  const series = [
    {
      data,
    },
  ];

  return (
    <div className="w-full">
      <ApexChart options={chartOptions} series={series} type="line" height={height} width="100%" />
    </div>
  );
};

export default MiniLineChart;
