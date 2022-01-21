import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eq as areEqual } from 'lodash';
import { Currencies, selectTopCurrency, selectBotCurrency, setTopCurrency, setBotCurrency } from '../redux/slices/currency-selectors.slices';


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


    function isSameCurrencies(currency1: Currencies) : (a: Currencies) => boolean {
        return function checkOtherCurrency(currency2: Currencies) : boolean {
            return areEqual(currency1, currency2);
        }
    }


    function handleCurrencies( currency: Currencies, isTopSelector: boolean): void {
        const isNewCurrencyEqualThan = isSameCurrencies(currency);

        if (isTopSelector) {
            if (isNewCurrencyEqualThan(botCurrency)) dispatch(setBotCurrency(topCurrency));
            dispatch(setTopCurrency(currency));
        } else {
            if (isNewCurrencyEqualThan(topCurrency)) dispatch(setTopCurrency(botCurrency));
            dispatch(setBotCurrency(currency));
        }
    }


    function onNewTopCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isTopSelector = true;
        handleCurrencies(newCurrencySelected, isTopSelector);
    }


    function onNewBotCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isTopSelector = false;
        handleCurrencies(newCurrencySelected, isTopSelector);;
    }


    return {
        botCurrency,
        topCurrency,
        onNewTopCurrency,
        onNewBotCurrency,
    };
}
