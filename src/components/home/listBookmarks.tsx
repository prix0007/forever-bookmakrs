import {
  Box,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { MdCopyAll, MdDelete } from "react-icons/md";
import { Bookmark, removeBookmark } from "../../redux/slices/bookmarks";
import copy from "copy-to-clipboard";
import { useSelector } from "../../redux/store";

type IBookmarkItem = {
  bookmark: Bookmark;
};
const BookmarkItem: React.FC<IBookmarkItem> = ({ bookmark }) => {
  const fontSizeName = {
    base: "18px",
    md: "20px",
  };
  const fontSizeUrl = {
    base: "14px",
    md: "16px",
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
      p={2}
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
          <Text mx={2} fontSize={fontSizeUrl}>
            {bookmark.url}
          </Text>
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

const ListBookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks);

  return (
    <Box>
      <Heading>Bookmarks</Heading>
      <List>
        {bookmarks.map((bookmark: Bookmark) => {
          return <BookmarkItem bookmark={bookmark} key={bookmark.id} />;
        })}
      </List>
    </Box>
  );
};

export default ListBookmarks;
