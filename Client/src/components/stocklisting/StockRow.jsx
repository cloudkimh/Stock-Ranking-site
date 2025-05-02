import React from 'react';
import Image from 'next/image';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const StockRow = ({ stock }) => {
   return (
      <tr>
         <td>
            <a href="/" className='stocklink d-flex gap-2 align-items-center'>
               <span className="stockImage">
                  <Image src={stock.image} width={20} height={20} alt="StockImage" />
               </span>
               <span>{stock.name}</span>
            </a>
         </td>
         <td>{stock.currentPrice}</td>
         <td>{stock.marketCap}</td>
         <td>
            <Badge bg={stock.profitMargin > 0 ? 'success' : 'danger'}>
               {stock.profitMargin}%
            </Badge>
         </td>
         <td>{stock.operatingProfit}</td>
         <td>{stock.netProfit}</td>
         <td>
            <Badge bg={'warning'}>{stock.per}</Badge>
         </td>
         <td>
            <Badge bg={'danger'}>{stock.pbr}</Badge>
         </td>
         <td>{stock.tradingVolume}</td>
      </tr>
   );
};

StockRow.propTypes = {
   stock: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
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