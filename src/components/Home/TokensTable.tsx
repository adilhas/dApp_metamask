import { useState } from "react";
import { TokenArr } from "../../types/tokenTypes";
import { formateCurrency, getIconBySymbol } from "../../utils/formateUtils";

interface Props {
  tokenArr: TokenArr[];
}

type SortColumn = "name" | "symbol" | "price";
type SortDirection = "asc" | "desc";

const TokensTable = ({ tokenArr }: Props) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("price");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTokens = [...tokenArr].sort((a, b) => {
    const getValue = (token: TokenArr) => {
      if (sortColumn === "price") return token.tokenData?.last_price ?? 0;
      return token.tokenData?.[sortColumn]?.toLowerCase() ?? "";
    };

    const aValue = getValue(a);
    const bValue = getValue(b);

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const getSortArrow = (column: SortColumn) =>
    sortColumn === column ? (sortDirection === "asc" ? " ▲" : " ▼") : "";

  return (
    <table className="table w-full max-w-80 mx-auto border-neutral-700 border-1 rounded-xl">
      <thead>
        <tr>
          <th>#</th>
          <th className="cursor-pointer" onClick={() => handleSort("name")}>
            Coin {getSortArrow("name")}
          </th>
          <th className="cursor-pointer" onClick={() => handleSort("symbol")}>
            Symbol {getSortArrow("symbol")}
          </th>
          <th className="cursor-pointer" onClick={() => handleSort("price")}>
            Price {getSortArrow("price")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTokens.map((token, index) => {
          const { tokenData, address } = token;
          const iconSrc = getIconBySymbol(tokenData?.symbol);
          const formattedPrice = formateCurrency(tokenData?.last_price, "USD");

          return (
            <tr key={address}>
              <th>{index + 1}</th>
              <td className="flex items-center">
                <div className="w-6 h-6 mr-3">
                  <img
                    src={iconSrc || getIconBySymbol("DUMMY")}
                    alt={tokenData?.symbol || "DUMMY"}
                  />
                </div>
                {tokenData?.name}
              </td>
              <td>{tokenData?.symbol}</td>
              <td>{formattedPrice}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TokensTable;
