import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.items.find(item => item.name === action.payload.name);
      // console.log(`itemInCart: ${itemInCart}`);
      if(itemInCart) {  
        itemInCart.quantity += 1;
        console.log('item quantity increased');
      }
      else {
        state.items.push({
          ...action.payload,
          totalCost: 0,
          quantity: 1,
        });
        console.log("item added");
      }
    },
    removeItem: (state, action) => {
      console.log("item removed");
      state.items = state.items.filter(item => item.name !== action.payload);      
    },
    incrementQuantity:(state, action) => {
      const itemToChange = state.items.find(item => 
      item.name === action.payload);
      if(itemToChange) { 
        itemToChange.quantity += 1;
        // itemToChange.totalCost = itemToChange.cost * itemToChange.quantity;
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
        itemToUpdate.quantity += quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity,updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
