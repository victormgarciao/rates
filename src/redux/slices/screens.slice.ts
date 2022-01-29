import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';


interface IScreenState {
    isPocketsScreen: boolean
}


const initialState: IScreenState = {
    isPocketsScreen: true,
}


export const screensSlice = createSlice({
    name: 'screens',
    initialState,
    reducers:{
        setIsPocketsScreen: (state, action: PayloadAction<boolean>) => {
            state.isPocketsScreen = action.payload;
        },
        resetScreens: () => initialState
    },
});


export const selectScreensValues = (state: RootState) => state.screens;
export const selectIsPocketScreen = (state: RootState) => state.screens.isPocketsScreen;


export const { setIsPocketsScreen, resetScreens } = screensSlice.actions;


export default screensSlice.reducer;
