import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eq as areEqual } from 'lodash';
import { Currencies, selectBottomCard, selectTopCard, setBottomCardCurrency, setTopCardCurrency } from '../redux/slices/currency-cards.slice';


interface IUseActiveCardResponse {
    topCurrency: Currencies,
    botCurrency: Currencies,
    onNewTopCurrency: (e: ChangeEvent<HTMLSelectElement>) => void,
    onNewBotCurrency: (e: ChangeEvent<HTMLSelectElement>) => void
}


export function useCurrencyCardsSelector() : IUseActiveCardResponse {
    const dispatch = useDispatch();
    const topCard = useSelector(selectTopCard);
    const bottomCard = useSelector(selectBottomCard);
    const topCurrency = topCard.currency;
    const botCurrency = bottomCard.currency;


    function isSameCurrencies(currency1: Currencies) : (a: Currencies) => boolean {
        return function checkOtherCurrency(currency2: Currencies) : boolean {
            return areEqual(currency1, currency2);
        }
    }


    function handleCurrencies( currency: Currencies, isTopSelector: boolean): void {
        const isNewCurrencyEqualThan = isSameCurrencies(currency);

        if (isTopSelector) {
            if (isNewCurrencyEqualThan(botCurrency)) dispatch(setBottomCardCurrency(topCurrency));
            dispatch(setTopCardCurrency(currency));
        } else {
            if (isNewCurrencyEqualThan(topCurrency)) dispatch(setTopCardCurrency(botCurrency));
            dispatch(setBottomCardCurrency(currency));
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
