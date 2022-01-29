import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ExchangeScreen } from '../exchange-screen';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store/store';
import { setRates } from '../../../../redux/slices/rates.slice';
import { Currencies, resetCurrencyCards, selectIsTopSellingCard } from '../../../../redux/slices/currency-cards.slice';

describe('ExchangeScreen' , () => {
    const mockRates = {
        'EUR': 0.88154,
        'GBP': 0.73355,
        'USD': 1,
    };

    function resetStore(): void {
        store.dispatch(resetCurrencyCards());
        store.dispatch(setRates(mockRates));
    }

    function getCurrencyCardsStates() {
        return store.getState().currencyCards;
    }
    
    function getIsTopCardSellStates() {
        return selectIsTopSellingCard(store.getState());
    }

    beforeEach(() => resetStore());

    afterEach(() => cleanup());

    describe('Different renders', () => {
        test('Render the element', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const exchangeScreenElement = screen.getByTestId('exchange-screen');
            expect(exchangeScreenElement).toBeInTheDocument();
        });
    
        test('Render header', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const headerElement = screen.getByTestId('exchange-screen-header');
            expect(headerElement).toBeInTheDocument();
        });
    
        test('Render cards wrapper', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const cardsWrapperElement = screen.getByTestId('cardsWrapper');
            expect(cardsWrapperElement).toBeInTheDocument();
        });
        
        test('cardsWrapper has 3 elements', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const cardsWrapperElement = screen.getByTestId('cardsWrapper');
            expect(cardsWrapperElement.childElementCount).toBe(3);
        });

        test('There are 2 buttons', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const buttonElementList = screen.getAllByRole('button');
            expect(buttonElementList.length).toBe(2);
        });
    })
    
    
    describe('swap currencies button behaviour', () => {
        test('Renders the swap currencies button component', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const buttonElement = screen.getByTestId('cta-swap-currencies');
            expect(buttonElement).toBeInTheDocument();
        });

        test('has class cta-transaction-direction', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const buttonElement = screen.getByTestId('cta-swap-currencies');
            expect(buttonElement).toHaveClass('cta-transaction-direction');
        });

        test('swap currencies button has class active by default', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const buttonElement = screen.getByTestId('cta-swap-currencies');
            expect(buttonElement).toHaveClass('active');
        });

        test('Toggles class active on swap currencies button when click it', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const buttonElement = screen.getByTestId('cta-swap-currencies');
            expect(buttonElement).toHaveClass('active');

            // Click on Button
            fireEvent.click(buttonElement);
            expect(buttonElement).not.toHaveClass('active');

            // Click on Button
            fireEvent.click(buttonElement);
            expect(buttonElement).toHaveClass('active');
        });

        test('Toggles isTopCardActive state on swap currencies button when click it', async () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );

            const buttonElement = screen.getByTestId('cta-swap-currencies');
            expect(selectIsTopSellingCard(store.getState())).toBe(true);
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getIsTopCardSellStates()).toBe(false);
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getIsTopCardSellStates()).toBe(true);
        });

        test('Change the value prefix of different amount values on click', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');

            // Check amounts are emtpy and top card is active
            expect(getCurrencyCardsStates().topCard.amount).toBe('');
            expect(getCurrencyCardsStates().bottomCard.amount).toBe('');
            expect(getIsTopCardSellStates()).toBe(true);

            // Set some value to topAmount
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });

            // Check amounts has changed and top has + at the start and bot -
            expect(getCurrencyCardsStates().topCard.amount).not.toBe('');
            expect(getCurrencyCardsStates().bottomCard.amount).not.toBe('');
            expect(getCurrencyCardsStates().topCard.amount.startsWith('-')).toBe(true);
            expect(getCurrencyCardsStates().bottomCard.amount.startsWith('+')).toBe(true);

            const buttonElement = screen.getByTestId('cta-swap-currencies');
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getCurrencyCardsStates().topCard.amount.startsWith('+')).toBe(true);
            expect(getCurrencyCardsStates().bottomCard.amount.startsWith('-')).toBe(true);
        });

        test('Not Change input values if they are empty', () => {
            render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );

            // Check amounts are emtpy and top card is active
            expect(getCurrencyCardsStates().topCard.amount).toBe('');
            expect(getCurrencyCardsStates().bottomCard.amount).toBe('');

            const buttonElement = screen.getByTestId('cta-swap-currencies');
            
            // Click on Button
            fireEvent.click(buttonElement);
            expect(getCurrencyCardsStates().topCard.amount).toBe('');
            expect(getCurrencyCardsStates().bottomCard.amount).toBe('');
        });
    });


    describe('CurrencyCards', () => {
        test('Renders 2 currency cards components', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const cards = container.querySelectorAll('.currency-card');
            expect(cards.length).toBe(2);
        });


        describe('Top Currency Card', () => {
            test('There is 1 with class TOP-card', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <ExchangeScreen />
                    </Provider>
                );
                const cards = container.querySelectorAll('.TOP-card');
                expect(cards.length).toBe(1);
            });

            test('It has a selector with default value USD', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <ExchangeScreen />
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
                        <ExchangeScreen />
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
                        <ExchangeScreen />
                    </Provider>
                );
                const cards = container.querySelectorAll('.BOTTOM-card');
                expect(cards.length).toBe(1);
            });

            test('It has a selector with default value USD', () => {
                const { container }: { container: HTMLElement } = render(
                    <Provider store={store}>
                        <ExchangeScreen />
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
                        <ExchangeScreen />
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
        test('Top selector will change.topCard.currency value on store', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            const topSelector: any  = container
                .querySelector('.TOP-card')!
                .querySelector('.currency-selector');
    
            expect(topSelector).toHaveValue(Currencies.USD);
            expect(getCurrencyCardsStates().topCard.currency).toBe(Currencies.USD);
            
            fireEvent.change(topSelector, { target: { value: Currencies.GBP } } );
            expect(getCurrencyCardsStates().topCard.currency).toBe(Currencies.GBP);
            expect(topSelector).toHaveValue(Currencies.GBP);
        });

        test('Swap selector values if they are the same when change', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
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
                    <ExchangeScreen />
                </Provider>
            );

            const topSelector: any  = container
                .querySelector('.TOP-card')!
                .querySelector('.currency-selector');

            const topInput: any = container
                    .querySelector('.TOP-card')!
                    .querySelector('input');
            
            // Check Top card is active (so, bottom is not active)
            expect(getIsTopCardSellStates()).toBe(true);

            // Let's set a value on top
            fireEvent.change(topInput, { target : { value: '33' } });

            // Check both top and bot values and store them
            const topAmountBefore = getCurrencyCardsStates().topCard.amount;
            const botAmountBefore = getCurrencyCardsStates().bottomCard.amount;

            fireEvent.change(topSelector, { target: { value: Currencies.EUR } } );
            expect(getCurrencyCardsStates().topCard.amount).toBe(topAmountBefore);
            expect(getCurrencyCardsStates().bottomCard.amount).not.toBe(botAmountBefore);
        });
    });


    describe('currencyInput', () => {
        test('Value starts on "-" when you set a value on the active card', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            
            // Check top card is active
            expect(getIsTopCardSellStates()).toBe(true);

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');

            // type '33' on the input
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });
            expect(topCurrencyInput).toHaveValue('-33');
            expect(getCurrencyCardsStates().topCard.amount).toBe('-33');
        });

        test('Value starts on "+" when you set a value on the non active card', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );
            
            // Check bottom card is not active
            const isTopCardActive = getIsTopCardSellStates();
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
                    <ExchangeScreen />
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
                    <ExchangeScreen />
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
                    <ExchangeScreen />
                </Provider>
            );

            const topCurrencyInput: any = container
                .querySelector('.TOP-card')!
                .querySelector('input');
        
            // botAmount is emty
            expect(getCurrencyCardsStates().bottomCard.amount).toBe('');
            
            // type value on top
            fireEvent.change(topCurrencyInput, { target: { value: '33' } });
            expect(getCurrencyCardsStates().bottomCard.amount).not.toBe('');
        });

        test('Change botAmountValue value of the top card on change the bottom one', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
                </Provider>
            );

            const bottomCurrencyInput: any = container
                .querySelector('.BOTTOM-card')!
                .querySelector('input');
                
            // top amount is empty
            expect(getCurrencyCardsStates().topCard.amount).toBe('');
            
            // type value on bot
            fireEvent.change(bottomCurrencyInput, { target: { value: '33' } });
            expect(getCurrencyCardsStates().topCard.amount).not.toBe('');
        });

        test('Values of both will be "0" if one of them change to empty', () => {
            const { container }: { container: HTMLElement } = render(
                <Provider store={store}>
                    <ExchangeScreen />
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
                    <ExchangeScreen />
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
                    <ExchangeScreen />
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
                    <ExchangeScreen />
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
                    <ExchangeScreen />
                </Provider>
            );

            const topCard: any = container.querySelector('.TOP-card')
            const botCard: any = container.querySelector('.BOTTOM-card')

            const topCurrencyInput: any = topCard.querySelector('input');
            const bottomCurrencyInput: any = botCard.querySelector('input');

            const topSelector: any  = topCard.querySelector('.currency-selector');
            const botSelector: any = botCard.querySelector('.currency-selector');

            // Check first selector is USD and second EUR
            expect(getCurrencyCardsStates().topCard.currency).toBe('USD');
            expect(getCurrencyCardsStates().bottomCard.currency).toBe('EUR');
                
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