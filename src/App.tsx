import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import Wallet from "./components/Wallet/Wallet";
import Body from "./components/Body";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
