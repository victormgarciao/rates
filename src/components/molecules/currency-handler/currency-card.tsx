import { ChangeEvent } from "react";
import { CurrencyInput } from "../../atoms/currency-input/currency-input";
import { CurrencySelector } from "../../atoms/currency-selector/currency-selector";
import { CurrencyCardType } from '../../../redux/slices/currency-cards.slice';
import { Currencies } from "../../../redux/slices/currency-selectors.slices";

import './currency-card.css';

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
