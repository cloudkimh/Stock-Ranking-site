'use client'
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
import './searchBox.css';

const StockSearch = ({ onSearch }) => {
   const [query, setQuery] = useState('');
   const [debouncedQuery, setDebouncedQuery] = useState('');

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedQuery(query);
      }, 300);

      return () => clearTimeout(timer);
   }, [query]);

   useEffect(() => {
      if (onSearch) {
         onSearch(debouncedQuery);
      }
   }, [debouncedQuery]);

   const handleInputChange = (e) => {
      const value = e.target.value;
      setQuery(value);

      // Reset immediately if the input is cleared
      if (value.trim() === '') {
         onSearch('');
      }
   };

   return (
      <div className="search-box">
         <input
            type="text"
            className="search-input"
            placeholder="Search for Stock here"
            value={query}
            onChange={handleInputChange}
         />
         <button className="search-button">
            <Search size={20} />
         </button>
      </div>
   );
};

StockSearch.propTypes = {
   onSearch: PropTypes.func.isRequired,
};

export default StockSearch;