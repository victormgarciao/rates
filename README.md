# Structure

    - src
        - components (Application pieces)
            - atoms (Smallest pieces)
                - currency-input (inputs for amounts)
                    - \__tests__
                    - currency-input.tsx
                    - currency-input.css
                - currency-selector (slector for rates)
                    - \__tests__
                    - currency-selector.tsx
                    - currency-selector.css
                - header
                    - \__tests__
                    - header.tsx
                    - header.css
                - pocket-left
                    - \__tests__
                    - pocket-left.tsx
                    - pocket-left.css
                - pocket-right
                    - \__tests__
                    - pocket-right.tsx
                    - pocket-right.css
            - molecules
                - currency-card (Card that will contain selector and input)
                    - \__tests__
                    - currency-card.tsx
                    - currency-card.css
                - pocket (Card that will contain selector and input)
                    - \__tests__
                    - pocket.tsx
                    - pocket.css
            - organisms
                - main
                    - \__tests__
                    - main.tsx
                    - main.css
                - exchange-screen
                    - \__tests__
                    - exchange-screen.tsx
                    - exchange-screen.css
                - pockets
                    - \__tests__
                    - pockets.tsx
                    - pockets.css
        - hooks (Where the logic happens)
            - use-amounts.ts (for logic amount)
            - use-currency-cards.ts (for cards logic)
            - use-currency-selectors.ts (for selector logic)
            - use-init-app.ts (for initialization logic)
            - use-pockets.ts (for pockets logic)
        - redux (Here we will store the app data)
            - store
                - store.tsx
            - slices (Redux toolkit library slices (reducers, actions, selectors inside))
                -currency-cards.slice.ts
                -pockets.slice.ts
                -rates.slice.ts
                -screens.slice.ts
        - utils (Some custom utils created to make us the life easier (and more readable))
            - fixAvoiding0Decimals (Check if a string ends by a comma or dot)
                - \__tests__
                - fixAvoiding0Decimals.ts
            - formatNumber (Check if a string ends by a comma or dot)
                - \__tests__
                - formatNumber.ts
            - hasEndedWithDotOrComma (Check if a string ends by a comma or dot)
                - \__tests__
                - hasEndedWithDotOrComma.ts
            - isLastDigitNotNumber (Check if last digit is not a number which is valid for the app)
                - \__tests__
                - isLastDigitNotNumber.ts
            - isRightFormatAmount (Check if the format of the amount is valid)
                - \__tests__
                - isRightFormatAmount.ts
            - replaceDotForCommaOf (Replaces any dot for a comma on a string)
                - \__tests__
                - replaceDotForCommaOf.ts

The rest of the files basically where implemented by create-react-app and barely modified.

# Libraries I have installed

## Redux toolkit https://redux-toolkit.js.org/
    
It is a library that makes your life easier in terms of developoing reducers, actions and selectors.

The piece of the store that you are making with this library is called slice, and you can set the initial state and actions. Also I have created some custom selectors trying to make the code more readable.

    // rates.slice.ts
    import { createSlice, PayloadAction } from '@reduxjs/toolkit'
    import { RootState } from '../store/store'; // Type of the root state


    export interface IRates { // Type of rates
        [key: string]: number;
    }


    interface IRatesState { // Type of rates container
        data: IRates
    }


    const initialState: IRatesState = { // Initial state
        data: {},
    }


    export const ratesSlice = createSlice({ // Create the slice
        name: 'rates', // slice name
        initialState, // initial state
        reducers:{ // Reducers
            setRates: (state, action: PayloadAction<IRates>) => { // By typing the payload you have safer actions
                state.data = action.payload;
            },
            resetRates: () => initialState // Nice reset slice
        },
    });

    // Custom selector, A readable way when we use useSelector 
    // useSelector(selectRatesValues) VS useSelector((state) => state.rates.data)
    export const selectRatesValues = (state: RootState) => state.rates.data;

    // Actinos
    export const { setRates, resetRates } = ratesSlice.actions;

    // Exporting reducer
    export default ratesSlice.reducer;
    ```

The reducer you are exporting should go to the store and use it like this

    // store.tsx

    import ratesReducer from '../slices/rates.slice';
    // more imports

    export const store = configureStore({
        reducer: {
            rates: ratesReducer,
            // more reducers
        },
    });

    // code


## Axios https://github.com/axios/axios

Library to get data from APIs 
    
    // use-init-app.ts

    // more code
    async function getRatesRequest(): Promise<IRates> {
        return axios
            .get('https://freecurrencyapi.net/api/v2/latest?apikey=5ca83ea0-79e5-11ec-8c3d-57529e73566c')
            .then((rateRequest : AxiosResponse): IRates => rateRequest.data.data);
    }
    // more code

## Lodash https://lodash.com/docs/4.17.15

    This famous library can makes your code more readable and clean and there are some of their functions over the application

## Awesome 4.7 https://fontawesome.com/v4.7/

This is not a npm library but it is used to have cool fonts and icons really easy to use.

    `<i className='fa fa-long-arrow-up' aria-hidden='true' />`


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
