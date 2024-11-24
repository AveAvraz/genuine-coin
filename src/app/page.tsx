"use client";

import { useEffect, useState } from "react";
import TokenCard from "./component/token-card";
import Pagination from "./component/pagination"; 
import { Token } from "./filters/type"; 
export default function Home() {
  const [data, setData] = useState<Token[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Latest Token Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {currentData.map((token) => (
          <TokenCard key={token.tokenAddress} token={token} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
