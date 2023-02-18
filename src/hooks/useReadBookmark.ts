import { useContractRead, useQuery } from "wagmi";
import { CIDString } from "web3.storage";

import bookmarkContractsAbi from "../abis/bookmarks_storage";
import constants from "../constants";
import { Bookmark } from "../redux/slices/bookmarks";
import { getDecodedCidData } from "../web3storage";

const useBookmarkData = (address: `0x${string}` | undefined) => {
  const contractAddress = constants[3141].bookmarksStorageAddress;

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: bookmarkContractsAbi,
    functionName: "bookmarks",
    args: [address],
    enabled: !!address,
  });

  return useQuery(["bookmarkData"], {
    queryFn: async () => {
      const bookmarkData = await getDecodedCidData(data as CIDString);
      if (bookmarkData) {
        return bookmarkData;
      } else {
        return [];
      }
    },
    refetchInterval: 5000,
    cacheTime: 5000,
    enabled: !isError && !!data,
  });
};

export default useBookmarkData;
