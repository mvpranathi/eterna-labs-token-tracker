"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTokenPrice } from "@/store/tokenSlice";

/**
 * Mock WebSocket Hook
 * Simulates live price updates every few seconds
 * for demo/testing when no live socket is connected.
 */
export const useWebSocketMock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random token ID between 1 and 5
      const randomId = (Math.floor(Math.random() * 5) + 1).toString();

      // Simulate a small random price fluctuation (-1% to +1%)
      const randomPercentChange = (Math.random() - 0.5) * 2;

      // Dispatch a mock price update
      dispatch(
        updateTokenPrice({
          id: randomId, // type: string ✅
          price: 0,     // placeholder (we’ll compute it in slice)
          change: randomPercentChange, // renamed correctly ✅
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);
};
