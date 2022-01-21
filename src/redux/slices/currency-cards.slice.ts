import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';


export enum CurrencyCardType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};


interface ICurrencyCardsState {
    active: CurrencyCardType,
    isTopCardActive: boolean,
}


const initialState: ICurrencyCardsState = {
    active: CurrencyCardType.TOP,
    isTopCardActive: true,
}


export const currencyCardsSlice = createSlice({
    name: 'currencyCards',
    initialState,
    reducers: {
        setActiveCard: (state, action: PayloadAction<CurrencyCardType>) => {
            state.active = action.payload;
            state.isTopCardActive = action.payload === CurrencyCardType.TOP;
        }
    },
});


export const selectActiveCard = (state: RootState) => state.activeCard.active;
export const selectIsTopActiveCard = (state: RootState) => state.activeCard.isTopCardActive;


export const { setActiveCard } = currencyCardsSlice.actions;


export default currencyCardsSlice.reducer;
