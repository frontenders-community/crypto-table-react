import React, { useEffect, useState } from "react";
import "./App.css";
import AppTable from "./components/AppTable";
import { Coin } from "./models/coin";

function App() {
  const [coins, setCoins] = useState<Array<Coin>>([]);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState("");

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
      setInputPage(curPage.toString());
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

  function handlePageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const pageNum = event.target.value;
    setInputPage(pageNum);
  }

  function handlePageChangeSubmit(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      const pageToFetch = parseInt(inputPage);
      if (pageToFetch > 0 && pageToFetch <= totalPages) setCurPage(pageToFetch);
    }
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
      <input
        onChange={handlePageChange}
        onKeyUp={handlePageChangeSubmit}
        type="number"
        value={inputPage}
      />
      <button disabled={curPage === totalPages} onClick={handleNextClick}>
        Next
      </button>
    </>
  );
}

export default App;
