import { useDispatch, useSelector } from "react-redux";
import { Currencies, selectTopCurrency, selectBotCurrency, setTopCurrency, setBotCurrency } from "../redux/slices/currency-selectors.slices";
import { eq as areEqual } from "lodash";
import { ChangeEvent } from "react";

interface IUseActiveCardResponse {
    topCurrency: Currencies,
    botCurrency: Currencies,
    onNewTopCurrency: (e: ChangeEvent<HTMLSelectElement>) => void,
    onNewBotCurrency: (e: ChangeEvent<HTMLSelectElement>) => void
}

export function useCurrencyCardsSelector() : IUseActiveCardResponse {
    const dispatch = useDispatch();
    const topCurrency = useSelector(selectTopCurrency);
    const botCurrency = useSelector(selectBotCurrency);

    function dispatchSetTopAmount (newTopCurrency: Currencies): void {
        dispatch(setTopCurrency(newTopCurrency))
    }

    function dispatchSetBotAmount (newBotCurrency: Currencies): void {
        dispatch(setBotCurrency(newBotCurrency))
    }

    function isSameCurrencies(currency1: Currencies) : (a: Currencies) => boolean {
        return function checkOtherCurrency(currency2: Currencies) : boolean {
            return areEqual(currency1, currency2);
        }
    }

    function handleCurrencies( currency: Currencies, isTop: boolean): void {
        const isNewCurrencyEqualThan = isSameCurrencies(currency);
        if (isTop) {
            if (isNewCurrencyEqualThan(botCurrency)) dispatchSetBotAmount(topCurrency);
            dispatchSetTopAmount(currency);
        } else {
            if (isNewCurrencyEqualThan(topCurrency)) dispatchSetTopAmount(botCurrency);
            dispatchSetBotAmount(currency);
        }
    }

    function onNewTopCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isTop = true;
        handleCurrencies(newCurrencySelected, isTop);
    }

    function onNewBotCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isTop = false;
        handleCurrencies(newCurrencySelected, isTop);;
    }

    return {
        botCurrency,
        topCurrency,
        onNewTopCurrency,
        onNewBotCurrency,
    };
}
