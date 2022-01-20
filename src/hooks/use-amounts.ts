import { useDispatch, useSelector } from 'react-redux';
import { eq as areEqual } from 'lodash';
import { selectBotAmount, selectTopAmount, setBotAmount, setTopAmount } from '../redux/slices/amounts.slice';
import { selectRatesValues } from '../redux/slices/rates.slice';
import { Currencies, selectBotCurrency, selectTopCurrency } from '../redux/slices/currency-selectors.slices';
import { selectActiveCard, selectIsTopActiveCard } from '../redux/slices/currency-cards.slice';
import { ChangeEvent, useEffect } from 'react';
import { hasEndedWithDotOrComma } from '../utils/hasEndedWithDotOrComma/hasEndedWithDotOrComma';
import { replaceDotForCommaOf } from '../utils/replaceDotForCommaOf/replaceDotForCommaOf';

interface IUseAmountsResponse {
    topAmount: string,
    botAmount: string,
    onNewTopAmount: (e: ChangeEvent<HTMLInputElement>) => void,
    onNewBotAmount: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function useAmounts() : IUseAmountsResponse {
    const dispatch = useDispatch();
    const topAmount = useSelector(selectTopAmount);
    const botAmount = useSelector(selectBotAmount);
    const rates = useSelector(selectRatesValues);
    const topCurrency = useSelector(selectTopCurrency);
    const botCurrency = useSelector(selectBotCurrency);
    const isTopCardActive = useSelector(selectIsTopActiveCard);
    const activeCard = useSelector(selectActiveCard);

    function dispatchSetTopAmount (newAmount: string): void {
        dispatch(setTopAmount(newAmount));
    }

    function dispatchSetBotAmount (newAmount: string): void {
        dispatch(setBotAmount(newAmount));
    }

    function getRateCalculation(fromCurrency: Currencies, toCurrency: Currencies, amount: number) : string {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const times = fromRate / toRate;
        return Number((amount * times).toFixed(2)).toString(); // to avoid .00
    }

    function handleEndingDot(valueWithDotOrComma : string, isTop: boolean) : void {
        const valueFormatted : string = replaceDotForCommaOf(valueWithDotOrComma);

        if (isTop) { dispatchSetTopAmount(valueFormatted); } 
        else { dispatchSetBotAmount(valueFormatted); }
    }

    function resetAmountValues() : void {
        dispatchSetTopAmount('');
        dispatchSetBotAmount('');
    }

    function isNewAmountValid(value : string, isTop: boolean) : boolean {
        const isNotValidValue : boolean = !/^[-+]?[0-9]*([\.,][0-9]*)?$/.test(value);

        if (isNotValidValue) return false;

        const isOneCharAndNotNumber : boolean =
            areEqual(value, '+') || areEqual(value, '-') || areEqual(value, '.') || areEqual(value, ',');

        if (isOneCharAndNotNumber) {
            resetAmountValues();
            return false;
        }

        if (hasEndedWithDotOrComma(value)) {
            handleEndingDot(value, isTop);
            return false;
        }

        return true;
    }

    function handleAmounts(value: string, isTop: boolean) : void {
        if (isNewAmountValid(value, isTop)) {
            resetAmountValues();
            const positiveNumberedValue : number = Math.abs(Number(value.replace(',', '.')));

            if (isTop) {
                const otherCurrencyCalculated : string = getRateCalculation(
                    topCurrency, 
                    botCurrency, 
                    positiveNumberedValue,
                );

                dispatchSetTopAmount(replaceDotForCommaOf(isTopCardActive ? `-${positiveNumberedValue}` : `+${positiveNumberedValue}`));
                dispatchSetBotAmount(replaceDotForCommaOf(isTopCardActive ? `+${otherCurrencyCalculated}` : `-${otherCurrencyCalculated}`));
            } else {
                const otherCurrencyCalculated : string = getRateCalculation(
                    botCurrency, 
                    topCurrency, 
                    positiveNumberedValue,
                );

                dispatchSetBotAmount(replaceDotForCommaOf(isTopCardActive ? `+${positiveNumberedValue}` : `-${positiveNumberedValue}`));
                dispatchSetTopAmount(replaceDotForCommaOf(isTopCardActive ? `-${otherCurrencyCalculated}` : `+${otherCurrencyCalculated}`));
            }
        }
    }

    function onNewTopAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;
        const isTop = true;
        handleAmounts(newValue, isTop);
    }

    function onNewBotAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;
        const isTop = false;
        handleAmounts(newValue, isTop);
    }

    useEffect(
        () => {
            const amountToSend = isTopCardActive ? topAmount : botAmount;
            const isAmountNotEmpty = !areEqual(amountToSend, '');
            if(isAmountNotEmpty) handleAmounts(amountToSend, isTopCardActive);
        },
        [ topCurrency, botCurrency, activeCard ],
    );

    return {
        topAmount,
        botAmount,
        onNewBotAmount,
        onNewTopAmount,
    };
}
