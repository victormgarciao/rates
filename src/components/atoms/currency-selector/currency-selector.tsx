import { ChangeEvent } from 'react';
import './currency-selector.css';

export enum Currencies {
    GBP = 'GBP',
    USD = 'USD',
    EUR = 'EUR',
};

export interface ICurrencySelectorProps {
    defaultValue?: Currencies;
    onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void;
    disabledCurrency?: Currencies;
}

export function CurrencySelector(props: ICurrencySelectorProps) {
    const {
        defaultValue = Currencies.USD,
        onChangeSelector,
        disabledCurrency = Currencies.EUR,
    } = props;

    function isDisabledCurrency(currency: Currencies) : boolean {
        return disabledCurrency === currency;
    }

    return (
        <select
            name='currency-selector'
            className='currency-selector'
            defaultValue={defaultValue}
            onChange={onChangeSelector}
        >
            <option disabled={isDisabledCurrency(Currencies.GBP)}>{Currencies.GBP}</option>
            <option disabled={isDisabledCurrency(Currencies.EUR)}>{Currencies.EUR}</option>
            <option disabled={isDisabledCurrency(Currencies.USD)}>{Currencies.USD}</option>
        </select>
    );
}
