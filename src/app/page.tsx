// components/Home.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { filterWebsite } from "./filters/filter-website"; 
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
        const filteredResult = filterWebsite(result);
        setData(filteredResult);
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
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Latest Token Profiles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {currentData.map((token, index) => (
          <div
            key={index}
            className="flex flex-col items-start bg-white dark:bg-gray-800 shadow-md rounded-lg p-4"
          >
            {/* Icon */}
            <div className="mb-4">
              <Image
                src={token.icon}
                alt={`${token.tokenAddress} icon`}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>

            {/* Details */}
            <div>
              <p className="text-sm text-gray-500">Address:</p>
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                {token.tokenAddress}
              </p>

              <p className="text-sm text-gray-500">Chain ID:</p>
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                {token.chainId}
              </p>

              <p className="text-sm text-gray-500">Description:</p>
              <p className=" text-gray-800 dark:text-gray-200 mb-2">
                {token.description || "N/A"}
              </p>

              <p className="text-sm text-gray-500">Links:</p>
              {token.links && token.links.length > 0 ? (
                <ul className="flex flex-col-1 gap-5 list-disc ml-5 text-blue-500 dark:text-blue-400">
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
                <p className="text-gray-500">No Links</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
