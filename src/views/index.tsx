import {
  Container,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Logo from "../icons/logo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `

# Upcoming Features

- [X] Syncing with FEVM Chain 
- [ ] Themeing and colors with each bookmarks
- [ ] Collections
- [ ] Nested Collections
- [ ] Export All functionality

`;

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
        <Box>
          <Heading fontSize={"20px"}>
            Works everywhere, anywhere. Access it from browser, app, extension
            you decide.
          </Heading>
        </Box>
        <Box my={2}>
          <Text fontWeight={"bold"} color={"coral"}>
            Steps to use
          </Text>
          <UnorderedList>
            <ListItem>Connect you metamask wallet.</ListItem>
            <ListItem>Click on Bookmarks tab on `Navbar`</ListItem>
            <ListItem>Add your bookmarks locally.</ListItem>
            <ListItem>
              Once you are done, sync with the chain from account menu clicking
              on navbar Account Icon
            </ListItem>
            <ListItem>
              Yayy!! You have done it. It will stay forever attached to your
              wallet account
            </ListItem>
          </UnorderedList>
        </Box>
        <Box mt={5}>
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </Box>
      </Container>
    </Box>
  );
};

export const indexLoader = () => {
  return <div>Loading...</div>;
};

export default Index;
