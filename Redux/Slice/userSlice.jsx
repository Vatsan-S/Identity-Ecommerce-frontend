import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser:null,
    error:null,
    loading:false
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInstart: (state) => {
            state.currentUser = null;
            state.loading = true;
            state.error = null;
          },
          signInFailure: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = action.payload;
          },
          signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          signOutSuccess:(state)=>{
            state.currentUser = null
          }
    }
})


export const{signInstart, signInFailure, signInSuccess, signOutSuccess}= userSlice.actions
export default userSlice.reducer;