import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Box>
      <Container p={2}>
        <Heading textAlign={"center"}>About</Heading>
        <Text>
          A Bookmark manager forever. Access Anywhere and Use anyplace.
        </Text>
      </Container>
    </Box>
  );
};

export const aboutLoader = () => {
  return <div>Loading...</div>;
};

export default About;
