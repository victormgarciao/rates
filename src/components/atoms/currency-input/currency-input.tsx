import { ChangeEvent } from 'react'
import './currency-input.css'

interface ICurrencySelectorProps {
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    amountValue?: number;
}

export function CurrencyInput(props: ICurrencySelectorProps) {
    const { onChangeAmount, amountValue } = props;

    return (
        <input 
            type='number'
            className='currency-input'
            placeholder='0'
            onChange={onChangeAmount}
            value={amountValue || ''}
        />
    );
}
