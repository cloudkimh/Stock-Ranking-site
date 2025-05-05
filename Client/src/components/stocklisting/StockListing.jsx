'use client'
import { ChevronsUpDown, ChevronUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './stocklisting.css';
import StockRow from './StockRow';
import StockSearch from '../StockSearchBox/StockSearch';

const StockListing = () => {
   const [stockData, setStockData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [totalPages, setTotalPages] = useState(1);
   const [totalCount, setTotalCount] = useState(0);
   // Function to fetch data from the API
   const fetchStockData = async (page = 1, limit = 10) => {
      try {
         setLoading(true);
         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stock/list?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const { data, message, error } = await response.json();
         if (data) {
            setStockData(data.rows);
            setPage(data.page);
            setLimit(data.limit);
            setTotalPages(data.totalPages);
            setTotalCount(data.count);
         } else {
            setError(message || error || 'Failed to fetch stock data');
         }
         setLoading(false);
      } catch (err) {
         console.error('Error fetching stock data:', err);
         setError(err.message);
         setLoading(false);
      }
   };
   useEffect(() => {
      fetchStockData(page, limit);
   }, [page, limit]);
   const handleSearch = (query) => {
      if (query.trim() !== '') {
         const filteredData = stockData.filter((stock) =>
            stock.name.toLowerCase().includes(query.toLowerCase())
         );
         setStockData(filteredData);
      }
   };
   // Sorting functionality
   const handleSort = (key, direction) => {
      const sortedData = [...stockData].sort((a, b) => {
         if (direction === 'asc') {
            return a[key] > b[key] ? 1 : -1;
         } else {
            return a[key] < b[key] ? 1 : -1;
         }
      });
      setStockData(sortedData);
   };
   return (
      <div className="stocklisting_block">
         <div className="topheader_title">
            <h3>Top 10 Rank Stock List</h3>
            <StockSearch onSearch={handleSearch} />
         </div>
         <div className="table-responsive cm_table">
            {loading ? (
               <div className="text-center py-4">Loading stock data...</div>
            ) : (
               <table className="table">
                  <thead>
                     <tr>
                        <th>Rank</th>
                        <th className='text-start'>Stock Name</th>
                        <th>
                           <span className="d-flex justify-content-center">
                              <button
                                 type="button"
                                 className="border-0 d-flex gap-2 justify-content-center align-items-center"
                                 onClick={() => handleSort('currentPrice', 'desc')}
                              >
                                 <span>Current Price</span>
                                 <ChevronsUpDown size={15} fill="transparent" />
                              </button>
                           </span>
                        </th>
                        <th>Market Capitalization</th>
                        <th>
                           <span className="d-flex justify-content-center">
                              <button
                                 type="button"
                                 className="border-0 d-flex gap-2 justify-content-center align-items-center"
                                 onClick={() => handleSort('profitMargin', 'asc')}
                              >
                                 <span>Sales</span>
                                 <ChevronUp size={15} fill="transparent" />
                              </button>
                           </span>
                        </th>
                        <th>
                           <span className="d-flex justify-content-center">
                              <button
                                 type="button"
                                 className="border-0 d-flex gap-2 justify-content-center align-items-center"
                                 onClick={() => handleSort('operatingProfit', 'desc')}
                              >
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
                           <StockRow key={index} stock={stock} index={index} />
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
            )}
         </div>
         <div className="pagination-wrapper d-flex justify-content-between align-items-center mt-3">
            <div>
               Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount} entries
            </div>
            <div className="pagination_block d-flex align-items-center gap-2">
               <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
               >
                  First
               </button>
               <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
               >
                  Previous
               </button>
               <span>
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>
               </span>
               <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
               >
                  Next
               </button>
               <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
               >
                  Last
               </button>
               <select
                  className="form-select form-select-sm"
                  value={limit}
                  onChange={(e) => {
                     setPage(1); // Reset to first page when limit changes
                     setLimit(Number(e.target.value));
                  }}
               >
                  {[10, 20, 50, 100].map((num) => (
                     <option key={num} value={num}>
                        Show {num}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   );
};
export default StockListing;