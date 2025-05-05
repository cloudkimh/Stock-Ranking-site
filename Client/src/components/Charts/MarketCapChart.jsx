"use client"; // for Next.js 13+ with app directory

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MarketCapChart = () => {
   const series = [
      {
         data: [
            [new Date("2000-01-01").getTime(), 200],
            [new Date("2010-01-01").getTime(), 118],
            [new Date("2015-01-01").getTime(), 205],
            [new Date("2017-05-31").getTime(), 384],
            [new Date("2020-01-01").getTime(), 100],
            [new Date("2023-01-01").getTime(), 270],
            [new Date("2025-01-01").getTime(), 550],
         ],
      },
   ];

   const options = {
      chart: {
         type: "area",
         height: 550,
         zoom: { enabled: false },
         toolbar: { show: false },
         fontSize: "16px",
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight", width: 1, color: "#FFA500" },
      fill: {
         type: "gradient",
         gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 1,
            gradientToColors: ["#FFA500"],
            inverseColors: false,
            opacityFrom: 0.6,
            opacityTo: 0,
            stops: [0, 100],
         },
         colors: ["#FF8C00"],
      },
      xaxis: {
         type: "datetime",
         labels: {
            style: {
               fontSize: "16px",
               color: "#666666",
               fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            }, 
         },
      },
      yaxis: {
         labels: {
            formatter: (val) => `₹${val.toFixed(0)}T`,
            style: {
               fontSize: "16px",
               color: "#666666",
               fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            },           
         },
      },
      tooltip: {
         x: {
            format: "dd MMM yyyy",
         },
         y: {
            formatter: (val) => `₹${val.toFixed(2)}T`,
         },
         style: {
            fontSize: "14px",
         },
      },
      markers: {
         size: 4,
      },
   };

   return (
      <div className="w-full">
         <Chart options={options} series={series} type="area" height={400} />
      </div>
   );
};

export default MarketCapChart;
