import { useCallback, useRef, useState } from "react";

function App() {
const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

const searchRef = useRef("");

  const handleAPICall = () => {
    console.log("Sending API request...");
		fetch(`https://api.coingecko.com/api/v3/search?query=${searchRef.current}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.coins);
      setSearchResults(json.coins);
      setLoading(false);
    });
  };

  const handleSearchTermChange = (event) => {
    setLoading(true);
    const input = event.currentTarget.value;
    console.log(input)
    setSearchTerm(input);
    searchRef.current = input;
    debouncedRequest();
  };

  const debounce = (fn, delay) => {
		let timer;
		return () => {
			clearTimeout(timer);
			timer = setTimeout(() => { 
				fn(); 
			}, delay);
		};
	};

const debouncedRequest = useCallback(debounce(() => handleAPICall(), 1500),[]);

  return (
    <div className="App">
      <h1>React Debounce</h1>
      <div>
        search crypto:&nbsp; 
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchTermChange}
        />
      </div>
      {loading && <div>loading...</div>}
      {!loading && Boolean(searchResults.length) &&
        searchResults.map((coin, index) => {
          return(
            <div key={index}>{coin.name}</div> 
          );
        })
      }
    </div>
  );
}

export default App;
