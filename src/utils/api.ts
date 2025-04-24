import { TokenMap } from "../types/tokenTypes";

export async function fetchAllTokens(): Promise<TokenMap> {
  const res = await fetch("https://api.energiswap.exchange/v1/assets");
  if (!res.ok) {
    throw new Error("Failed to fetch token data");
  }
  const data: TokenMap = await res.json();
  return data;
}
