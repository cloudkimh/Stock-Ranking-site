import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp } from 'lucide-react';

const StockRow = ({ stock, index }) => {
   return (
      <tr>
         <td>
            <a href={`/stock/${stock?.stock_info.stk_nm.toLowerCase().replace(/\s+/g, '-')}`} className='stocklink d-flex gap-2 align-items-center'>
               <span className="d-flex flex-column align-items-baseline">
                  <span>{stock.stock_info.stk_nm}</span>
                  <span className='stockcategory'>{stock.market_code}</span>
               </span>
            </a>
         </td>
         <td>
            <span className='rank_ui fw-bold me-0'> #1</span>
         </td>
         <td>
            <span className='d-flex gap-2 align-items-center justify-content-center'>
               <span className=''>
                  <span style={{ fontSize: '20px' }} className='text-danger fw-bold'>
                     {stock.stock_info.cur_prc}
                  </span>
                  <span style={{ fontSize: '13px' }} className='d-flex gap-1 justify-content-center align-items-center text-danger fw-bolder'>
                     <ArrowUp size={14} />
                     27 (+5.05%)
                  </span>
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #2</span>
               <span className='fw-bold text-danger'>
                  {stock.stock_info.mac}
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #3</span>
               <span className='fw-bold'>
                  {
                     stock.stock_info.sale_amt !== null ?
                        <span className={stock.stock_info.sale_amt > 0 ? 'text-success' : 'text-danger'}>
                           {stock.stock_info.sale_amt}%
                        </span> : "-"
                  }
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #3</span>
               <span className='fw-bold text-danger'>
                  {stock.stock_info.bus_pro ?? "-"}
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #3</span>
               <span className='fw-bold text-danger'>
                  {stock.stock_info.cup_nga ?? "-"}
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #3</span>
               <span className='fw-bold text-danger'>
                  {stock.stock_info.per ? stock.stock_info.per : "-"}
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #3</span>
               <span className='fw-bold text-danger'>
                  {stock.stock_info.pbr ? stock.stock_info.pbr : "-"}
               </span>
            </span>
         </td>
         <td>
            <span className='d-flex flex-column justify-content-center'>
               <span className='rank_ui fw-bold'> #3</span>
               <span className='fw-bold text-danger text-center'>
                  {stock.stock_info.trde_qty}
               </span>
            </span>
         </td>
      </tr>
   );
};

StockRow.propTypes = {
   stock: PropTypes.shape({
      rank: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      currentPrice: PropTypes.string.isRequired,
      marketCap: PropTypes.string.isRequired,
      profitMargin: PropTypes.number.isRequired,
      operatingProfit: PropTypes.string.isRequired,
      netProfit: PropTypes.string.isRequired,
      per: PropTypes.number.isRequired,
      pbr: PropTypes.number.isRequired,
      tradingVolume: PropTypes.string.isRequired,
   }).isRequired,
};

export default StockRow;