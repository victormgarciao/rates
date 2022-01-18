import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store/store";

export interface IRates {
    [key: string]: number;
}

interface RatesState {
    value: IRates
}

const initialState: RatesState = {
    value: {},
}

export const ratesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers:{
        setRates: (state, action: PayloadAction<IRates>) => {
            state.value = action.payload;
        },
    },
});

export const selectRatesValues = (state: RootState) => state.rates.value;

export const { setRates } = ratesSlice.actions;

export default ratesSlice.reducer;
