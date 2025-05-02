'use client'
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import './stocklisting.css';
import stock1 from '../../../public/assets/icons/stockicon.webp';
import StockRow from './StockRow';
import StockSearch from '../StockSearchBox/StockSearch';

const StockListing = () => {
   const initialStockData = [
      {
         image: stock1,
         name: 'Inco Network',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'BMW',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'Apple',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'PUMA',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'Mircrosoft',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'Spacex',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'TATA',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'UNO',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
      {
         image: stock1,
         name: 'Youtube',
         currentPrice: '$5,000,000',
         marketCap: 'N/A',
         profitMargin: 25.55,
         operatingProfit: '$5,000',
         netProfit: '$8,000',
         per: 20,
         pbr: 29,
         tradingVolume: '36,000',
      },
   ];

   const [stockData, setStockData] = useState(initialStockData);

   const handleSearch = (query) => {
      if (query.trim() === '') {
         setStockData(initialStockData);
      } else {
         const filteredData = initialStockData.filter((stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase())
         );
         setStockData(filteredData);
      }
   };

   return (
      <div className="stocklisting_block">
         <div className="topheader_title">
            <h3>Top 10 Rank Stock List</h3>
            <StockSearch onSearch={handleSearch} />
         </div>
         <div className="table-responsive cm_table">
            <table className="table">
               <thead>
                  <tr>
                     <th>Stock Name</th>
                     <th>
                        <span className="d-flex justify-content-center">
                           <button type="button" className="border-0 d-flex gap-2 justify-content-center align-items-center">
                              <span>Current Price</span>
                              <ChevronsUpDown size={15} fill="transparent" />
                           </button>
                        </span>
                     </th>
                     <th>Market Capitalization</th>
                     <th>
                        <span className="d-flex justify-content-center">
                           <button type="button" className="border-0 d-flex gap-2 justify-content-center align-items-center">
                              <span>Sales</span>
                              <ChevronUp size={15} fill="transparent" />
                           </button>
                        </span>
                     </th>
                     <th>
                        <span className="d-flex justify-content-center">
                           <button type="button" className="border-0 d-flex gap-2 justify-content-center align-items-center">
                              <span>Operating Profit</span>
                              <ChevronsUpDown size={15} fill="transparent" />
                           </button>
                        </span>
                     </th>
                     <th>Net Profit</th>
                     <th>PER</th>
                     <th>PBR</th>
                     <th>Trading Volume</th>
                  </tr>
               </thead>
               <tbody>
                  {stockData.length > 0 ? (
                     stockData.map((stock, index) => (
                        <StockRow key={index} stock={stock} />
                     ))
                  ) : (
                     <tr>
                        <td colSpan="10" className="text-center">
                           No records found
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default StockListing;