import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <Box
      minH={"100vh"}
      minW={"100vw"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading fontSize={"15em"}>404</Heading>
      <Text mb={"5em"}>The page you are trying to find does't exist! </Text>
      <Link to={"/"}>
        <Button variant={"solid"} colorScheme={"blue"}>Go Home </Button>
      </Link>
    </Box>
  );
};

export default NoPage;
