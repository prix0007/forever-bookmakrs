import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Box,
} from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { Collection, NormalizedCollection } from "../../redux/slices/bookmarks";
import { useSelector } from "../../redux/store";

const initialCollection = (id: string) => ({
  name: "",
  id: id,
  bookmarks: [],
  collections: [],
});

const initialErrorState = {
  name: "",
};

const InputCollection = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<Collection>(() => ({
    ...initialCollection(nanoid()),
  }));

  const [formErrors, setFormError] = useState({
    ...initialErrorState,
  });

  const handleValidation = (): boolean => {
    let isValid = true;
    let newErrorState = {
      ...initialErrorState,
    };
    ["name"].map((key) => {
      switch (key) {
        case "name":
          if (formState.name.trim().length <= 3) {
            isValid = false;
            newErrorState.name = "Required to be more than 3 characters";
          }
          break;
      }
    });
    setFormError({
      ...newErrorState,
    });
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const addCollectionToTheStore = () => {
    if (!handleValidation()) {
      return;
    }
    console.log("Add this collection to the store");
  };

  const { collections } = useSelector((state) => state.normalizedRoot);

  const [selectedCollection, setSelectionCollection] = useState<
    string | undefined
  >();

  const selectedItem = useMemo(() => {
    if (selectedCollection) {
      return collections.find(
        (collection) => collection.id === selectedCollection
      )?.name;
    } else {
      return "root";
    }
  }, [selectedCollection]);

  return (
    <Form>
      <FormControl isRequired my={2}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name you bookmark"
          name="name"
          value={formState.name}
          onChange={handleChange}
          borderColor={!!formErrors.name ? "red" : "green"}
        />
        {formErrors.name && (
          <FormHelperText color={"red"}>{formErrors.name}</FormHelperText>
        )}
      </FormControl>
      <Box w={"100%"}>
        <Menu>
          <MenuButton as={Button} colorScheme="blue" w={"100%"}>
            {selectedItem}
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              type="radio"
              onChange={(e) => {
                setSelectionCollection(e as string);
              }}
            >
              {collections.map((collectionItem) => {
                return (
                  <MenuItemOption
                    value={collectionItem.id}
                    key={collectionItem.id}
                  >
                    {collectionItem.name}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
      <Button my={2} onClick={addCollectionToTheStore} colorScheme={"blue"}>
        Create Collection
      </Button>
    </Form>
  );
};

export default InputCollection;
