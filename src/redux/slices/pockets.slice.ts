import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { replaceDotForCommaOf } from '../../utils/replaceDotForCommaOf/replaceDotForCommaOf';
import { RootState } from '../store/store';
import { Currencies, Symbols } from './currency-cards.slice';

export interface IPocket {
    symbol: Symbols,
    amount: string,
}

export interface IPocketsState {
    [key: string]: IPocket,
}


const initialState: IPocketsState = {
    [Currencies.EUR]: { symbol: Symbols.EUR, amount: '1000' },
    [Currencies.GBP]: { symbol: Symbols.GBP, amount: '500' },
    [Currencies.USD]: { symbol: Symbols.USD, amount: '200' },
}


export const pocketsSlice = createSlice({
    name: 'pockets',
    initialState,
    reducers: {
        setPocketAmount: (state, action:  PayloadAction<{ currency: Currencies, amount: string }>) => {
            const keyPocket = action.payload.currency;
            state[`${keyPocket}`].amount = replaceDotForCommaOf(action.payload.amount);
        },
        resetPockets: () => initialState,
    },
});


export const selectPockets = (state: RootState) => state.pockets;


export const { setPocketAmount, resetPockets } = pocketsSlice.actions;


export default pocketsSlice.reducer;