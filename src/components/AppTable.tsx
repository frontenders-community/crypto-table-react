import { Coin } from "../models/coin";

type TableProps = {
  coins: Array<Coin>;
};

function AppTable({ coins }: TableProps) {
  const columns: Array<string> = ["Coins", "Price", "Market cap"];

  function printHeadColumns() {
    return columns.map((col, index) => <th key={index}>{col}</th>);
  }

  function formatPrice(price: string) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(parseFloat(price));
  }

  function printRows() {
    return coins.map((coin) => (
      <tr key={coin.uuid}>
        <td className="coin">
          <img className="icon" src={coin.iconUrl} alt="" />
          <div className="name">
            <h4>{coin.name}</h4>
            <p>{coin.symbol}</p>
          </div>
        </td>
        <td className="price">{formatPrice(coin.price)}</td>
        <td className="market-cap">{coin.marketCap}</td>
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
