import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import InputBookmark from "../components/home/inputBookmark";
import ListBookmarks from "../components/home/listBookmarks";

const Home = () => {
  return (
    <Box>
      <Container py={2} maxWidth={{base: "300px", md: "800px"}}>
        <Heading textAlign={"center"}>Forever Bookmarks</Heading>
        <Box>
          <InputBookmark />
        </Box>
        <Box>
          <ListBookmarks />
        </Box>
      </Container>
    </Box>
  );
};

export const homeLoader = () => {
  return <div>Loading...</div>;
};

export default Home;
