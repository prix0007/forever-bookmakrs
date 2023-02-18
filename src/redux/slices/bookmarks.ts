import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type Bookmark = {
  id: string;
  name: string;
  url: string;
  tags?: string[];
  color?: string;
};

export type Collection = {
  name: string;
  id: string;
  bookmarks?: Bookmark[];
  collections?: Collection[];
};

export type InitState = {
  isInitialLoaded: boolean;
  isSynced: boolean;
  bookmarks: Bookmark[];
};

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    isInitialLoaded: false,
    isSynced: false,
    bookmarks: Array<Bookmark>(),
  } as InitState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.bookmarks.push(action.payload);
      return state;
    },
    removeBookmark: (state, action: PayloadAction<{ id: string }>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload.id
      );
      return state;
    },
    setSynced: (state, action: PayloadAction<boolean>) => {
      state.isSynced = action.payload;
      return state;
    },
    setAllBookmarks: (state, action: PayloadAction<InitState>) => {
      return { ...action.payload };
    },
  },
});

export const { addBookmark, removeBookmark, setAllBookmarks, setSynced } =
  bookmarkSlice.actions;
