import { createSlice } from "@reduxjs/toolkit";

export const InitalState : any = {
    auctionBid:Number
}

export const bidSlice = createSlice({
    name:"Bid",
    initialState:InitalState,
    reducers: {
        setBidChange:(state,action) =>{
            state.auctionBid = action.payload;
        }
    }
})

export const { setBidChange } = bidSlice.actions;
export const bidReducer = bidSlice.reducer