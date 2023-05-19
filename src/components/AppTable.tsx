import { Coin } from "../models/coin";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import LineChart from "./LineChart";

type TableProps = {
  coins: Array<Coin>;
  orderBy: string;
  orderDirection: string;
  orderChange: (colName: string) => void;
};

type Column = {
  title: string;
  key: string;
  orderable: boolean;
};

function AppTable({ coins, orderChange, orderBy, orderDirection }: TableProps) {
  const columns: Array<Column> = [
    {
      title: "Coins",
      key: "coin",
      orderable: false,
    },
    {
      title: "Price",
      key: "price",
      orderable: true,
    },
    {
      title: "Market cap",
      key: "marketCap",
      orderable: true,
    },
    {
      title: "24h",
      key: "change",
      orderable: true,
    },
  ];

  function printHeaderIcon(col: Column) {
    const iconClass = `
    col-icon 
    fa-solid 
    ${col.key === orderBy && "active"}
    ${
      col.key === orderBy && orderDirection === "desc"
        ? "fa-arrow-down-wide-short"
        : "fa-arrow-up-wide-short"
    }
    `;
    return (
      col.orderable && (
        <i className={iconClass} onClick={() => orderChange(col.key)}></i>
      )
    );
  }

  function printHeadColumns() {
    return columns.map((col: Column, index) => (
      <th key={index}>
        <span>{col.title}</span>
        {printHeaderIcon(col)}
      </th>
    ));
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
