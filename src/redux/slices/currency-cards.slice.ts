import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';


export enum CurrencyCardType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};


interface ICurrencyCardsState {
    active: CurrencyCardType,
}


const initialState: ICurrencyCardsState = {
    active: CurrencyCardType.TOP,
}


export const currencyCardsSlice = createSlice({
    name: 'currencyCards',
    initialState,
    reducers: {
        setActiveCard: (state, action: PayloadAction<CurrencyCardType>) => {
            state.active = action.payload;
        },
        resetCurrencyCards: () => initialState,
    },
});


export const selectActiveCard = (state: RootState) => state.activeCard.active;
// export const selectIsTopActiveCard = (state: RootState) => state.activeCard.isTopCardActive;
export const selectIsTopActiveCard = (state: RootState) => state.activeCard.active === CurrencyCardType.TOP;


export const { setActiveCard, resetCurrencyCards } = currencyCardsSlice.actions;


export default currencyCardsSlice.reducer;
