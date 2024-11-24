// components/FilterTokens.tsx

import { Token } from "./type"; 

export function filterWebsite(tokens: Token[]): Token[] {
  return tokens.filter((token) => {
    if (!token.links || token.links.length === 0) {
      return false; // Exclude tokens with no links
    }

    // Check if any link has type or label indicating a website
    return token.links.some((link) => {
      const typeLower = link.type?.toLowerCase();
      const labelLower = link.label?.toLowerCase();
      return (
        (typeLower === "website" || labelLower === "website") &&
        Boolean(link.url)
      );
    });
  });
}
