import { decode, encode } from "js-base64";
import { CIDString, Status, Web3Storage } from "web3.storage";

const createClient = (): Web3Storage => {
  return new Web3Storage({ token: import.meta.env.VITE_WEB_STORAGE_API });
};

const storeFile = async (obj: any): Promise<CIDString> => {
  const client = createClient();
  const uploadObj = {
    data: encode(JSON.stringify(obj)),
  };
  const blob = new Blob([JSON.stringify(uploadObj)], {
    type: "application/json",
  });
  const files = [new File([blob], "bookmarks.json")];
  return client.put(files);
};

const getFileUrl = (cid: CIDString): string => {
  const formattedLink = `https://${cid}.ipfs.w3s.link/bookmarks.json`;
  return formattedLink;
};

const getDecodedCidData = async (cid: CIDString): Promise<any> => {
  const url = getFileUrl(cid);
  const res = await fetch(url);
  const jsonData = await res?.json();
  if (jsonData?.data) {
    const decodeData = decode(jsonData?.data);
    return JSON.parse(decodeData);
  } else {
    return null;
  }
};

const checkStatus = async (cid: CIDString): Promise<Status | undefined> => {
  const client = createClient();
  return client.status(cid);
};

export { storeFile, getFileUrl, checkStatus, getDecodedCidData };
