import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favItems: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.favItems.find(i => i.id === item.id);

      if (exists) {
        state.favItems = state.favItems.filter(i => i.id !== item.id);
      } else {
        state.favItems.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
