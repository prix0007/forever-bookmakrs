import { Container, Box, Heading, Text } from "@chakra-ui/react";
import Logo from "../icons/logo";

const Index = () => {
  return (
    <Box>
      <Container py={2} maxWidth={{ base: "300px", md: "800px" }}>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          my={5}
        >
          <Logo width={120} height={80} color={"teal"} />
          <Heading>Forever Bookmarks</Heading>
          <Text color={"purple"}>Making bookmarks stay forever</Text>
        </Box>
      </Container>
    </Box>
  );
};

export const indexLoader = () => {
  return <div>Loading...</div>;
};

export default Index;
