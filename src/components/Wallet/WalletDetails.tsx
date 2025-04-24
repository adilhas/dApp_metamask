import { useEffect, useState } from "react";
import { useWallet } from "../../context/WalletContext";
import { formateCurrency } from "../../utils/formateUtils";
import CopyIcon from "../../assets/copy-icon.svg";
import DoneIcon from "../../assets/completed-icon.svg";
import { fetchUsdRate } from "../../utils/api";

const WalletDetails = () => {
  const { address, balance } = useWallet();
  const [copied, setCopied] = useState(false);
  const [usdRate, setUsdRate] = useState(1);

  const usdValue = parseFloat(balance) * usdRate;

  const handleCopy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const getRate = async () => {
      const liveRate = await fetchUsdRate();
      setUsdRate(liveRate);
    };
    getRate();
  }, []);

  return (
    <div className="max-w-full sm:max-w-2xl md:max-w-3xl mx-auto p-4 sm:p-6 rounded-xl shadow ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-7 mr-3">
            <img src="/src/assets/NRG.png" alt="NRG" />
          </div>
          <span className="text-lg font-medium">Energi Network</span>
        </div>
        <ul className="text-green-600 list-disc list-inside">
          <li>Connected</li>
        </ul>
      </div>

      <div className="divider my-4" />

      {/* Wallet Address */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center break-all">
          <img
            src="/src/assets/metamask.svg"
            alt="Wallet"
            className="w-7 mr-3"
          />
          <span className="text-sm sm:text-base">{address}</span>
        </div>
        <button
          onClick={handleCopy}
          className="cursor-pointer hover:scale-110 transition"
        >
          <img
            src={copied ? DoneIcon : CopyIcon}
            alt="Copy"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Balance */}
      <div className="my-10 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Total Balance
        </h2>
        <div className="flex justify-center items-center text-3xl sm:text-4xl font-bold mb-2">
          <img
            src="/src/assets/NRG.png"
            alt="NRG"
            className="w-8 sm:w-10 mr-2"
          />
          {parseFloat(balance).toFixed(4)}
        </div>
        <div className="flex justify-center items-center text-3xl sm:text-4xl">
          <span className="mr-2">$</span>
          {formateCurrency(usdValue, "USD")}
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
