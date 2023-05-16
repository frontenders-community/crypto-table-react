import { useState } from "react";

type AppPerPageProps = {
  perPageSubmit: (perPageSubmit: number) => void;
};

function AppPerPageInput({ perPageSubmit }: AppPerPageProps) {
  const [perPage, setPerPage] = useState("50");

  function handlePerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPerPage(event.target.value);
  }

  function handlePerPageSubmit(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      perPageSubmit(parseInt(perPage));
    }
  }

  return (
    <>
      <input
      className="form-input per-page-input"
        id="items-per-page"
        type="number"
        value={perPage}
        onChange={handlePerPageChange}
        onKeyUp={handlePerPageSubmit}
      />
      <label htmlFor="items-per-page"> / pagina</label>
    </>
  );
}

export default AppPerPageInput;
