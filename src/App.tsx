import { useEffect, useState } from "react";
import "./App.css";
import AppTable from "./components/AppTable";
import { Coin } from "./models/coin";

function App() {
  const [coins, setCoins] = useState<Array<Coin>>([]);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(0);

  const baseApiUrl = "https://api.coinranking.com/v2";

  useEffect(() => {
    getCoins();
  }, [curPage]);

  async function getCoins() {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: (limit * (curPage - 1)).toString(),
      });
      const result = await (
        await fetch(`${baseApiUrl}/coins?${params}`, {
          headers: {
            Authorization: `${import.meta.env.VITE_API_KEY}`,
          },
        })
      ).json();
      setCoins(result.data.coins);
      setTotal(result.data.stats.total);
      setTotalPages(Math.ceil(result.data.stats.total / limit));
    } catch (error) {
      console.log(error);
    }
  }

  function handleNextClick() {
    setCurPage(curPage + 1);
  }

  function handlePrevClick() {
    setCurPage(curPage - 1);
  }
  function handlePageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const pageNum = parseInt(input.value);
    setCurPage(pageNum);
  }

  return (
    <>
      <main>
        <AppTable coins={coins} />
      </main>
      <h5>
        Pagina {curPage} / {totalPages}
      </h5>
      <button disabled={curPage === 1} onClick={handlePrevClick}>
        Prev
      </button>
      <input onChange={handlePageChange} type="number" value={curPage} />
      <button disabled={curPage === totalPages} onClick={handleNextClick}>
        Next
      </button>
    </>
  );
}

export default App;
