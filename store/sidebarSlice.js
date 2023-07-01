import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandSidebar: true,
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.expandSidebar = !state.expandSidebar;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
