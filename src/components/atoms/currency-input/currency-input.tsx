import { ChangeEvent, KeyboardEvent } from 'react'
import { eq as areEqual } from 'lodash';
import './currency-input.css'

interface ICurrencySelectorProps {
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    amountValue?: string;
}


function preventDeleteNotRemovableChars(event: KeyboardEvent<HTMLInputElement>) : void {
    const start: number = event.currentTarget.selectionStart || 0;
    const charBefore : string = event.currentTarget.value[start-1]

    const isNotRemovableChar: boolean = areEqual(charBefore, '+') || areEqual(charBefore, '-');

    if (event.key === 'Backspace' && isNotRemovableChar) {
        event.preventDefault();
        return;
    }
}


export function CurrencyInput(props: ICurrencySelectorProps) {
    const { onChangeAmount, amountValue } = props;

    return (
        <input
            type='text'
            inputMode='numeric'
            className='currency-input'
            placeholder='0'
            data-testid='currency-input'
            value={amountValue || ''}
            onChange={onChangeAmount}
            onKeyDown={preventDeleteNotRemovableChars}
        />
    );
}
