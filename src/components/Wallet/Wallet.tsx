import { useWallet } from "../../context/WalletContext";
import ConnectWallet from "./ConnectWallet";
import WalletDetails from "./WalletDetails";

const Wallet = () => {
  const { isConnected, loading } = useWallet();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className=" mx-auto mt-10 ">
      {!isConnected ? <ConnectWallet /> : <WalletDetails />}
    </div>
  );
};

export default Wallet;
