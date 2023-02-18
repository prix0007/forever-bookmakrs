import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import InputBookmark from "../components/home/inputBookmark";
import ListBookmarks from "../components/home/listBookmarks";

const Home = () => {
  return (
    <Box>
      <Container py={2} maxWidth={{ base: "300px", md: "800px" }}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <BsFillBookmarkCheckFill fontSize={"32px"} />
          <Heading>Forever Bookmarks</Heading>
        </Flex>
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
