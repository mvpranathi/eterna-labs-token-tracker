"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokens, updateTokenPrice } from "../store/tokenSlice";

const COINS = ["bitcoin", "ethereum", "solana", "avalanche-2", "polygon"]; // CoinGecko IDs

export function useCryptoData() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(
            ","
          )}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();

        // Convert data into your token format
        const updated = Object.entries(data).map(([key, value]: any, idx) => {
          const symbol =
            key === "bitcoin"
              ? "BTC"
              : key === "ethereum"
              ? "ETH"
              : key === "solana"
              ? "SOL"
              : key === "avalanche-2"
              ? "AVAX"
              : "MATIC";

          return {
            id: idx + 1,
            name: symbol === "BTC" ? "Bitcoin" :
                  symbol === "ETH" ? "Ethereum" :
                  symbol === "SOL" ? "Solana" :
                  symbol === "AVAX" ? "Avalanche" : "Polygon",
            symbol,
            price: value.usd,
            change: value.usd_24h_change?.toFixed(2),
          };
        });

        dispatch(setTokens(updated));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [dispatch]);
}
