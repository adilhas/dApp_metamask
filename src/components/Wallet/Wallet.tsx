import { useWallet } from "../../context/WalletContext";
import { formateCurrency } from "../../utils/formateUtils";

const Wallet = () => {
  const { connectWallet, address, balance, isConnected } = useWallet();

  const usdRate = 3200;
  const usdValue = parseFloat(balance) * usdRate;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 rounded  transition"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <strong>Wallet Address:</strong>{" "}
            <p className="break-all">{address}</p>
          </div>
          <div>
            <strong>ETH Balance:</strong> {parseFloat(balance).toFixed(4)} ETH
          </div>
          <div>
            <strong>USD Value:</strong> {formateCurrency(usdValue, "USD")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
