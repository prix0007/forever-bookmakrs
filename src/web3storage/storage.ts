import { storeFile, getFileUrl, checkStatus, getDecodedCidData } from ".";

const useWeb3Storage = () => {
  return {
    store: storeFile,
    fileUrl: getFileUrl,
    status: checkStatus,
    getData: getDecodedCidData,
  };
};

export default useWeb3Storage;
