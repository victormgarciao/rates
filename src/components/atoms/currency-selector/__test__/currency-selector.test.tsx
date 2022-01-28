import { ChangeEvent } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CurrencySelector } from '../currency-selector';
import { Currencies } from '../../../../redux/slices/currency-cards.slice';

describe('CurrencySelector' , () => {
    let onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void = jest.fn();

    afterEach(() => cleanup());

    describe('only with mandatory params', () => {
        test('Render the element', () => {
            render(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                />
            );
            const inputElement: HTMLInputElement = screen.getByTestId('currency-selector');
            expect(inputElement).toBeInTheDocument();
        });

        test('Value is USD by default', () => {
            render(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                />
            );
            const inputElement: HTMLInputElement = screen.getByTestId('currency-selector');
            expect(inputElement).toHaveValue(Currencies.USD);
        });
        
        test('It is select input', () => {
            render(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                />
            );
            const inputElement: HTMLInputElement = screen.getByTestId('currency-selector');
            expect(inputElement.type).toBe('select-one');
        });
        
        test('It has class "currency-selector"',() => {
            render(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                />
            );
            const inputElement: HTMLInputElement = screen.getByTestId('currency-selector');
            expect(inputElement).toHaveClass('currency-selector');
        });

        test ('onChangeSelector function is called on change', () => {
            render(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                />
            );
            const inputElement: HTMLInputElement = screen.getByTestId('currency-selector');

            fireEvent.change(inputElement, { target: { value: Currencies.GBP } });
            expect(onChangeSelector).toBeCalled();
        });


        test('Value is equals to currencyValue', () => {
            const { rerender } = render(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                    currencyValue={Currencies.EUR}
                />
            );
            const inputElement: HTMLInputElement = screen.getByTestId('currency-selector');

            // Check value is USD
            expect(inputElement).toHaveValue(Currencies.EUR);
            
            rerender(
                <CurrencySelector 
                    onChangeSelector={onChangeSelector}
                    currencyValue={Currencies.GBP}
                />
            )

            expect(inputElement).toHaveValue(Currencies.GBP);
        });
    });
});
