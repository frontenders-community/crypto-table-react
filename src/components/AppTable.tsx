import { Coin } from "../models/coin";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import LineChart from "./LineChart";

type TableProps = {
  coins: Array<Coin>;
};

function AppTable({ coins }: TableProps) {
  const columns: Array<string> = ["Coins", "Price", "Market cap", "24h"];

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

  function formatBillionPrice(price: string) {
    const bPrice =
      "$" + (Math.abs(Number(price)) / 1.0e9).toFixed(2) + " billion";
    return bPrice;
  }

  function prepareDataset(coin: Coin) {
    const data = coin.sparkline.map((item) => parseFloat(item));
    return data;
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
        <td className="market-cap">{formatBillionPrice(coin.marketCap)}</td>
        <td className="chart">
          <LineChart dataset={prepareDataset(coin)} title={coin.change} />
        </td>
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
