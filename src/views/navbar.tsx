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
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";

import Blockies from "react-blockies";
import { shortenString } from "../utils";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: address,
    enabled: !!address,
  });

  return (
    <Box py={2}>
      <Container px={2} maxW={{ base: "800px" }}>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "flex-start", md: "space-between" }}
        >
          <Box display={"flex"}>
            <Link to={"/home"}>
              <Button variant={"solid"} fontWeight="bold" mr={2}>
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button variant={"solid"} fontWeight="bold">
                About
              </Button>
            </Link>
          </Box>
          <Box mt={{ base: "1em", md: "0em" }} display={"flex"}>
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
                    <MenuButton as={Button}>
                      <Blockies
                        seed={address as `0x${string}`}
                        size={16}
                        scale={2}
                      />
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
                            {balance.formatted}{" "}
                            {balance.symbol}
                          </Text>
                        )}
                      </Box>
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
