import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { addBookmark, Bookmark } from "../../redux/slices/bookmarks";
import { validateURL } from "../../utils";


const initialBookmark = (id: string) => ({
  name: "My Super Link",
  id: id,
  url: "https://google.com",
  color: "",
});

const initialErrorState = {
  name: "",
  url: "",
};

const InputBookmark = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<Bookmark>(() => ({
    ...initialBookmark(nanoid()),
  }));

  const [formErrors, setFormError] = useState({
    ...initialErrorState,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = (): boolean => {
    let isValid = true;
    let newErrorState = {
      ...initialErrorState,
    };
    ["name", "url"].map((key) => {
      switch (key) {
        case "name":
          if (formState.name.trim().length <= 3) {
            isValid = false;
            newErrorState.name = "Required to be more than 3 characters";
          }
          break;
        case "url":
          if (!validateURL(formState.url.trim())) {
            isValid = false;
            newErrorState.url = "Not a valid url!!";
          }
          break;
      }
    });
    setFormError({
      ...newErrorState,
    });
    return isValid;
  };

  const addBookmarkToStore = () => {
    if (!handleValidation()) {
      return;
    }
    dispatch(addBookmark(formState));
    setFormState({
      ...initialBookmark(nanoid()),
    });
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
      <FormControl isRequired>
        <FormLabel>URL</FormLabel>
        <Input
          placeholder="URL for your bookmark"
          name="url"
          value={formState.url}
          onChange={handleChange}
          borderColor={!!formErrors.url ? "red" : "green"}
        />
        {formErrors.url && (
          <FormHelperText color={"red"}>{formErrors.url}</FormHelperText>
        )}
      </FormControl>
      <Button my={2} onClick={addBookmarkToStore} colorScheme={"blue"}>
        Add Bookmark
      </Button>
    </Form>
  );
};

export default InputBookmark;
