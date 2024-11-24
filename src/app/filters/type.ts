// filters/types.ts

export interface Link {
  type?: string;
  label?: string;
  url: string;
}

export interface Token {
  url: string;
  icon: string;
  chainId: string;
  tokenAddress: string;
  description?: string;
  links?: Link[];
  lpBurned?: boolean;
}
