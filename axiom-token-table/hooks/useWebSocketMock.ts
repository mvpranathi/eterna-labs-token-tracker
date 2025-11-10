"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTokenPrice } from "../store/tokenSlice";

export function useWebSocketMock() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small random market fluctuations
      dispatch(
        updateTokenPrice({
          id: Math.floor(Math.random() * 5) + 1, // pick a random token (1–5)
          percentChange: (Math.random() - 0.5) * 2, // between -1% and +1%
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);
}
