"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTokenPrice } from "@/store/tokenSlice";

/**
 * Mock WebSocket Hook
 * Simulates live price updates every few seconds.
 * Useful for demo and testing when no real WebSocket feed exists.
 */
export const useWebSocketMock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random token ID between 1 and 5 (convert to string for type safety)
      const randomId = (Math.floor(Math.random() * 5) + 1).toString();

      // Generate a small random percentage change (-1% to +1%)
      const randomChange = (Math.random() - 0.5) * 2;

      dispatch(
        updateTokenPrice({
          id: randomId, // ✅ fixed: now a string
          percentChange: randomChange,
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);
};
