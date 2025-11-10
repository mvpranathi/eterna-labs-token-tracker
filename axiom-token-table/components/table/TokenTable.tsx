"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../../store/tokenSlice";
import { RootState } from "../../store";
import { motion } from "framer-motion";
import { useSortTokens } from "../../hooks/useSortTokens";
import { useLivePriceFeed } from "../../hooks/useLivePriceFeed";

export default function TokenTable() {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const { sortedTokens, sortKey, sortOrder, toggleSort } = useSortTokens(tokens);
  const [lastUpdated, setLastUpdated] = useState<string>("—");

  useEffect(() => {
    if (!tokens.length) dispatch(setTokens(tokens));
  }, [dispatch, tokens.length]);

  useLivePriceFeed();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Eterna Labs Token Table</h1>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full bg-gray-900 text-white border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left cursor-pointer" onClick={() => toggleSort("name")}>
                Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4 text-left">Symbol</th>
              <th className="py-3 px-4 text-right cursor-pointer" onClick={() => toggleSort("price")}>
                Price {sortKey === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4 text-right cursor-pointer" onClick={() => toggleSort("change")}>
                Change {sortKey === "change" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedTokens.map((token) => (
              <motion.tr
                key={token.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="py-3 px-4">{token.name}</td>
                <td className="py-3 px-4">{token.symbol}</td>
                <td className="py-3 px-4 text-right">
                  $
                  {token.price
                    ? token.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </td>
                <td
                  className={`py-3 px-4 text-right font-semibold ${
                    token.change > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {token.change.toFixed(2)} %
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Last updated: <span className="font-semibold text-white">{lastUpdated}</span>
      </p>
    </div>
  );
}
