import { createSlice } from "@reduxjs/toolkit";

const initialState = {
cartListItems:null,
cartItemsCountData:null
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
       billingList:(state,action)=>{
        state.cartListItems = action.payload.cartListItems
        state.cartItemsCountData = action.payload.cartItemsCountData
       }
    }
})

export const {billingList}= productSlice.actions
export default productSlice.reducer