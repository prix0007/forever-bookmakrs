import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";

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
  bookmarks: Bookmark[];
  collections: Collection[];
};

export type NormalizedCollection = {
  name: string;
  id: string;
};

export type InitState = {
  isInitialLoaded: boolean;
  isSynced: boolean;
  root: Collection;
  normalizedRoot: {
    bookmarks: Bookmark[];
    collections: NormalizedCollection[];
  };
};

const normalizeData = (
  bookmarks: Bookmark[],
  collections: NormalizedCollection[],
  root: Collection
): { bookmarks: Bookmark[]; collections: NormalizedCollection[] } => {
  const oldBookmarks = root?.bookmarks;
  const oldCollections = root?.collections;

  if (!oldBookmarks) {
    return {
      bookmarks: [...bookmarks],
      collections: [...collections],
    };
  }

  if (oldCollections) {
    for (let i = 0; i < oldCollections.length; ++i) {
      const { bookmarks: newBookmarks, collections: newCollections } =
        normalizeData(bookmarks, collections, oldCollections[i]);
      bookmarks = [...newBookmarks];
      collections = [
        ...newCollections,
        { id: oldCollections[i].id, name: oldCollections[i].name },
      ];
    }
  }

  return {
    bookmarks: [...bookmarks, ...oldBookmarks],
    collections: [...collections],
  };
};

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    isInitialLoaded: false,
    isSynced: false,
    root: {
      name: "root",
      id: nanoid(),
      bookmarks: [
        {
          id: nanoid(),
          name: "Google",
          url: "https://google.com",
        },
        {
          id: nanoid(),
          name: "Google 1",
          url: "https://google.com/1",
        },
        {
          id: nanoid(),
          name: "Google 2",
          url: "https://google.com/2",
        },
        {
          id: nanoid(),
          name: "Google 4",
          url: "https://google.com/4",
        },
      ],
      collections: [
        {
          name: "Study",
          id: nanoid(),
          bookmarks: [
            {
              id: nanoid(),
              name: "Google 11",
              url: "https://google.com/1",
            },
          ],
          collections: [
            {
              name: "Science",
              id: nanoid(),
              bookmarks: [
                {
                  id: nanoid(),
                  name: "Nester 333",
                  url: "https://somelink.com",
                },
              ],
            },
            {
              name: "Maths",
              id: nanoid(),
              bookmarks: [
                {
                  id: nanoid(),
                  name: "Maths Nested 444",
                  url: "https://somelink.com",
                },
              ],
            },
            {
              name: "Zero Knowledge",
              id: nanoid(),
              bookmarks: [
                {
                  id: nanoid(),
                  name: "ZKP Nested 123",
                  url: "https://somelink.com",
                },
                {
                  id: nanoid(),
                  name: "ZKP Nested 234",
                  url: "https://somelink.com",
                },
                {
                  id: nanoid(),
                  name: "ZKP Nested 345",
                  url: "https://somelink.com",
                },
              ],
              collections: [
                {
                  id: nanoid(),
                  name: "Creating SNS",
                  bookmarks: [],
                  collections: [],
                },
              ],
            },
          ],
        },
      ],
    },
    normalizedRoot: {
      bookmarks: [],
      collections: [],
    },
  } as InitState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.root.bookmarks.push(action.payload);
      return state;
    },
    removeBookmark: (state, action: PayloadAction<{ id: string }>) => {
      state.root.bookmarks = state.root.bookmarks.filter(
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
    normalizeBookmarks: (state) => {
      const rootState = current(state.root);
      const normalizedData = normalizeData([], [], rootState);
      state.normalizedRoot = { ...normalizedData };
      return state;
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  setAllBookmarks,
  setSynced,
  normalizeBookmarks,
} = bookmarkSlice.actions;
