import { Coin } from "../models/coin";

type TableProps = {
  coins: Array<Coin>;
};

function AppTable({ coins }: TableProps) {
  const columns: Array<string> = ["Coins", "Price", "Market cap"];

  function printHeadColumns() {
    return columns.map((col, index) => <th key={index}>{col}</th>);
  }

  function printRows() {
    return coins.map((coin) => (
      <tr key={coin.uuid}>
        <td>
          <img className="icon" src={coin.iconUrl} alt="" />
          <h4>{coin.name}</h4>
          <p>{coin.symbol}</p>
        </td>
        <td>{coin.price}</td>
        <td>{coin.marketCap}</td>
      </tr>
    ));
  }

  return (
    <table>
      <thead>
        <tr>{printHeadColumns()}</tr>
      </thead>
      <tbody>{printRows()}</tbody>
    </table>
  );
}

export default AppTable;
