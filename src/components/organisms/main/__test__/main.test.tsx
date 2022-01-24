import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Main } from '../main';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store/store';
import { setRates } from '../../../../redux/slices/rates.slice';
import { resetCurrencyCards, selectIsTopActiveCard } from '../../../../redux/slices/currency-cards.slice';
import { Currencies, resetCurrencySelectors } from '../../../../redux/slices/currency-selectors.slices';
import { resetAmounts } from '../../../../redux/slices/amounts.slice';

describe('main' , () => {
    const mockRates = {
        'EUR': 0.88154,
        'GBP': 0.73355,
        'USD': 1,
    };

    function resetStore(): void {
        store.dispatch(resetAmounts());
        store.dispatch(resetCurrencySelectors());
        store.dispatch(resetCurrencyCards());
        store.dispatch(setRates(mockRates));
    }

    function getCurrencySelectorStates() {
        return store.getState().currenciySelectors;
    }

    function getAmountStates() {
        return store.getState().amounts;
    }
    
    function getActiveCardStates() {
        return selectIsTopActiveCard(store.getState());
    }

    beforeEach(() => resetStore());

    afterEach(() => cleanup());

    describe('Different renders', () => {
        test('Render the element', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const mainElement = screen.getByTestId('main');
            expect(mainElement).toBeInTheDocument();
        });
    
        test('Render header', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const headerElement = screen.getByTestId('header');
            expect(headerElement).toBeInTheDocument();
        });
    
        test('Render cards wrapper', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const cardsWrapperElement = screen.getByTestId('cardsWrapper');
            expect(cardsWrapperElement).toBeInTheDocument();
        });
        
        test('cardsWrapper has 3 elements', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const cardsWrapperElement = screen.getByTestId('cardsWrapper');
            expect(cardsWrapperElement.childElementCount).toBe(3);
        });
    })
    
    
    describe('button behaviour', () => {
        test('Renders the button component', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeInTheDocument();
        });

        test('There is only 1 button', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const buttonElementList = screen.getAllByRole('button');
            expect(buttonElementList.length).toBe(1);
        });

        test('has class cta-transaction-direction', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toHaveClass('cta-transaction-direction');
        });

        test('button has class active by default', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toHaveClass('active');
        });

        test('Toggles class active on button when click it', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toHaveClass('active');

            // Click on Button
            fireEvent.click(buttonElement);
            expect(buttonElement).not.toHaveClass('active');

            // Click on Button
            fireEvent.click(buttonElement);
            expect(buttonElement).toHaveClass('active');
        });

        test('Toggles isTopCardActive state on button when click it', async () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const buttonElement = screen.getByRole('button');
            expect(selectIsTopActiveCard(store.getState())).toBe(true);
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getActiveCardStates()).toBe(false);
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getActiveCardStates()).toBe(true);
        });

        test('Change the value prefix of different amount values on click', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');

            // Check amounts are emtpy and top card is active
            expect(getAmountStates().topAmount).toBe('');
            expect(getAmountStates().botAmount).toBe('');
            expect(getActiveCardStates()).toBe(true);

            // Set some value to topAmount
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });

            // Check amounts has changed and top has + at the start and bot -
            expect(getAmountStates().topAmount).not.toBe('');
            expect(getAmountStates().botAmount).not.toBe('');
            expect(getAmountStates().topAmount.startsWith('-')).toBe(true);
            expect(getAmountStates().botAmount.startsWith('+')).toBe(true);

            const buttonElement = screen.getByRole('button');
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getAmountStates().topAmount.startsWith('+')).toBe(true);
            expect(getAmountStates().botAmount.startsWith('-')).toBe(true);
        });

        test('Not Change input values if they are empty', () => {
            render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            // Check amounts are emtpy and top card is active
            expect(getAmountStates().topAmount).toBe('');
            expect(getAmountStates().botAmount).toBe('');

            const buttonElement = screen.getByRole('button');
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getAmountStates().topAmount).toBe('');
            expect(getAmountStates().botAmount).toBe('');
        });
    });


    describe('CurrencyCards', () => {
        test('Renders 2 currency cards components', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const cards = container.querySelectorAll('.currency-card');
            expect(cards.length).toBe(2);
        });


        describe('Top Currency Card', () => {
            test('There is 1 with class TOP-card', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <Main />
                    </Provider>
                );
                const cards = container.querySelectorAll('.TOP-card');
                expect(cards.length).toBe(1);
            });

            test('It has a selector with default value USD', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <Main />
                    </Provider>
                );
                const topSelector: any  = container
                    .querySelector('.TOP-card')!
                    .querySelector('.currency-selector');

                expect(topSelector).toHaveValue(Currencies.USD);
            });

            test('It has an input with default empty string value', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <Main />
                    </Provider>
                );
                const inputSelector = container
                    .querySelector('.TOP-card')!
                    .querySelector('input');

                expect(inputSelector).toHaveValue('');
            });
        });


        describe('Bottom Currency Card', () => {
            test('There is 1 with class BOT-card', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <Main />
                    </Provider>
                );
                const cards = container.querySelectorAll('.BOTTOM-card');
                expect(cards.length).toBe(1);
            });

            test('It has a selector with default value USD', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <Main />
                    </Provider>
                );
                const botSelector: any = container
                    .querySelector('.BOTTOM-card')!
                    .querySelector('.currency-selector');

                expect(botSelector).toHaveValue(Currencies.EUR);
            });

            test('It has an input with default empty string value', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <Main />
                    </Provider>
                );
                const inputSelector = container
                    .querySelector('.BOTTOM-card')!
                    .querySelector('input');

                expect(inputSelector).toHaveValue('');
            });
        });
    });


    describe('currencySelectors', () => {
        test('Top selector will change topCurrency value on store', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            const topSelector: any  = container
                .querySelector('.TOP-card')!
                .querySelector('.currency-selector');
    
            expect(topSelector).toHaveValue(Currencies.USD);
            expect(getCurrencySelectorStates().topCurrency).toBe(Currencies.USD);
            
            fireEvent.change(topSelector, { target: { value: Currencies.GBP } } );
            expect(getCurrencySelectorStates().topCurrency).toBe(Currencies.GBP);
            expect(topSelector).toHaveValue(Currencies.GBP);
        });

        test('Swap selector values if they are the same when change', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topSelector: any  = container
                .querySelector('.TOP-card')!
                .querySelector('.currency-selector');

            expect(topSelector).toHaveValue(Currencies.USD);
            
            const botSelector: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('.currency-selector');

            expect(botSelector).toHaveValue(Currencies.EUR);

            fireEvent.change(topSelector, { target: { value: Currencies.EUR } } );
            expect(topSelector).toHaveValue(Currencies.EUR);
            expect(botSelector).toHaveValue(Currencies.USD);
        });

        test('change value only of the non active input (The amount I would get)', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topSelector: any  = container
                .querySelector('.TOP-card')!
                .querySelector('.currency-selector');

            const topInput: any = container
                    .querySelector('.TOP-card')!
                    .querySelector('input');
            
            // Check Top card is active (so, bottom is not active)
            expect(getActiveCardStates()).toBe(true);

            // Let's set a value on top
            fireEvent.change(topInput, { target : { value: '33' } });

            // Check both top and bot values and store them
            const topAmountBefore = getAmountStates().topAmount;
            const botAmountBefore = getAmountStates().botAmount;

            fireEvent.change(topSelector, { target: { value: Currencies.EUR } } );
            expect(getAmountStates().topAmount).toBe(topAmountBefore);
            expect(getAmountStates().botAmount).not.toBe(botAmountBefore);
        });
    });


    describe('currencyInput', () => {
        test('Value starts on "-" when you set a value on the active card', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            
            // Check top card is active
            expect(getActiveCardStates()).toBe(true);

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');

            // type '33' on the input
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });
            expect(topCurrencyInput).toHaveValue('-33');
            expect(getAmountStates().topAmount).toBe('-33');
        });

        test('Value starts on "+" when you set a value on the non active card', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );
            
            // Check bottom card is not active
            const isTopCardActive = getActiveCardStates();
            expect(isTopCardActive).toBe(true);

            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');

            // type '33' on the input
            fireEvent.change(bottomCurrencyInput, { target: { value: '33' } });
            expect(bottomCurrencyInput).toHaveValue('+33');
        });

        test('Change value of the bottom card on change the top one', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
            
            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');
            
            // Check bottom input is empty
            expect(bottomCurrencyInput).toHaveValue('');
            
            // type value on top
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });
            expect(bottomCurrencyInput).not.toHaveValue('');
        });

        test('Change value of the top card on change the bottom one', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
            
            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');
            
            // Check top input is empty
            expect(topCurrencyInput).toHaveValue('');
            
            // type value on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '33' } });
            expect(topCurrencyInput).not.toHaveValue('');
        });

        test('Change topAmount store value of the bottom card on change the top one', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
        
            // botAmount is emty
            expect(getAmountStates().botAmount).toBe('');
            
            // type value on top
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });
            expect(getAmountStates().botAmount).not.toBe('');
        });

        test('Change botAmountValue value of the top card on change the bottom one', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');
                
            // top amount is empty
            expect(getAmountStates().topAmount).toBe('');
            
            // type value on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '33' } });
            expect(getAmountStates().topAmount).not.toBe('');
        });

        test('Values of both will be "0" if one of them change to empty', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
            
            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');
             
            // both top and bot values are emtpy
            expect(topCurrencyInput).toHaveValue('');
            expect(bottomCurrencyInput).toHaveValue('');
            
            // set 33 on top
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });
            expect(topCurrencyInput).not.toHaveValue('');
            expect(bottomCurrencyInput).not.toHaveValue('');

            // set 0 on top
            fireEvent.change(topCurrencyInput, { target: { value: '' } });
            expect(topCurrencyInput).toHaveValue('0');
            expect(bottomCurrencyInput).toHaveValue('0');

            // set 33 on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '33' } });
            expect(topCurrencyInput).not.toHaveValue('');
            expect(bottomCurrencyInput).not.toHaveValue('');

            // set 0 on bot
            fireEvent.change(bottomCurrencyInput, {target: { value: '' } });
            expect(topCurrencyInput).toHaveValue('0');
            expect(bottomCurrencyInput).toHaveValue('0');
        });

        test('value is the same when tries to type a non valie char', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
            
            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');

            // Write AB on top
            fireEvent.change(topCurrencyInput, { target: { value: '-33AB' } });
            expect(topCurrencyInput).toHaveValue('');

            // Write AB on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '-33AB' } });
            expect(bottomCurrencyInput).toHaveValue('');
        });

        test('value is the same when tries to type a second dot or comma', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
            
            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');

            // Write -33,02, on top
            fireEvent.change(topCurrencyInput, { target: { value: '-33,02,' } });
            expect(topCurrencyInput).toHaveValue('');

            // Write -33,02, on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '-33,02,' } });
            expect(bottomCurrencyInput).toHaveValue('');

            // Write -33.02. on top
            fireEvent.change(topCurrencyInput, { target: { value: '-33.02.' } });
            expect(topCurrencyInput).toHaveValue('');

            // Write -33.02. on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '-33.02.' } });
            expect(bottomCurrencyInput).toHaveValue('');
        });

        test('Replace dot for comma on value', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
            
            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');

            // Write 33.02 on top
            fireEvent.change(topCurrencyInput, { target: { value: '33.02' } });
            expect(topCurrencyInput).toHaveValue('-33,02');

            // Write 33.02 on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '33.02' } });
            expect(bottomCurrencyInput).toHaveValue('+33,02');
        });
    });

    describe('Calculations and Interactions', () => {
        test('Does the correct rate calculation and fixes it to 2 decimals', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <Main />
                </Provider>
            );

            const topCard: any = container.querySelector('.TOP-card')
            const botCard: any = container.querySelector('.BOTTOM-card')

            const topCurrencyInput: any = topCard.querySelector('input');
            const bottomCurrencyInput: any = botCard.querySelector('input');

            const topSelector: any  = topCard.querySelector('.currency-selector');
            const botSelector: any = botCard.querySelector('.currency-selector');

            // Check first selector is USD and second EUR
            expect(getCurrencySelectorStates().topCurrency).toBe('USD');
            expect(getCurrencySelectorStates().botCurrency).toBe('EUR');
                
            expect(topCurrencyInput).toHaveValue('');
            expect(bottomCurrencyInput).toHaveValue('');
            
            // set 1 on top (1$ is 0.88154€ in mockRates)
            fireEvent.change(topCurrencyInput, { target: { value: '1' } });
            expect(topCurrencyInput).toHaveValue('-1');
            expect(bottomCurrencyInput).toHaveValue('+0,88');
            
            // Change bot selector to GBP (1$ is 0.73355GBP in mockRates)
            fireEvent.change(botSelector, { target: { value: 'GBP' } });
            expect(topCurrencyInput).toHaveValue('-1');
            expect(bottomCurrencyInput).toHaveValue('+0,73');
            
            // Change top selector to EUR (if 1$ is 0.88154€ and 1$ is 0.73355GBP 1GBP should be 0,83€)
            fireEvent.change(topSelector, { target: { value: 'EUR' } });
            expect(topCurrencyInput).toHaveValue('-1');
            expect(bottomCurrencyInput).toHaveValue('+0,83');
        });
    });
});