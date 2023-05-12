import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const baseApiUrl = "https://api.coinranking.com/v2";

  useEffect(() => {
    getCoins();
  }, []);

  async function getCoins() {    
    try {
      const params = new URLSearchParams({limit: limit.toString()});
      const result = await (
        await fetch(`${baseApiUrl}/coins?${params}`, {
          headers: {
            "Authorization": `${import.meta.env.VITE_API_KEY}`
          }
        })
      ).json();
      console.log(result);
      setCoins(result.data.coins);
      setTotal(result.data.stats.total);
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  }

  return <>
    <h1>Numero delle pagine {total / limit}</h1>
  </>;
}

export default App;
