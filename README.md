# ⚡ Frontend Challenge

A decentralized application (dApp) built using React + TypeScript for **Energiswap**, showcasing token prices and wallet information via Metamask. It includes account switching, formatted values, and light/dark theme support.

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── assets/             # Token icons and SVGs
│   ├── components/         # UI components
│   │   ├── Home            # Contains components for Home page
│   │   └── Wallet          # Contains components fro Wallet page
│   ├── context/            # Wallet context using ethers.js
│   │   └── WalletContext.tsx
│   ├── types/              # Type definitions
│   ├── utils/              # Utility functions (formatting, icons)
│   └── App.tsx             # Main app component with routing
```

---

## 🚀 Getting Started

### Run the App

```bash
yarn start
```

---

## 🧩 Features

### 🏠 Home Tab

- Displays token list with:
  - Icon
  - Name
  - Ticker
  - Price (USD)
- Columns are **sortable**

### 👛 Wallet Tab

- Connect with **Metamask**
- Shows:
  - Wallet address
  - NRG token balance
  - Converted USD value
- Allows **copy to clipboard**
- Automatically updates when **accounts are switched**

### 🌗 Theme Toggle

- Switch between **light and dark** mode

---

## 🔗 Blockchain Integration

- Built using `ethers.js` for wallet connectivity
- Currently uses **Energi chain ID: 39797**
- Wallet updates via `window.ethereum.on("accountsChanged")`

---

## 📦 Dependencies

- React + TypeScript
- Tailwind CSS
- Ethers.js
- DaisyUI (optional, for design elements)

---

## 📄 Notes

- Token prices are fetched from Energiswap API (or mocked if API unavailable)
- USD values are calculated via a hardcoded or dynamic conversion rate
- Icons dynamically rendered from `/assets` based on token symbol

---

## 🧑‍💻 Author

**Adil Hashmi**  
📧 hashmiadil161@gmail.com  
💼 [LinkedIn]([https://www.linkedin.com/in/adilhashmi/](https://www.linkedin.com/in/adilhash/))

---

## 🫡 Special Thanks

Thanks to the Energi team for this challenge opportunity!
