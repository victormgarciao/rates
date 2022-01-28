import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';

export enum Currencies {
    GBP = 'GBP',
    USD = 'USD',
    EUR = 'EUR',
};

export enum Symbols {
    EUR = '€',
    GBP = '£', 
    USD = '$',
}


export enum CurrencyCardType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};

export interface ICard {
    currency: Currencies,
    amount: string,
    isExceeded: boolean,
}

interface ICurrencyCardsState {
    sellCardPosition: CurrencyCardType,
    topCard: ICard,
    bottomCard: ICard,
}


const initialState: ICurrencyCardsState = {
    sellCardPosition: CurrencyCardType.TOP,
    topCard: {
        currency: Currencies.USD,
        amount: '',
        isExceeded: false,
    },
    bottomCard: {
        currency: Currencies.EUR,
        amount: '',
        isExceeded: false,
    },
}


export const currencyCardsSlice = createSlice({
    name: 'currencyCards',
    initialState,
    reducers: {
        setTopCard: (state, action: PayloadAction<ICard>) => {
            state.topCard = action.payload;
        },
        setBottomCard: (state, action: PayloadAction<ICard>) => {
            state.bottomCard = action.payload;
        },
        setTopCardAmount: (state, action: PayloadAction<string>) => {
            state.topCard.amount = action.payload;
        },
        setBottomCardAmount: (state, action: PayloadAction<string>) => {
            state.bottomCard.amount = action.payload;
        },
        setTopCardCurrency: (state, action: PayloadAction<Currencies>) => {
            state.topCard.currency = action.payload;
        },
        setBottomCardCurrency: (state, action: PayloadAction<Currencies>) => {
            state.bottomCard.currency = action.payload;
        },
        setTopCardIsExceeded: (state, action: PayloadAction<boolean>) => {
            state.topCard.isExceeded = action.payload;
        },
        setBottomCardIsExceeded: (state, action: PayloadAction<boolean>) => {
            state.bottomCard.isExceeded = action.payload;
        },
        setSellCardPosition: (state, action: PayloadAction<CurrencyCardType>) => {
            state.sellCardPosition = action.payload;
        },
        resetCurrencyCards: () => initialState,
        resetAmounts: (state) => {
            state.topCard.amount = initialState.topCard.amount;
            state.bottomCard.amount = initialState.bottomCard.amount;
        },
        resetIsExceeded: (state) => {
            state.topCard.isExceeded = initialState.topCard.isExceeded;
            state.bottomCard.isExceeded = initialState.bottomCard.isExceeded;
        },
    },
});


export const selectSellCardPosition = (state: RootState) => state.currencyCards.sellCardPosition;
export const selectTopCard = (state: RootState) => state.currencyCards.topCard;
export const selectBottomCard = (state: RootState) => state.currencyCards.bottomCard;


export const selectIsTopSellingCard = (state: RootState) => state.currencyCards.sellCardPosition === CurrencyCardType.TOP;


export const {
    resetCurrencyCards,
    setTopCard,
    setBottomCard,
    setSellCardPosition,
    setTopCardAmount,
    setBottomCardAmount,
    setTopCardCurrency,
    setBottomCardCurrency,
    setTopCardIsExceeded,
    setBottomCardIsExceeded,
    resetAmounts,
    resetIsExceeded,
} = currencyCardsSlice.actions;


export default currencyCardsSlice.reducer;
