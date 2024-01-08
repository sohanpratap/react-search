import React, { useState } from 'react';
import './search.css';
const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const performCustomSearch = async (query) => {
    try {
      const customConfigId = '2bcdce44-8333-4d9a-85f3-c59c5cbd19be';
      const apiSubsKey = '442bc7a96ef848a88ede4a15a9d6fcac';
      const mkt = 'en-US';
      // Replace 'YOUR_BINGE_API_ENDPOINT' and 'YOUR_BINGE_API_KEY' with actual values
      const response = await fetch(`https://api.bing.microsoft.com/v7.0/custom/search?q=${query}&customconfig=${customConfigId}&mkt=${mkt}`,
        {
          method: 'get', 
          headers: new Headers({
            'Ocp-Apim-Subscription-Key': `${apiSubsKey}`
          })
        }
      );
      const data = await response.json();
      let result =  data?.webPages?.value;
      setSearchResults(result);
    } catch (error) {
      console.error('Error performing custom search:', error);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    performCustomSearch(searchQuery);
  };

  return (
    <div>

      <div class="search-container">
        <div class="search-box">
            <input type="text" class="search-input" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button class="search-btn" onClick={handleSearchSubmit}>Search</button>
        </div>
      </div>

      <div class="search-results">
        {searchResults.map((result, index) => (
        <div class="search-result">
            <h3>{result.name}</h3>
            <p>{result.snippet}</p>
          </div>
          ))}
      </div>
      
    </div>
  );
};

export default SearchPage;