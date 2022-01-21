import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';

export enum Currencies {
    GBP = 'GBP',
    USD = 'USD',
    EUR = 'EUR',
};

interface ICurrentySelectorsState {
    topCurrency: Currencies,
    botCurrency: Currencies,
}


const initialState: ICurrentySelectorsState = {
    topCurrency: Currencies.USD,
    botCurrency: Currencies.EUR,
}


export const currencySelectorsSlice = createSlice({
    name: 'currenciySelectors',
    initialState,
    reducers: {
        setTopCurrency: (state, action: PayloadAction<Currencies>) => {
            state.topCurrency = action.payload;
        },
        setBotCurrency: (state, action: PayloadAction<Currencies>) => {
            state.botCurrency = action.payload;
        },
    },
});


export const selectTopCurrency = (state: RootState) => state.currenciySelectors.topCurrency;
export const selectBotCurrency = (state: RootState) => state.currenciySelectors.botCurrency;


export const { setTopCurrency, setBotCurrency } = currencySelectorsSlice.actions;


export default currencySelectorsSlice.reducer;
