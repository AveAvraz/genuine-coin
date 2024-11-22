"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Link {
  type?: string;
  label?: string;
  url: string;
}

interface Token {
  url: string;
  icon: string;
  chainId: string;
  tokenAddress: string;
  description?: string;
  links?: Link[];
}

export default function Home() {
  const [data, setData] = useState<Token[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 15; // Limit to 15 items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dexscreener");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result: Token[] = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  // Calculate the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <h1>Latest Token Profiles</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th>Icon</th>
            <th>Url</th>
            <th>Address</th>
            <th>Chain ID</th>
            <th>Description</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((token, index) => (
            <tr key={index}>
              <td>
                <Image
                  src={token.icon}
                  alt={`${token.tokenAddress} icon`}
                  width={144}
                  height={144}
                  priority={index < 10}
                />
              </td>
              <td>{token.url}</td>
              <td>{token.tokenAddress}</td>
              <td>{token.chainId}</td>
              <td>{token.description || "N/A"}</td>
              <td>
                {token.links && token.links.length > 0 ? (
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {token.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label || link.type || "Link"}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No Links"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
