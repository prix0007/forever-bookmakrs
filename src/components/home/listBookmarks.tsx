import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { MdCopyAll, MdDangerous, MdDelete } from "react-icons/md";
import {
  Bookmark,
  Collection,
  removeBookmark,
} from "../../redux/slices/bookmarks";
import copy from "copy-to-clipboard";
import { useSelector } from "../../redux/store";
import { BsCheck2Circle } from "react-icons/bs";
import CollapsableListItem from "./collapsableListItem";

type IBookmarkItem = {
  bookmark: Bookmark;
};
const BookmarkItem: React.FC<IBookmarkItem> = ({ bookmark }) => {
  const fontSizeName = {
    base: "14px",
    md: "16px",
  };
  const fontSizeUrl = {
    base: "12px",
    md: "14px",
  };

  const toast = useToast();

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeBookmark({ id: bookmark.id }));
    toast({
      title: "Deleted Bookmark",
      duration: 1000,
      status: "info",
    });
  };

  const copyToClipboard = () => {
    copy(bookmark.url);
    toast({
      title: "URL Copied",
      duration: 1000,
      status: "success",
    });
  };

  return (
    <ListItem
      p={1}
      my={1}
      borderRadius={"2px"}
      display={"flex"}
      alignItems={"center"}
      w={"100%"}
      background={bookmark.color}
      borderWidth={"1px"}
      borderColor={"primary"}
    >
      <Box display={"flex"} justifyContent={"space-between"} w={"100%"}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Text mx={2} fontWeight={"bold"} fontSize={fontSizeName}>
            {bookmark.name}
          </Text>
          <Link
            href={bookmark.url}
            target={"_blank"}
            rel={"noreferer noopener"}
            mx={2}
            fontSize={fontSizeUrl}
          >
            {bookmark.url}
          </Link>
        </Box>
        <Box>
          <Tooltip label={"Copy URL"} placement={"top"}>
            <IconButton
              aria-label="copy"
              borderRadius={"20px"}
              colorScheme={"gray"}
              mx={2}
              onClick={copyToClipboard}
            >
              <MdCopyAll />
            </IconButton>
          </Tooltip>
          <Tooltip label={"Delete"} placement={"top"}>
            <IconButton
              aria-label="delete"
              borderRadius={"20px"}
              colorScheme={"red"}
              mx={2}
              onClick={deleteItem}
            >
              <MdDelete />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </ListItem>
  );
};

type IDisplayCollection = {
  collection: Collection;
};
const DisplayCollection: React.FC<IDisplayCollection> = ({ collection }) => {
  const {
    bookmarks: localBookmarks,
    collections: localCollections,
    name: localCollectionName,
    id: localCollectionKey,
  } = collection;
  return (
    <List>
      <CollapsableListItem name={localCollectionName}>
        <List>
          {localBookmarks &&
            localBookmarks.map((bookmark: Bookmark) => {
              return <BookmarkItem bookmark={bookmark} key={bookmark.id} />;
            })}
        </List>
        {localCollections &&
          localCollections.map((collection, index) => {
            return (
              <DisplayCollection
                collection={collection}
                key={localCollectionKey + "nested" + index}
              />
            );
          })}
      </CollapsableListItem>
    </List>
  );
};

const ListBookmarks = () => {
  const {
    root: { bookmarks, collections },
    isSynced,
  } = useSelector((state) => state);

  return (
    <Box my={2}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading fontSize={"22px"}>All Bookmarks</Heading>
        {isSynced ? (
          <BsCheck2Circle color="green" />
        ) : (
          <MdDangerous color="red" />
        )}
      </Flex>
      <List>
        {bookmarks &&
          bookmarks.map((bookmark: Bookmark) => {
            return <BookmarkItem bookmark={bookmark} key={bookmark.id} />;
          })}
        {collections &&
          collections.map((collection: Collection) => {
            return (
              <DisplayCollection collection={collection} key={"root nested"} />
            );
          })}
      </List>
    </Box>
  );
};

export default ListBookmarks;
