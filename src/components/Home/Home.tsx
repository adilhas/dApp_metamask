import { useEffect, useState } from "react";
import { TokenArr, TokenMap } from "../../types/tokenTypes";
import { fetchAllTokens } from "../../utils/api";
import TokensTable from "./TokensTable";
import SkeletonTable from "./SkeletonTable";

const Home = () => {
  const [allTokensData, setAllTokensData] = useState<TokenMap>({});
  const [tokenArr, setTokenArr] = useState<TokenArr[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Loading state

  useEffect(() => {
    const getAllTokenData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllTokens();
        setAllTokensData(data);
        const tokenArray = Object.entries(allTokensData).map(
          ([address, token]) => ({
            address,
            tokenData: token,
          })
        );
        setTokenArr(tokenArray);
      } catch (error) {
        console.error("Failed to load tokens data:", error);
      } finally {
        setLoading(false); // ✅ Stop loading whether success or error
      }
    };
    getAllTokenData();
  }, []);

  useEffect(() => {
    const tokenArray = Object.entries(allTokensData).map(
      ([address, token]) => ({
        address,
        tokenData: token,
      })
    );
    setTokenArr(tokenArray);
  }, [allTokensData]);

  return (
    <div className="overflow-x-auto my-2 w-full mx-auto">
      {loading ? <SkeletonTable /> : <TokensTable tokenArr={tokenArr} />}
    </div>
  );
};

export default Home;
