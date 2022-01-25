import { ChangeEvent } from 'react';
import { Currencies } from '../../../redux/slices/currency-selectors.slices';
import './currency-selector.css';


interface ICurrencySelectorProps {
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
            data-testid='currency-selector'
        >
            <option>{Currencies.GBP}</option>
            <option>{Currencies.EUR}</option>
            <option>{Currencies.USD}</option>
        </select>
    );
}
