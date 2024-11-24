import { ReactNode } from "react";
import { FaGithub, FaGlobe, FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { SiCoinmarketcap } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";

export const getIconComponent = (type: string): ReactNode => {
  switch (type.toLowerCase()) {
    case "github":
      return <FaGithub className="text-lg text-gray-600" />;
    case "twitter":
      return <RiTwitterXLine className="text-lg text-blue-400" />;
    case "website":
      return <FaGlobe className="text-lg text-green-500" />;
    case "discord":
      return <FaDiscord className="text-lg text-green-500" />;
    case "telegram":
      return <FaTelegramPlane className="text-lg text-green-500" />;
    case "coinmarketcap":
      return <SiCoinmarketcap className="text-lg text-green-500" />;
    default:
      return <FaGlobe className="text-lg text-gray-400" />;
  }
};
