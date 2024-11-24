// filters/filterTokensWithLPBurned.ts

import { Token } from "./type";

export function filterTokensWithLPBurned(tokens: Token[]): Token[] {
  return tokens.filter((token) => {
    // If 'lpBurned' property exists, use it directly
    if (token.lpBurned !== undefined) {
      return token.lpBurned;
    }

    // Infer from description
    if (token.description) {
      // Check for phrases indicating LP is burned
      const lpBurnedPhrases = [
        "lp burned",
        "liquidity pool burned",
        "lp is burned",
        "burned lp",
      ];
      const descriptionLower = token.description.toLowerCase();
      const isLPBurned = lpBurnedPhrases.some((phrase) =>
        descriptionLower.includes(phrase)
      );
      if (isLPBurned) {
        return true; // Include token
      }
    }

    // Infer from links
    if (token.links) {
      const lpBurnedPhrases = [
        "lp burned",
        "liquidity pool burned",
        "lp is burned",
        "burned lp",
      ];
      const isLPBurned = token.links.some((link) => {
        const labelLower = link.label?.toLowerCase() || "";
        return lpBurnedPhrases.some((phrase) => labelLower.includes(phrase));
      });
      if (isLPBurned) {
        return true; // Include token
      }
    }

    // If no indication, exclude the token
    return false;
  });
}
