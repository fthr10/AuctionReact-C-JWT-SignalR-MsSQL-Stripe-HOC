import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    vehicles:{},
}

export const vehicleSlice = createSlice({
    name: "vehicle",
    initialState:initalState,
    reducers: {
        getVehicles:(state,action)=>{
            state.vehicles = action.payload;
        }

    }
})

export const { getVehicles } = vehicleSlice.actions;
export const vehicleReducer = vehicleSlice.reducer;