import { Box, Button, Container, List, useColorMode } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <Box py={2}>
      <Container px={2}>
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
          <Box mt={{ base: "1em", md: "0em" }}>
            <Button onClick={toggleColorMode}>
              {colorMode !== "light" ? (
                <BsFillSunFill />
              ) : (
                <BsFillMoonStarsFill />
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
