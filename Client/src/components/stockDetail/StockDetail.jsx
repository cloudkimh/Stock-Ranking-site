'use client'
import Image from 'next/image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RankImage from '../../../public/assets/icons/rank.png'
import { useParams } from 'next/navigation';
import './stockdetail.css'
import { Activity, BrainCircuit, ChartColumnDecreasing, ChartPie, Cpu, DollarSign, FileCode2, Gamepad2, Globe } from 'lucide-react';

const StockDetail = () => {
   const { stock } = useParams();

   return (
      <div className="stock-detail-page">
         <div className="stock_inner_row">
            <div className="w-50">
               <div className="d-flex align-items-center gap-4">
                  <div className="d-flex align-items-center gap-2">
                     <Image src={'https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg'} width={35} height={35} alt='linkicon' />
                     <h1 className='stocktitle'>{stock} </h1>
                  </div>
                  <div className="rank_block position-relative">
                     <span>1</span>
                     <Image src={RankImage} width={50} height={50} alt='rank' />
                  </div>
                  <a href="/" className="webglobe">
                     <Globe width={27} color='dodgerblue' />
                     <p className=''>Website</p>
                  </a>
               </div>
               <h5 className='text-capitalize mb-0 mt-3'><i>About {stock} </i></h5>
               <p className='stock_info_p'>
                  <strong className='text-capitalize'>{stock}</strong> is an American company that develops and distributes software and services such as: a search engine (Bing), cloud solutions and the computer operating system Windows.
               </p>
               <div className="">
                  <h5 className='text-capitalize mb-0 mt-3'><i>Category </i></h5>
                  <div className="categorybox_wrap">
                     <span className='categorybox'>
                        <FileCode2 width={20} />
                        Software
                     </span>
                     <span className='categorybox'>
                        <Cpu width={20} />
                        Tech
                     </span>
                     <span className='categorybox'>
                        <BrainCircuit width={20} />
                        AI
                     </span>
                     <span className='categorybox'>
                        <Gamepad2 width={20} />
                        Video games
                     </span>
                  </div>
               </div>
            </div>
            <div className="stockbox_wrapper w-75">
               <div className="stockbox">
                  <h4 className="stock_inf_name">
                     <DollarSign width={22} color='green' />
                     Market Cap <span>(#1)</span>
                  </h4>
                  <div className="d-flex gap-3 align-items-center">
                     <h2 className='stocknumber'>$2850.0B</h2>
                     <span className='rankname'>Rank 1</span>
                  </div>
                  <p className='mb-0'>Total market value of outstanding shares</p>
               </div>
               <div className="stockbox">
                  <h4 className="stock_inf_name">
                     <Activity width={22} color='dodgerblue' />
                     Revenue <span>(#1)</span>
                  </h4>
                  <div className="d-flex gap-3 align-items-center">
                     <h2 className='stocknumber'>$394.3B</h2>
                     <span className='rankname'>Rank 3</span>
                  </div>
                  <p className='mb-0'>Annual income from sales</p>
               </div>
               <div className="stockbox">
                  <h4 className="stock_inf_name">
                     <ChartColumnDecreasing width={22} color='gold' />
                     Operating Profit <span>(#1)</span>
                  </h4>
                  <div className="d-flex gap-3 align-items-center">
                     <h2 className='stocknumber'>$123.1B</h2>
                     <span className='rankname'>Rank 1</span>
                  </div>
                  <p className='mb-0'>Profit from core business operations</p>
               </div>
               <div className="stockbox">
                  <h4 className="stock_inf_name">
                     <ChartPie width={22} color='red' />
                     PER <span>(#26)</span>
                  </h4>
                  <div className="d-flex gap-3 align-items-center">
                     <h2 className='stocknumber'>30.5</h2>
                     <span className='rankname'>Rank 26</span>
                  </div>
                  <p className='mb-0'>Price-to-Earnings Ratio</p>
               </div>
               <div className="stockbox">
                  <h4 className="stock_inf_name">
                     <Activity width={22} color='dodgerblue' />
                     PBR <span>(#6)</span>
                  </h4>
                  <div className="d-flex gap-3 align-items-center">
                     <h2 className='stocknumber'>49.6</h2>
                     <span className='rankname'>Rank 6</span>
                  </div>
                  <p className='mb-0'>Price-to-Book Ratio</p>
               </div>
            </div>
         </div>
         <div className="stockmarket_tab_section">
            <Tabs
               defaultActiveKey="marketcap"
               className="commontab_section"
            >
               <Tab eventKey="marketcap" title="Market Cap">
                  <div className="tab_content">
                     <h3>Market capitalization of <i className='text-capitalize text-primary'> {stock}</i> (MSFT)</h3>
                     <h6>Market cap: <span className='text-bg-warning ps-1 pe-1'>₹267.001 Trillion</span></h6>
                     <p>As of May 2025 Microsoft has a market cap of ₹267.001 Trillion. This makes Microsoft the world's 2nd most valuable company by market cap according to our data. The market capitalization, commonly called market cap, is the total market value of a publicly traded company's outstanding shares and is commonly used to measure how much a company is worth.</p>
                  </div>
               </Tab>
               <Tab eventKey="Revenue" title="Revenue">
               </Tab>
               <Tab eventKey="Earnings" title="Earnings">
               </Tab>
               <Tab eventKey="Price history" title="Price history">
               </Tab>
               <Tab eventKey="P/E ratio" title="P/E ratio">
               </Tab>
               <Tab eventKey="P/S ratio" title="P/S ratio">
               </Tab>
            </Tabs>
         </div>
      </div>
   );
};

export default StockDetail;