'use client'
import Image from 'next/image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RankImage from '../../../public/assets/icons/rank.png'
import { useParams } from 'next/navigation';
import './stockdetail.css'
import { Activity, BrainCircuit, ChartColumnDecreasing, ChartPie, Cpu, DollarSign, FileCode2, Gamepad2, Globe } from 'lucide-react';
import MiniLineChart from '../Charts/MiniLineChart';
import HexagonRadarChart from '../Charts/HexagonRadarChart';

const StockDetail = () => {
   const { stock } = useParams();

   const sampleDataUp = [0, 20, 215, 50, 460, 180, 0, -280, 10, 20, -880, 800, 50, 510, 50, 0, 90, 0, 11, 0];

   return (
      <div className="stock_detail_page">
         <div className="w-100 mb-3">
            <div className="stockheader_wrapper">
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
            <div className="stock_bothwrapper">
               <div className="w-50">
                  {/* <h5 className='text-capitalize mb-0 mt-3'><i>About company</i></h5> */}
                  <p className='stock_info_p'>
                     <span className='text-capitalize text-primary'><i>{stock}</i></span> is an American company that develops and distributes software and services such as: a search engine (Bing), cloud solutions and the computer operating system Windows.
                  </p>
               </div>
               <div className="w-50 stockinnerInfo">
                  <div className="stockwrap">
                     <h4>#1</h4>
                     <span>Rank</span>
                  </div>
                  <div className="stockwrap">
                     <h4 className='text-success'>₹170.287 T</h4>
                     <span>Marketcap</span>
                  </div>
                  <div className="stockwrap">
                     <h4>United States</h4>
                     <span>Country</span>
                  </div>
                  <div className="stockwrap">
                     <h4>₹16,040</h4>
                     <span>Share price</span>
                  </div>
               </div>
            </div>
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
         <div className="stock_inner_row">
            <div className="w-50">
               <HexagonRadarChart />
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
                  <p className='mb-2'>Total market value of outstanding shares</p>
                  <MiniLineChart data={sampleDataUp} color="dodgerblue" />
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
                  <p className='mb-2'>Annual income from sales</p>
                  <MiniLineChart data={sampleDataUp} color="#00E396" />
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
                  <p className='mb-2'>Profit from core business operations</p>
                  <MiniLineChart data={sampleDataUp} color="red" />
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
                  <p className='mb-2'>Price-to-Earnings Ratio</p>
                  <MiniLineChart data={sampleDataUp} color="#00E396" />

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
                  <p className='mb-2'>Price-to-Book Ratio</p>
                  <MiniLineChart data={sampleDataUp} color="red" />
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