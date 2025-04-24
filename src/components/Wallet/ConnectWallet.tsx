import { useWallet } from "../../context/WalletContext";

const ConnectWallet = () => {
  const { connectWallet } = useWallet();

  return (
    <div className="text-center p-4 sm:p-6">
      <div className="w-32 sm:w-52 mx-auto mb-4">
        <img
          src="/src/assets/metamask.svg"
          alt="metamask_logo"
          className="w-full"
        />
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">METAMASK</h1>
      <button
        onClick={connectWallet}
        className="px-6 py-3 rounded transition btn btn-success text-lg sm:text-xl text-white"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
