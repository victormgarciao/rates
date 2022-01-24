import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';


export interface IRates {
    [key: string]: number;
}


interface IRatesState {
    data: IRates
}


const initialState: IRatesState = {
    data: {},
}


export const ratesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers:{
        setRates: (state, action: PayloadAction<IRates>) => {
            state.data = action.payload;
        },
        resetRates: () => initialState
    },
});


export const selectRatesValues = (state: RootState) => state.rates.data;


export const { setRates, resetRates } = ratesSlice.actions;


export default ratesSlice.reducer;
