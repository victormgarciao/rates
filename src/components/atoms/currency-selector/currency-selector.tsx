import { ChangeEvent } from 'react';
import './currency-selector.css';

export enum Currencies {
    GBP = 'GBP',
    USD = 'USD',
    EUR = 'EUR',
};

export interface ICurrencySelectorProps {
    onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void;
    currencyValue?: Currencies;
}

export function CurrencySelector(props: ICurrencySelectorProps) {
    const {
        onChangeSelector,
        currencyValue = Currencies.USD,
    } = props;

    return (
        <select
            name='currency-selector'
            className='currency-selector'
            onChange={onChangeSelector}
            value={currencyValue}
        >
            <option>{Currencies.GBP}</option>
            <option>{Currencies.EUR}</option>
            <option>{Currencies.USD}</option>
        </select>
    );
}
