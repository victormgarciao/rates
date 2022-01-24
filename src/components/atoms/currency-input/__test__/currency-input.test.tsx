import { ChangeEvent, KeyboardEvent } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CurrencyInput } from '../currency-input';

describe('currencyInput' , () => {
    let inputElement: HTMLInputElement;
    let onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void = jest.fn();
    let renderResponse: any;

    describe('only with mandatory params', () => {
        beforeEach(() => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            inputElement = screen.getByPlaceholderText('0');
        });

        test('Render the element', () => {
            expect(inputElement).toBeInTheDocument();
        });

        test('value is empty by default', () => {
            expect(inputElement).toHaveValue('');
        });

        test('It is text input', () => {
            expect(inputElement.type).toBe('text');
        });

        test('It has inputMode numeric', () => {
            expect(inputElement.inputMode).toBe('numeric');
        });

        test('It has class currency-input', () => {
            expect(inputElement.className).toBe('currency-input');
        });

        test('Calls the function we sent on change value', () => {
            fireEvent.change(inputElement, { target: { value: '4'} } );
            expect(onChangeAmount).toBeCalled();
        });
    });

    describe('setting amountValue', () => {
        beforeEach(() => {
            renderResponse =  render(
                <CurrencyInput onChangeAmount={onChangeAmount} amountValue='42'/>
            );
            inputElement = screen.getByPlaceholderText('0');
        });

        test('value the one we set in amountValue', async () => {
            expect(inputElement).toHaveValue('42');
        });

        test('changing amountValue prop change the value', () => {
            const { rerender } = renderResponse;
            expect(inputElement).toHaveValue('42');
    
            rerender(<CurrencyInput onChangeAmount={onChangeAmount} amountValue='333'/>);
            expect(inputElement).toHaveValue('333');
        });
    });
});
