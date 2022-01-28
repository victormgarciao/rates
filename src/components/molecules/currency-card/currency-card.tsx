import { ChangeEvent } from 'react';
import { Currencies, CurrencyCardType } from '../../../redux/slices/currency-cards.slice';
import { CurrencyInput } from '../../atoms/currency-input/currency-input';
import { CurrencySelector } from '../../atoms/currency-selector/currency-selector';

import './currency-card.css';

interface ICurrencyCardProps {
    currencyValue?: Currencies;
    onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    currencyCardType? : CurrencyCardType;
    amountValue?: string;
    isExceeded?: boolean;
}


export function CurrencyCard(props: ICurrencyCardProps) {
    const {
        onChangeSelector,
        onChangeAmount,
        currencyCardType = CurrencyCardType.TOP,
        amountValue,
        currencyValue,
        isExceeded = false,
    } = props;

    const exceededClass = isExceeded ? 'exceeded' : '';

    return (
        <div
            className={`currency-card ${currencyCardType}-card ${exceededClass}`}
            data-testid='currency-card'
        >
            <CurrencySelector
                currencyValue={currencyValue}
                onChangeSelector={onChangeSelector}
            />
            <CurrencyInput
                onChangeAmount={onChangeAmount}
                amountValue={amountValue}
            />
        </div>
    );
}
