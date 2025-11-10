"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTokens } from "@/store/tokenSlice";

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export const useCryptoData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,solana,polygon,avalanche",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );

        const data = response.data;

        const updated: Token[] = data.map((token: any) => ({
          // ✅ ensure the ID is a string
          id: token.id.toString(),
          name: token.name,
          symbol: token.symbol.toUpperCase(),
          price: token.current_price,
          change: token.price_change_percentage_24h,
        }));

        // ✅ dispatch the tokens to Redux store
        dispatch(setTokens(updated));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    // Initial fetch
    fetchCryptoData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchCryptoData, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);
};
