import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSigner,
} from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";

import Blockies from "react-blockies";
import { shortenString } from "../utils";
import useWeb3Storage from "../web3storage/storage";
import { useSelector } from "../redux/store";
import useContracts from "../hooks/useContracts";
import { useEffect, useState } from "react";
import useBookmarkData from "../hooks/useReadBookmark";
import { useDispatch } from "react-redux";
import {
  InitState,
  normalizeBookmarks,
  setAllBookmarks,
  setSynced,
} from "../redux/slices/bookmarks";

import { encode } from "js-base64";

import Logo from "../icons/logo";
import Notice from "../components/navbar/notice";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { store } = useWeb3Storage();

  const toast = useToast();

  const { data: signer } = useSigner({
    // ChainId of Filecoin Hyperspace
    chainId: 3141,
  });

  const { bookmarksContract } = useContracts(3141, signer);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const {
    root: allbookmarks,
    isInitialLoaded,
    isSynced,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const {
    data: bookmarksSynced,
    isLoading: bookmarksSyncing,
    isError: bookmarksError,
  } = useBookmarkData(address);

  useEffect(() => {
    if (allbookmarks && bookmarksSynced) {
      // Check if bookmarks !== bookmarksSynced -> Not Synced to blockchain, else synced.
      const hashLocal = encode(JSON.stringify(allbookmarks));
      const hashChain = encode(JSON.stringify(bookmarksSynced));
      dispatch(setSynced(hashChain === hashLocal));
    } else {
      dispatch(setSynced(false));
    }
  }, [allbookmarks, bookmarksSynced]);

  useEffect(() => {
    dispatch(normalizeBookmarks());
  }, [allbookmarks]);

  // Load Initial Bookmarks to Redux
  useEffect(() => {
    if (!bookmarksSyncing && !bookmarksError && !isInitialLoaded) {
      const initState: InitState = {
        isInitialLoaded: bookmarksSynced ? true : false,
        isSynced: bookmarksSynced ? true : false,
        root: {
          ...bookmarksSynced,
        },
        normalizedRoot: {
          bookmarks: [],
          collections: [],
        },
      };
      // dispatch(setAllBookmarks(initState));
      if (bookmarksSynced) {
        toast({
          title: "Bookmarks Synced.",
          duration: 1000,
          status: "info",
        });
      }
    }
  }, [bookmarksSynced]);

  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: address,
    enabled: !!address,
  });

  const [txnLoading, setTxnLoading] = useState(false);

  const handleSave = async () => {
    if (isSynced) {
      toast({
        title: "Already Synced with Chain :)",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      return;
    }

    setTxnLoading(true);
    const cid = await store(allbookmarks);
    try {
      const txn = await bookmarksContract?.storeBookmark(cid);
      const txnReciept = await txn.wait();
      console.log(txnReciept);
      toast({
        title: `Saved Successfully`,
        description: `Sucess with txn: ${txnReciept?.transactionHash}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: `Something Went Wrong `,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setTxnLoading(false);
  };

  const normalise = () => {
    dispatch(normalizeBookmarks());
  };

  return (
    <Box>
      <Notice />
      <Container py={2} px={2} maxW={{ base: "800px" }}>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
        >
          <Box display={"flex"}>
            <Link to={"/"}>
              <Logo width={40} color={"teal"} />
            </Link>
            <Link to={"/home"}>
              <Button variant={"solid"} fontWeight="bold" mx={2}>
                Bookmarks
              </Button>
            </Link>
            <Link to="/about">
              <Button variant={"solid"} fontWeight="bold">
                About
              </Button>
            </Link>
          </Box>
          <Box mt={{ base: "1em", md: "0em" }} display={"flex"}>
            <Button onClick={normalise}>Normalise</Button>
            <Button onClick={toggleColorMode}>
              {colorMode !== "light" ? (
                <BsFillSunFill />
              ) : (
                <BsFillMoonStarsFill />
              )}
            </Button>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box mx={1}>
                {isConnected ? (
                  <Menu>
                    <MenuButton as={Button} disabled={txnLoading}>
                      {txnLoading ? (
                        <CircularProgress isIndeterminate size={"24px"} />
                      ) : (
                        <Blockies
                          seed={address as `0x${string}`}
                          size={16}
                          scale={2}
                        />
                      )}
                    </MenuButton>
                    <MenuList>
                      <Box
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        minH={"40px"}
                      >
                        <Text fontSize={"20px"}>{`${shortenString(
                          address as `0x${string}`
                        )}`}</Text>
                        {isLoading && <CircularProgress isIndeterminate />}
                        {balance && (
                          <Text fontWeight={"semibold"}>
                            {balance.formatted} {balance.symbol}
                          </Text>
                        )}
                      </Box>
                      <MenuItem onClick={handleSave}>Sync to Chain</MenuItem>
                      <MenuItem onClick={() => disconnect()}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button
                    onClick={() => {
                      connect();
                    }}
                  >
                    Connect
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
