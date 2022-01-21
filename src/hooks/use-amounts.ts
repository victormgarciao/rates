import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eq as areEqual } from 'lodash';
import { selectBotAmount, selectTopAmount, setBotAmountAsString, setBotAmountAsNumber, setTopAmountAsString, setTopAmountAsNumber, resetAmounts } from '../redux/slices/amounts.slice';
import { selectRatesValues } from '../redux/slices/rates.slice';
import { Currencies, selectBotCurrency, selectTopCurrency } from '../redux/slices/currency-selectors.slices';
import { selectActiveCard, selectIsTopActiveCard } from '../redux/slices/currency-cards.slice';
import { hasEndedWithDotOrComma } from '../utils/hasEndedWithDotOrComma/hasEndedWithDotOrComma';
import { isLastDigitNotNumber } from '../utils/isLastDigitNotNumber/isLastDigitNotNumber';
import { isRightFormatAmount } from '../utils/isRightFormatAmount/isRightFormatAmount';

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


    function getRateCalculation(fromCurrency: Currencies, toCurrency: Currencies, amount: number) : number {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const times = fromRate / toRate;
        const fixedAmountCalculated = (amount * times).toFixed(2)
        return Number(fixedAmountCalculated); // to avoid .00
    }


    function isNewAmountValid(amount : string, isComingFromTopCard: boolean) : boolean {
        if (!isRightFormatAmount(amount)) return false;

        if (isLastDigitNotNumber(amount)) {
            dispatch(resetAmounts());
            return false;
        }

        if (hasEndedWithDotOrComma(amount)) {
            if (isComingFromTopCard) dispatch(setTopAmountAsString(amount));
            else dispatch(setBotAmountAsString(amount));

            return false;
        }

        return true;
    }


    function handleAmounts(amount: string, isComingFromTopCard: boolean) : void {
        if (isNewAmountValid(amount, isComingFromTopCard)) {
            dispatch(resetAmounts());
            const positiveAmont : number = Math.abs(Number(amount.replace(',', '.')));

            if (isComingFromTopCard) {
                const otherCurrencyCalculated : number = 
                    getRateCalculation(
                        topCurrency, 
                        botCurrency, 
                        positiveAmont,
                    )
                ;

                dispatch(setTopAmountAsNumber(isTopCardActive ? -positiveAmont : positiveAmont));
                dispatch(setBotAmountAsNumber(isTopCardActive ? otherCurrencyCalculated : -otherCurrencyCalculated));
            } else {
                const otherCurrencyCalculated : number =
                    getRateCalculation(
                        botCurrency, 
                        topCurrency, 
                        positiveAmont,
                    )
                ;

                dispatch(setTopAmountAsNumber(isTopCardActive ? -otherCurrencyCalculated : otherCurrencyCalculated));
                dispatch(setBotAmountAsNumber(isTopCardActive ? positiveAmont : -positiveAmont));
            }
        }
    }


    function onNewTopAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;
        const isComingFromTopCard = true;
        handleAmounts(newValue, isComingFromTopCard);
    }


    function onNewBotAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;
        const isComingFromTopCard = false;
        handleAmounts(newValue, isComingFromTopCard);
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
