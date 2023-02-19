import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { Collection } from "../../redux/slices/bookmarks";

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
      <Button my={2} onClick={addCollectionToTheStore} colorScheme={"blue"}>
        Create Collection
      </Button>
    </Form>
  );
};

export default InputCollection;
