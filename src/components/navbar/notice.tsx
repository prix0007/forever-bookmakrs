import { Box, Button, Link, Text } from "@chakra-ui/react";
import React from "react";

const Notice = () => {
  return (
    <Box
      background={"coral"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontWeight={"bold"}>
        This app currrently work only on filecoin's hyperspace testnet.
      </Text>
      <Link
        href="https://chainlist.org/chain/3141"
        target={"_blank"}
        rel={"noopener noreferrer"}
        ml={2}
      >
        <Button>Add it to your wallet</Button>
      </Link>
    </Box>
  );
};

export default Notice;
