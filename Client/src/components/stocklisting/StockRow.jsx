import React from 'react';
import Image from 'next/image';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import rankImage from '../../../public/assets/icons/rank.png'

const StockRow = ({ stock }) => {
   return (
      <tr>
         <td>
            <span className='position-relative'>
               <span className='rank_text'>{stock.rank}</span>
               <Image src={rankImage} width={40} height={40} alt="rank" />
            </span>
         </td>
         <td>
            <a href={`/stock/${stock.name.toLowerCase().replace(/\s+/g, '-')}`} className='stocklink d-flex gap-2 align-items-center'>
               <span className="stockImage">
                  <Image src={stock.image} width={25} height={25} alt="StockImage" />
               </span>
               <span className="d-flex flex-column align-items-baseline">
                  <span>{stock.name}</span>
                  <span className='stockcategory'>{stock.category}</span>
               </span>
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