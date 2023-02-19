import {
  Box,
  Button,
  ListIcon,
  ListItem,
  SlideFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

type ICollapsableListItem = {
  name?: string;
  children: React.ReactNode;
};

const CollapsableListItem: React.FC<ICollapsableListItem> = ({
  name,
  children,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ListItem my={2}>
      <Button
        onClick={onToggle}
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Text>{name || "Item"}</Text>
        <ListIcon as={isOpen ? BsArrowUp : BsArrowDown} />
      </Button>
      {isOpen && (
        <Box pl={"5px"}>
          <SlideFade in={isOpen}>
            <Box borderLeft={"1px"} pl={"5px"}>
              {children}
            </Box>
          </SlideFade>
        </Box>
      )}
    </ListItem>
  );
};

export default CollapsableListItem;
