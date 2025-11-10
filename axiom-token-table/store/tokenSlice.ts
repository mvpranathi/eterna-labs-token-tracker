import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface TokenState {
  tokens: Token[];
}

const initialState: TokenState = {
  tokens: [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 0, change: 0 },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 0, change: 0 },
    { id: "solana", name: "Solana", symbol: "SOL", price: 0, change: 0 },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", price: 0, change: 0 },
    { id: "polygon", name: "Polygon", symbol: "MATIC", price: 0, change: 0 },
  ],
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ id: string; price: number; change: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);
      if (token) {
        token.price = parseFloat(action.payload.price.toFixed(2));
        token.change = parseFloat(action.payload.change.toFixed(2));
      }
    },
  },
});

export const { setTokens, updateTokenPrice } = tokenSlice.actions;
export default tokenSlice.reducer;
