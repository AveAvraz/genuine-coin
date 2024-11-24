import { Token } from "../filters/type";
import { RxClipboardCopy } from "react-icons/rx";
import { getIconComponent } from "../utils/get-icon-component";
import Image from "next/image";

interface TokenCardProps {
  token: Token;
}

export default function TokenCard({ token }: TokenCardProps) {
 const handleCopy = (address: string) => {
   navigator.clipboard.writeText(address);
 };


  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      {/* Token Icon */}
      <Image
        src={token.icon}
        alt={`${token.tokenAddress} icon`}
        width={64} // Define width in pixels
        height={64} // Define height in pixels
        className="rounded-full mb-4"
      />

      {/* Token Address */}
      <p className="text-sm text-gray-500">Address:</p>
      <div className="flex flex-row-1 h-10">
        <button
          onClick={() => handleCopy(token.tokenAddress)}
          className="flex justify-around  px-4 py-2 w-1/2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <p className="text-gray-800 dark:text-gray-200 mb-2">
            {`${token.tokenAddress.slice(0, 4)}...`}
          </p>
          <RxClipboardCopy />
        </button>

        <div className="relative w-1/2 group">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
            Preview
          </button>
          <p className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded shadow-lg max-w-full overflow-auto hidden group-hover:block">
            {token.description || "N/A"}
          </p>
        </div>
      </div>

      {/* Links */}
      {token.links && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Links:</p>
          <ul className="flex flex-wrap gap-2">
            {token.links.map((link, idx) => (
              <li key={idx} className="flex items-center gap-1">
                {getIconComponent(link.type || "")}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500"
                >
                  {link.label || link.type}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
