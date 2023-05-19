import { useEffect, useState } from "react";
import "./App.css";
import AppTable from "./components/AppTable";
import { Coin } from "./models/coin";
import AppPagination from "./components/AppPagination";
import AppPerPageInput from "./components/AppPerPageInput";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";

function App() {
  const [state, setState] = useState({
    coins: [],
    total: 0,
    curPage: 1,
    limit: 50,
    totalPages: 0,
    orderBy: "marketCap",
    orderDirection: "desc",
  });

  const baseApiUrl = "https://api.coinranking.com/v2";

  useEffect(() => {
    getCoins();
  }, [state.curPage, state.limit, state.orderBy, state.orderDirection]);

  async function getCoins() {
    try {
      const params = new URLSearchParams({
        limit: state.limit.toString(),
        offset: (state.limit * (state.curPage - 1)).toString(),
        orderBy: state.orderBy,
        orderDirection: state.orderDirection,
      });
      const result = await (
        await fetch(`${baseApiUrl}/coins?${params}`, {
          headers: {
            Authorization: `${import.meta.env.VITE_API_KEY}`,
          },
        })
      ).json();
      console.log(result);

      const totalPages = Math.ceil(result.data.stats.total / state.limit);

      setState({
        ...state,
        coins: result.data.coins,
        total: result.data.stats.total,
        totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleNextClick() {
    setState({
      ...state,
      curPage: state.curPage + 1,
    });
  }

  function handlePrevClick() {
    setState({
      ...state,
      curPage: state.curPage - 1,
    });
  }

  function handlePageChange(pageNum: number) {
    setState({
      ...state,
      curPage: pageNum,
    });
  }

  function handlePerPageSubmit(perPage: number) {
    setState({
      ...state,
      limit: perPage,
    });
  }

  function handleOrderChange(value: string) {
    if (value !== state.orderBy) {
      setState({
        ...state,
        orderBy: value,
      });
    } else {
      setState({
        ...state,
        orderDirection: state.orderDirection === "desc" ? "asc" : "desc",
      });
    }
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
            <h5>Trovati {state.total} coins</h5>
          </div>
          <div className="content-main">
            <AppTable
              coins={state.coins}
              orderChange={handleOrderChange}
              orderBy={state.orderBy}
              orderDirection={state.orderDirection}
            />
          </div>
          <footer>
            <h5>
              Pagina {state.curPage} / {state.totalPages}
            </h5>
            <AppPagination
              curPage={state.curPage}
              totalPages={state.totalPages}
              curPageChange={handlePageChange}
              nextClick={handleNextClick}
              prevClick={handlePrevClick}
            />
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
