import { createSlice } from "@reduxjs/toolkit";

const UserorderSlice = createSlice({
  name: "Userorder",
  initialState: {
    orders: [],
    status:'inprogress'
  },
  reducers: {
  
    addOrderIntoOrders: (state, action) => {
      let data = action.payload;
      data.status = state.status
      state.orders = [...state.orders, data];
    },
  },
});

export const { setUserorder, addOrderIntoOrders } = UserorderSlice.actions;
export default UserorderSlice;
