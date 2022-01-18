import './currency-selector.css';


export enum Currencies {
    GBP = 'GBP',
    USD = 'USD',
    EUR = 'EUR',
};

interface ICurrencySelectorProps {
    defaultValue?: Currencies;
}

export function CurrencySelector(props: ICurrencySelectorProps) {
    const { defaultValue = Currencies.USD } = props;

    return (
        <select name='currency-selector' className='currency-selector' defaultValue={defaultValue}>
            <option>{Currencies.GBP}</option>
            <option>{Currencies.EUR}</option>
            <option>{Currencies.USD}</option>
        </select>
    );
}
