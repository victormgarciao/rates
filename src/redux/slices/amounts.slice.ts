import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store/store";

interface IAmountsState {
    topAmount: string,
    botAmount: string,
}

const initialState: IAmountsState = {
    topAmount: '',
    botAmount: '',
}

export const amountsSlice = createSlice({
    name: 'amounts',
    initialState,
    reducers: {
        setTopAmount: (state, action: PayloadAction<string>) => {
            state.topAmount = action.payload;
        },
        setBotAmount: (state, action: PayloadAction<string>) => {
            state.botAmount = action.payload;
        },
    },
});

export const selectTopAmount = (state: RootState) => state.amounts.topAmount;
export const selectBotAmount = (state: RootState) => state.amounts.botAmount;

export const { setTopAmount, setBotAmount } = amountsSlice.actions;

export default amountsSlice.reducer;