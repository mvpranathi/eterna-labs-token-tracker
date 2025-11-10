"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTokenPrice } from "../store/tokenSlice";
import { RootState } from "../store";

export function useLivePriceFeed() {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.tokens.tokens);

  useEffect(() => {
    if (!tokens.length) return;

    const interval = setInterval(() => {
      tokens.forEach((t) => {
        const randomFluctuation = 1 + (Math.random() - 0.5) / 50; // ±1%
        const newPrice = t.price === 0 ? Math.random() * 50000 : t.price * randomFluctuation;
        const change = ((newPrice - t.price) / (t.price || 1)) * 100;

        dispatch(
          updateTokenPrice({
            id: t.id,
            price: newPrice,
            change,
          })
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, tokens]);
}
