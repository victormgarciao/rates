import { ChangeEvent, MouseEvent } from "react";
import { CurrencyInput } from "../../atoms/currency-input/currency-input";
import { Currencies, CurrencySelector } from "../../atoms/currency-selector/currency-selector";

import './currency-card.css';

export enum CurrencyCardType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};
interface ICurrencyCardProps {
    defaultSelectorValue?: Currencies;
    onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void
    disabledCurrency?: Currencies;
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    currencyCardType? : CurrencyCardType;
    amountValue?: string;
    handleActiveCard: (newCurrencyCardType : CurrencyCardType) => void;
}



export function CurrencyCard(props: ICurrencyCardProps) {
    const {
        defaultSelectorValue,
        onChangeSelector,
        disabledCurrency,
        onChangeAmount,
        currencyCardType = CurrencyCardType.TOP,
        amountValue,
        handleActiveCard,
    } = props;

    function setActive(event: MouseEvent<HTMLDivElement>): void {
        event.preventDefault();
        handleActiveCard(currencyCardType);
    }

    return (
        <div
            className='currency-card'
            onClick={setActive}
        >
            <CurrencySelector
                defaultValue={defaultSelectorValue}
                onChangeSelector={onChangeSelector}
                disabledCurrency={disabledCurrency}
            />
            <CurrencyInput
                onChangeAmount={onChangeAmount}
                amountValue={amountValue}
            />
        </div>
    );
}
