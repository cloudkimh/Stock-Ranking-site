'use client'
import { ArrowDown, ArrowUp, ChevronsUpDown, ChevronUp, Hexagon, Triangle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './stocklisting.css';
import StockRow from './StockRow';
import StockSearch from '../StockSearchBox/StockSearch';
import { stockServices } from '@/services/api';
import stockCardImage from '../../../public/assets/icons/top-info-shape.png'
import applestock from '../../../public/assets/icons/apple.png'
import Image from 'next/image';
import LoaderUI from '../Loader/LoaderUI';
import HexagonRadarChart from '../Charts/HexagonRadarChart';
import { useTranslations } from 'next-intl';

const StockListing = () => {
   const t = useTranslations();
   const [stockData, setStockData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [totalPages, setTotalPages] = useState(1);
   const [totalCount, setTotalCount] = useState(0);

   const fetchStockData = async (page, limit) => {
      try {
         setLoading(true);
         let payload = {
            page: page,
            limit: limit
         }
         const response = await stockServices.stockList(payload);
         const { data, message, error } = response;
         if (data) {
            setStockData(data?.data?.rows);
            setPage(data?.data?.page);
            setLimit(data?.data.limit);
            setTotalPages(data?.data.totalPages);
            setTotalCount(data?.data.count);
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
      (async () => {
         await fetchStockData(page, limit);
      })();
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
            <h3>{t('Top 10 Rank Stock List')}</h3>
            {/* <StockSearch onSearch={handleSearch} /> */}
         </div>
         <div className="stockCard_wrapper d-none">
            <div className="stockUICard">
               <div className='image_abs'>
                  <span>#1</span>
                  <Image width={70} height={100} src={stockCardImage} alt="img1" />
               </div>
               <div className="">
                  <div className="d-flex align-items-baseline">
                     <div className="">
                        <div className="stockIcon">
                           <Image width={40} height={40} src={applestock} alt="img2" />
                        </div>
                        <h3 className='mb-0'> <b>Apple</b></h3>
                     </div>
                     <div className="stockdata_box">
                        <h5 className='text-danger'>
                           <b> 1,369</b>
                        </h5>
                        <p className='text-danger'>
                           <ArrowUp width={20} />
                           27 (-3.65%)
                        </p>
                     </div>
                  </div>
                  <div className="">
                     <HexagonRadarChart height={340} />
                     <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                           <h5 className='fw-bold mb-0'>Score</h5>
                           -
                           <p className='fw-bold percent_text mb-0'>68</p>
                        </div>
                        <button className='viewbtn' type="button">View</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="">
            {loading ? (
               <LoaderUI />
            ) : (
               <>
                  <div className="stockCard_wrapper">
                     {
                        stockData?.length > 0 ? (
                           stockData?.map((stock, index) => {
                              return (
                                 <div key={index} className="stockUICard">
                                    <div className='image_abs'>
                                       <span>#{index + 1}</span>
                                       <Image width={70} height={100} src={stockCardImage} alt="img1" />
                                    </div>
                                    <div className="">
                                       <div className="d-flex align-items-baseline">
                                          <div className="">
                                             <div className="stockIcon">
                                                <Image width={40} height={40} src={applestock} alt="img2" />
                                             </div>
                                             <h4 className='mb-0'> <b>{stock.stock_info.stk_nm}</b></h4>
                                          </div>
                                          <div className={stock.stock_info.cur_prc < 0 ? 'stockdata_box blue' : 'stockdata_box'}>
                                             <h5 className={stock.stock_info.cur_prc < 0 ? 'text-primary' : 'text-danger'}>
                                                <b>{stock.stock_info.cur_prc}</b>
                                             </h5>
                                             <p className={stock.stock_info.cur_prc < 0 ? 'text-primary' : 'text-danger'}>
                                                {
                                                   stock.stock_info.cur_prc < 0 ?
                                                      <ArrowDown width={20} />
                                                      :
                                                      <ArrowUp width={20} />
                                                }
                                                27 ({stock.stock_info.sale_amt ? stock.stock_info.sale_amt : 0}%)
                                             </p>
                                          </div>
                                       </div>
                                       <div className="">
                                          <HexagonRadarChart height={340} />
                                          <div className="d-flex justify-content-between">
                                             <div className="d-flex align-items-center gap-3">
                                                <h5 className='fw-bold mb-0'>Score</h5>
                                                -
                                                <p className='fw-bold percent_text mb-0'>{stock.stock_info.mac}</p>
                                             </div>
                                             <button className='viewbtn' type="button">View</button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )
                           })
                        ) : ''
                     }

                  </div>
                  <table className="table d-none">
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
                        {console.log(stockData)}
                        {stockData?.length > 0 ? (
                           stockData?.map((stock, index) => (
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
               </>
            )}
         </div>
         <div className="d-none">
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
      </div>
   );
};
export default StockListing;