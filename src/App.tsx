import { useEffect, useState } from "react";
import "./App.css";
import AppTable from "./components/AppTable";
import { Coin } from "./models/coin";
import AppPagination from "./components/AppPagination";
import AppPerPageInput from "./components/AppPerPageInput";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";

function App() {
  const [coins, setCoins] = useState<Array<Coin>>([]);
  const [total, setTotal] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(0);

  const baseApiUrl = "https://api.coinranking.com/v2";

  useEffect(() => {
    getCoins();
  }, [curPage, limit]);

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

  function handlePageChange(pageNum: number) {
    setCurPage(pageNum);
  }

  function handlePerPageSubmit(perPage: number) {
    setLimit(perPage);
  }

  return (
    <div className="wrapper">
      <AppHeader />
      <main className="main">
        <AppSidebar />
        <div className="main-content">
          <div className="content-header">
            <div className="table-actions">
              <AppPerPageInput perPageSubmit={handlePerPageSubmit} />
            </div>
            <h5>Trovati {total} coins</h5>
          </div>
          <div className="content-main">
            <AppTable coins={coins} />
            <h5>
              Pagina {curPage} / {totalPages}
            </h5>
            <AppPagination
              curPage={curPage}
              totalPages={totalPages}
              curPageChange={handlePageChange}
              nextClick={handleNextClick}
              prevClick={handlePrevClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
