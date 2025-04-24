import { useWallet } from "../../context/WalletContext";
import ConnectWallet from "./ConnectWallet";
import WalletDetails from "./WalletDetails";

const Wallet = () => {
  const { isConnected } = useWallet();

  return (
    <div className=" mx-auto mt-10 ">
      {!isConnected ? <ConnectWallet /> : <WalletDetails />}
    </div>
  );
};

export default Wallet;
