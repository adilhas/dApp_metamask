const icons = import.meta.glob("/src/assets/icons/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const getIconBySymbol = (symbol: string): string | undefined => {
  const iconPath = `/src/assets/icons/${symbol}.svg`;
  return icons[iconPath];
};

export const formateCurrency = (amount: number, currency: string) => {
  const formatedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
  return formatedCurrency;
};
