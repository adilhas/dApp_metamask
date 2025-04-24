import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  connectWallet: () => void;
  address: string | null;
  balance: string;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

// Energi Network Info
const ENERGI_RPC = "https://nodeapi.energi.network/v1/jsonrpc";
const ENERGI_CHAIN_ID = "0x9b75"; // Hex for 39797

const switchToEnergiNetwork = async () => {
  try {
    await window.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ENERGI_CHAIN_ID }],
    });
  } catch (switchError) {
    if ((switchError as { code: number }).code === 4902) {
      // Add Energi Network if not found
      await window.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ENERGI_CHAIN_ID,
            chainName: "Energi Mainnet",
            rpcUrls: [ENERGI_RPC],
            nativeCurrency: {
              name: "Energi",
              symbol: "NRG",
              decimals: 18,
            },
            blockExplorerUrls: ["https://explorer.energi.network/"],
          },
        ],
      });
    } else {
      console.error("Failed to switch to Energi Network", switchError);
    }
  }
};

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install Metamask!");

    await switchToEnergiNetwork(); // ensure Energi network is selected

    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    const bal = await provider.getBalance(account);

    setAddress(account);
    setBalance(ethers.formatEther(bal));
    setIsConnected(true);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAddress(null);
      setBalance("0");
      setIsConnected(false);
    } else {
      connectWallet();
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{ connectWallet, address, balance, isConnected }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext)!;
