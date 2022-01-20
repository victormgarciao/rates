import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from '../slices/rates.slice';
import currencyCardsReducer from '../slices/currency-cards.slice';
import amountsReducer from '../slices/amounts.slice';
import currenciySelectorsReducer from '../slices/currency-selectors.slices';

export const store = configureStore({
    reducer: {
        rates: ratesReducer,
        activeCard: currencyCardsReducer,
        amounts: amountsReducer,
        currenciySelectors: currenciySelectorsReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
