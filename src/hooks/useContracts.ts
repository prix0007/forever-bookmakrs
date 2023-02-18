import { Provider } from "@wagmi/core";
import { Signer } from "ethers";

import bookmarkContractsAbi from "../abis/bookmarks_storage";
import constants from "../constants";
import { useContract } from "wagmi";

const useContracts = (
  chainId: number,
  signer: Signer | undefined | null
) => {
  const contractAddress = constants[3141].bookmarksStorageAddress;
 
  const bookmarksContract = useContract({
    address: contractAddress as `0x${string}`,
    abi: bookmarkContractsAbi,
    signerOrProvider: signer,
  });

  return {
    bookmarksContract: bookmarksContract,
  };
};

export default useContracts;
