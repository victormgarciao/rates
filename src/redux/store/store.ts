import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from '../slices/rates.slice';
import currencyCardsReducer from '../slices/currency-cards.slice';
import pocketsReducer from '../slices/pockets.slice';

export const store = configureStore({
    reducer: {
        rates: ratesReducer,
        currencyCards: currencyCardsReducer,
        pockets: pocketsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
