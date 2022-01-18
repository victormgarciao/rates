import { ChangeEvent, Dispatch, MouseEvent, MouseEventHandler, SetStateAction } from "react";
import { CurrencyInput } from "../../atoms/currency-input/currency-input";
import { Currencies, CurrencySelector, ICurrencySelectorProps } from "../../atoms/currency-selector/currency-selector";

import './currency-handler.css';

export enum CurrencyHandlerType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};
interface ICurrencyHandlerProps {
    defaultSelectorValue?: Currencies;
    onChangeSelector: (event: ChangeEvent<HTMLSelectElement>) => void
    disabledCurrency?: Currencies;
    onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
    currencyHandlerType? : CurrencyHandlerType;
    setActiveHandler: Dispatch<SetStateAction<CurrencyHandlerType>>;
    amountValue?: number;
}



export function CurrencyHandler(props: ICurrencyHandlerProps) {
    const {
        defaultSelectorValue,
        onChangeSelector,
        disabledCurrency,
        onChangeAmount,
        currencyHandlerType = CurrencyHandlerType.TOP,
        setActiveHandler,
        amountValue,
    } = props;

    function setActive(event: MouseEvent<HTMLDivElement>): void {
        event.preventDefault();
        setActiveHandler(currencyHandlerType);
    }

    return (
        <div
            className={`currency-handler type-${currencyHandlerType}`}
            onClick={setActive}
        >
            <CurrencySelector
                defaultValue={defaultSelectorValue}
                onChangeSelector={onChangeSelector}
                disabledCurrency={disabledCurrency}
            />
            <CurrencyInput onChangeAmount={onChangeAmount} amountValue={amountValue} />
        </div>
    );
}
