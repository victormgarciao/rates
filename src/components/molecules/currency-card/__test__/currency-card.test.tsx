import { ChangeEvent } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CurrencyCard } from '../currency-card';
import { Currencies } from '../../../../redux/slices/currency-selectors.slices';
import { CurrencyCardType } from '../../../../redux/slices/currency-cards.slice';

describe('CurrencyCard' , () => {
    let onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void = jest.fn();
    let onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void = jest.fn();

    afterEach(() => cleanup());

    describe('only with mandatory params', () => {
        test('Render the element', () => {
            render(
                <CurrencyCard 
                    onChangeSelector={onChangeSelector}
                    onChangeAmount={onChangeAmount}
                />
            );
            const cardElement: HTMLInputElement = screen.getByTestId('currency-card');
            expect(cardElement).toBeInTheDocument();
        });

        test('Contains class currency-card', () => {
            render(
                <CurrencyCard 
                    onChangeSelector={onChangeSelector}
                    onChangeAmount={onChangeAmount}
                />
            );
            const cardElement: HTMLInputElement = screen.getByTestId('currency-card');
            expect(cardElement).toHaveClass('currency-card');
        });

        test('By default it has TOP-card class', () => {
            render(
                <CurrencyCard 
                    onChangeSelector={onChangeSelector}
                    onChangeAmount={onChangeAmount}
                />
            );
            const cardElement: HTMLInputElement = screen.getByTestId('currency-card');
            expect(cardElement).toHaveClass('TOP-card');
        });

        test('It has BOTTOM-card or TOP-card if we pass it', () => {
            const { rerender } = render(
                <CurrencyCard 
                    onChangeSelector={onChangeSelector}
                    onChangeAmount={onChangeAmount}
                    currencyCardType={CurrencyCardType.BOTTOM}
                />
            );
            const cardElement: HTMLInputElement = screen.getByTestId('currency-card');
            expect(cardElement).toHaveClass('BOTTOM-card');
            
            rerender(
                <CurrencyCard 
                    onChangeSelector={onChangeSelector}
                    onChangeAmount={onChangeAmount}
                    currencyCardType={CurrencyCardType.TOP}
                />
            );

            expect(cardElement).toHaveClass('TOP-card');
        });

 
        describe('Currency Input', () => {
            test('Contains one currency-input component', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                    />
                );
                const inputElementList = (await screen.findAllByTestId('currency-input'));
                
                expect(inputElementList.length).toBe(1);
            });

            test('Value is "" by default', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                    />
                );
                const inputElementList = (await screen.findByTestId('currency-input'));
                
                expect(inputElementList).toHaveValue('');
            });

            test('Value is the same than amountValue', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                        amountValue='33'
                    />
                );
                const inputElementList = (await screen.findByTestId('currency-input'));
                
                expect(inputElementList).toHaveValue('33');
            });

            test('onChangeAmount is called if you change the value', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                    />
                );
                const inputElementList = (await screen.findByTestId('currency-input'));

                fireEvent.change(inputElementList, { target: { value: '33' } });
                
                expect(onChangeAmount).toBeCalled();
            });
        });


        describe('Currency Selector', () => {
            test('Contains one currency-selector component', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                    />
                );
                const selectorElementList = (await screen.findAllByTestId('currency-selector'));
                
                expect(selectorElementList.length).toBe(1);
            });
            
            test('Value is USD by default', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                    />
                );
                const selectorElementList = (await screen.findByTestId('currency-selector'));
                
                expect(selectorElementList).toHaveValue(Currencies.USD);
            });
            
            test('Value is USD by default', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                        currencyValue={Currencies.GBP}
                    />
                );
                const selectorElementList = (await screen.findByTestId('currency-selector'));
                
                expect(selectorElementList).toHaveValue(Currencies.GBP);
            });

            test('Calls onChangeSelector Function if there is a change', async () => {
                render(
                    <CurrencyCard 
                        onChangeSelector={onChangeSelector}
                        onChangeAmount={onChangeAmount}
                        currencyValue={Currencies.GBP}
                    />
                );
                const selectorElementList = (await screen.findByTestId('currency-selector'));

                fireEvent.change(selectorElementList, { target: { value: Currencies.EUR } });
                
                expect(onChangeSelector).toHaveBeenCalled();
            });
        });
    });
});
