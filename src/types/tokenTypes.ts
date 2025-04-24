export interface TokenData {
  name: string;
  symbol: string;
  last_price: number;
  maker_fee: number;
  taker_fee: number;
}

export type TokenMap = {
  [address: string]: TokenData;
};
export type TokenArr = {
  address: string;
  tokenData: TokenData;
};
