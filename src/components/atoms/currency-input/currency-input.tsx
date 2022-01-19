import { ChangeEvent } from 'react'
import './currency-input.css'

interface ICurrencySelectorProps {
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    amountValue?: string;
}

export function CurrencyInput(props: ICurrencySelectorProps) {
    const { onChangeAmount, amountValue } = props;

    return (
        <input
            type='text'
            inputMode='numeric'
            className='currency-input'
            placeholder='0'
            value={amountValue || ''}
            onChange={onChangeAmount}
        />
    );
}
