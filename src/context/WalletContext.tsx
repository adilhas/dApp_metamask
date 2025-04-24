import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

interface WalletContextType {
  connectWallet: () => void;
  address: string | null;
  balance: string;
  isConnected: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true); // <- NEW loading state

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install Metamask!");

    await switchToEnergiNetwork();

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
    const checkIfWalletIsConnected = async () => {
      if (!window.ethereum) {
        setLoading(false);
        return;
      }

      try {
        await switchToEnergiNetwork();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
          const account = accounts[0].address;
          const bal = await provider.getBalance(account);
          setAddress(account);
          setBalance(ethers.formatEther(bal));
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to auto-connect wallet:", error);
      } finally {
        setLoading(false); // <- Stop loading after check
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    };

    checkIfWalletIsConnected();

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
      value={{ connectWallet, address, balance, isConnected, loading }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext)!;
