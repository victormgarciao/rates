import { ChangeEvent, MouseEvent } from "react";
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
    handleActiveCard: (newCurrencyCardType : CurrencyCardType) => void;
}



export function CurrencyCard(props: ICurrencyCardProps) {
    const {
        onChangeSelector,
        onChangeAmount,
        currencyCardType = CurrencyCardType.TOP,
        amountValue,
        handleActiveCard,
        currencyValue,
    } = props;

    function setActive(event: MouseEvent<HTMLDivElement>): void {
        event.preventDefault();
        console.log({currencyCardType})
        handleActiveCard(currencyCardType);
    }

    return (
        <div
            className='currency-card'
            onClick={setActive}
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
