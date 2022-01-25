import { ChangeEvent } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CurrencyInput } from '../currency-input';

describe('currencyInput' , () => {
    let onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void = jest.fn();

    afterEach(() => cleanup());

    describe('only with mandatory params', () => {
        test('Render the element', () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            expect(inputElement).toBeInTheDocument();
        });

        test('value is empty by default', () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            expect(inputElement).toHaveValue('');
        });

        test('It is text input', () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            expect(inputElement.type).toBe('text');
        });

        test('It has inputMode numeric', () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            expect(inputElement.inputMode).toBe('numeric');
        });

        test('It has class currency-input', () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            expect(inputElement.className).toBe('currency-input');
        });

        test('Calls the function we sent on change value', () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} />
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            fireEvent.change(inputElement, { target: { value: '4'} } );
            expect(onChangeAmount).toBeCalled();
        });
    });

    describe('setting amountValue', () => {
        test('value the one we set in amountValue', async () => {
            render(
                <CurrencyInput onChangeAmount={onChangeAmount} amountValue='42'/>
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');
            expect(inputElement).toHaveValue('42');
        });

        test('changing amountValue prop change the value', () => {
            const { rerender } =  render(
                <CurrencyInput onChangeAmount={onChangeAmount} amountValue='42'/>
            );
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('0');;
            expect(inputElement).toHaveValue('42');
    
            rerender(<CurrencyInput onChangeAmount={onChangeAmount} amountValue='333'/>);
            expect(inputElement).toHaveValue('333');
        });
    });
});
