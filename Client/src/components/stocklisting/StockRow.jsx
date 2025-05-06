import React from 'react';
import Image from 'next/image';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import rankImage from '../../../public/assets/icons/rank.png'

const StockRow = ({ stock, index }) => {
   return (
      <tr>
         <td>
            <span className='position-relative'>
               <span className='rank_text'>{index + 1}</span>
               <Image src={rankImage} width={40} height={40} alt="rank" />
            </span>
         </td>
         <td>
            <a href={`/stock/${stock?.stock_info.stk_nm.toLowerCase().replace(/\s+/g, '-')}`} className='stocklink d-flex gap-2 align-items-center'>

               <span className="d-flex flex-column align-items-baseline">
                  <span>{stock.stock_info.stk_nm}</span>
                  <span className='stockcategory'>{stock.category}</span>
               </span>
            </a>
         </td>
         <td>{stock.stock_info.cur_prc}</td>
         <td>{stock.stock_info.mac}</td>
         <td>
            {
               stock.stock_info.sale_amt !== null ? <Badge bg={stock.stock_info.sale_amt > 0 ? 'success' : 'danger'}>
                  {stock.stock_info.sale_amt}%
               </Badge> : "-"
            }
         </td>
         <td>{stock.stock_info.bus_pro ?? "-"}</td>
         <td>{stock.stock_info.cup_nga ?? "-"}</td>
         <td>
            {
               stock.stock_info.per ? <Badge bg={'warning'}>{stock.stock_info.per}</Badge> : "-"
            }
         </td>
         <td>
            {
               stock.stock_info.pbr ? <Badge bg={'danger'}>{stock.stock_info.pbr}</Badge> : "-"
            }

         </td>
         <td>{stock.stock_info.trde_qty}</td>
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