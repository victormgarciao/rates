import { ChangeEvent } from "react";
import { CurrencyInput } from "../../atoms/currency-input/currency-input";
import { Currencies, CurrencySelector } from "../../atoms/currency-selector/currency-selector";

import './currency-card.css';

export enum CurrencyCardType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};
interface ICurrencyCardProps {
    currencyValue?: Currencies;
    onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    currencyCardType? : CurrencyCardType;
    amountValue?: string;
}

export function CurrencyCard(props: ICurrencyCardProps) {
    const {
        onChangeSelector,
        onChangeAmount,
        currencyCardType = CurrencyCardType.TOP,
        amountValue,
        currencyValue,
    } = props;


    return (
        <div
            className={`currency-card ${currencyCardType}-card`}
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
