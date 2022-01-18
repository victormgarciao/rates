import { CurrencyInput } from "../../atoms/currency-input/currency-input";
import { Currencies, CurrencySelector } from "../../atoms/currency-selector/currency-selector";

import './currency-handler.css';

interface ICurrencyHandlerProps {
    defaultSelectorValue?: Currencies;
}

export function CurrencyHandler(props: ICurrencyHandlerProps) {
    const { defaultSelectorValue } = props;

    return (
        <div className='currency-handler'>
            <CurrencySelector defaultValue={defaultSelectorValue} />
            <CurrencyInput />
        </div>
    );
}
