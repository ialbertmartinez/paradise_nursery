import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.items.find(item => item.name === action.payload.name);
      if(itemInCart) {  
        itemInCart.quantity += 1;
      }
      else {
        state.items.push({
          ...action.payload,
          totalCost: 0,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);      
    },
    incrementQuantity:(state, action) => {
      const itemToChange = state.items.find(item => 
      item.name === action.payload);
      if(itemToChange) { 
        itemToChange.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemToChange = state.items.find(item => 
        item.name === action.payload);
      if(itemToChange && itemToChange.quantity > 0) { itemToChange.quantity -= 1; }
    },
    updateQuantity: (state, action) => {
      const { name, quantity} = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if(itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity,updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
