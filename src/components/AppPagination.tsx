import { useEffect, useState } from "react";

type PaginationProps = {
  curPage: number;
  totalPages: number;
  curPageChange: (pageNum: number) => void;
  nextClick: () => void;
  prevClick: () => void;
};

function AppPagination({
  curPage,
  totalPages,
  curPageChange,
  nextClick,
  prevClick,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState("1");

  useEffect(() => {
    setInputPage(curPage.toString());
  }, [curPage]);

  function handlePageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const pageNum = event.target.value;
    setInputPage(pageNum);
  }

  function handlePageChangeSubmit(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      const pageToFetch = parseInt(inputPage);
      if (pageToFetch > 0 && pageToFetch <= totalPages)
        curPageChange(pageToFetch);
    }
  }

  return (
    <section className="pagination">
      <button disabled={curPage === 1} onClick={prevClick}>
        Prev
      </button>
      <input
        onChange={handlePageChange}
        onKeyUp={handlePageChangeSubmit}
        type="number"
        value={inputPage}
      />
      <button disabled={curPage === totalPages} onClick={nextClick}>
        Next
      </button>
    </section>
  );
}

export default AppPagination;
