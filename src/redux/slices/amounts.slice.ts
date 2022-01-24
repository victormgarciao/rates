import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { replaceDotForCommaOf } from '../../utils/replaceDotForCommaOf/replaceDotForCommaOf';
import { RootState } from '../store/store';

interface IAmountsState {
    topAmount: string,
    botAmount: string,
}


const initialState: IAmountsState = {
    topAmount: '',
    botAmount: '',
}


function getAmountFormatted(amount : number) : string {
    const amountToText = amount > 0
        ? `+${amount}`
        : amount.toString();
    
    return replaceDotForCommaOf(amountToText);
}


export const amountsSlice = createSlice({
    name: 'amounts',
    initialState,
    reducers: {
        setTopAmountAsString: (state, action: PayloadAction<string>) => {
            state.topAmount = replaceDotForCommaOf(action.payload);
        },
        setBotAmountAsString: (state, action: PayloadAction<string>) => {
            state.botAmount = replaceDotForCommaOf(action.payload);
        },
        setTopAmountAsNumber: (state, action: PayloadAction<number>) => {
            state.topAmount = getAmountFormatted(action.payload);

        },
        setBotAmountAsNumber: (state, action: PayloadAction<number>) => {
            state.botAmount = getAmountFormatted(action.payload);

        },
        resetAmounts: () => initialState,
    },
});


export const selectTopAmount = (state: RootState) => state.amounts.topAmount;
export const selectBotAmount = (state: RootState) => state.amounts.botAmount;


export const { setTopAmountAsString, setBotAmountAsString, setTopAmountAsNumber, setBotAmountAsNumber, resetAmounts } = amountsSlice.actions;


export default amountsSlice.reducer;