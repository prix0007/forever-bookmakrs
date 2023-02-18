import {
  Box,
  Button,
  Container,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useAccount, useConnect, useDisconnect } from "wagmi";
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
                        alignItems={"center"}
                        justifyContent={"center"}
                        minH={"40px"}
                      >
                        <Text>{`${shortenString(
                          address as `0x${string}`
                        )}`}</Text>
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
