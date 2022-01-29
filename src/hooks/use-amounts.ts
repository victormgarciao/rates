import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eq as areEqual } from 'lodash';
import { selectRatesValues } from '../redux/slices/rates.slice';
import { selectSellCardPosition, selectBottomCard, selectIsTopSellingCard, selectTopCard, setTopCardAmount, resetAmounts, setBottomCardAmount, resetIsExceeded, setTopCardIsExceeded, setBottomCardIsExceeded, Currencies } from '../redux/slices/currency-cards.slice';
import { hasEndedWithDotOrComma } from '../utils/hasEndedWithDotOrComma/hasEndedWithDotOrComma';
import { isLastDigitNotNumber } from '../utils/isLastDigitNotNumber/isLastDigitNotNumber';
import { isRightFormatAmount } from '../utils/isRightFormatAmount/isRightFormatAmount';
import { selectPockets } from '../redux/slices/pockets.slice';
import { replaceDotForCommaOf } from '../utils/replaceDotForCommaOf/replaceDotForCommaOf';

interface IUseAmountsResponse {
    onNewTopAmount: (e: ChangeEvent<HTMLInputElement>) => void,
    onNewBotAmount: (e: ChangeEvent<HTMLInputElement>) => void,
}


export function useAmounts() : IUseAmountsResponse {
    const dispatch = useDispatch();

    const topCard = useSelector(selectTopCard);
    const bottomCard = useSelector(selectBottomCard);
    
    const topAmount = topCard.amount;
    const botAmount = bottomCard.amount;

    const topCurrency = topCard.currency;
    const botCurrency = bottomCard.currency;

    const rates = useSelector(selectRatesValues);

    const isTopSellCard = useSelector(selectIsTopSellingCard);
    const sellCardPosition = useSelector(selectSellCardPosition);

    const pockets = useSelector(selectPockets);


    function getRateCalculation(fromCurrency: Currencies, toCurrency: Currencies, amount: number) : number {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const fixedAmountCalculated = (amount / fromRate * toRate).toFixed(2)
        return Number(fixedAmountCalculated); // to avoid .00
    }


    function isNewAmountValid(amount : string, isComingFromTopCard: boolean) : boolean {
        if (!isRightFormatAmount(amount)) return false;

        if (isLastDigitNotNumber(amount)) {
            dispatch(resetAmounts());
            return false;
        }

        if (hasEndedWithDotOrComma(amount)) {
            if (isComingFromTopCard) dispatch(setTopCardAmount(replaceDotForCommaOf(amount)));
            else dispatch(setBottomCardAmount(replaceDotForCommaOf(amount)));

            return false;
        }

        return true;
    }


    function makeItPositive(value: string): number {
        return Math.abs(Number(value.replace(',', '.')));
    }


    function getAmountFormatted(amount : number) : string {
        const amountToText = amount > 0
            ? `+${amount}`
            : amount.toString();
        
        return replaceDotForCommaOf(amountToText);
    }


    function handleAmounts(amount: string, isComingFromTopCard: boolean) : void {
        if (isNewAmountValid(amount, isComingFromTopCard)) {
            dispatch(resetAmounts());
            dispatch(resetAmounts());

            const positiveAmont : number = makeItPositive(amount);
            if (isComingFromTopCard) {
                const otherCardCalculated : number = 
                    getRateCalculation(
                        topCurrency, 
                        botCurrency, 
                        positiveAmont,
                    )
                ;

                dispatch(setTopCardAmount(getAmountFormatted(isTopSellCard ? -positiveAmont : positiveAmont)));
                dispatch(setBottomCardAmount(getAmountFormatted(isTopSellCard ? otherCardCalculated : -otherCardCalculated)));
            } else {
                const otherCardCalculated : number = 
                    getRateCalculation(
                        botCurrency, 
                        topCurrency, 
                        positiveAmont,
                    )
                ;

                dispatch(setTopCardAmount(getAmountFormatted(isTopSellCard ? -otherCardCalculated : otherCardCalculated)));
                dispatch(setBottomCardAmount(getAmountFormatted(isTopSellCard ? positiveAmont : -positiveAmont)));
            }
        }
    }


    function onNewTopAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        handleAmounts(event.target.value, true);
        
    }


    function onNewBotAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        handleAmounts(event.target.value, false);

        if (isTopSellCard) {
            const amountFromPocket: number = makeItPositive(pockets[topCurrency].amount);
            const positiveTopAmount: number = makeItPositive(topAmount); 
            if ( positiveTopAmount > amountFromPocket ) dispatch(setTopCardIsExceeded(true));
        } else {
            const amountFromPocket: number = makeItPositive(pockets[topCurrency].amount);
            const positiveBotAmount: number = makeItPositive(botAmount); 
            if ( positiveBotAmount > amountFromPocket ) dispatch(setBottomCardIsExceeded(true));
        }
    }


    useEffect(
        () => {
            const amountToSend = isTopSellCard ? topAmount : botAmount;
            const isAmountNotEmpty = !areEqual(amountToSend, '');
            if(isAmountNotEmpty) handleAmounts(amountToSend, isTopSellCard);
        },
        [ topCurrency, botCurrency, sellCardPosition ],
    );


    useEffect(
        () => {
            dispatch(resetIsExceeded());
            
            if (isTopSellCard) {
                const amountFromPocket: number = makeItPositive(pockets[topCurrency].amount);
                const positiveTopAmount: number = makeItPositive(topAmount); 
                if ( positiveTopAmount > amountFromPocket ) dispatch(setTopCardIsExceeded(true));
            } else {
                const amountFromPocket: number = makeItPositive(pockets[botCurrency].amount);
                const positiveBotAmount: number = makeItPositive(botAmount); 
                if ( positiveBotAmount > amountFromPocket ) dispatch(setBottomCardIsExceeded(true));
            }
        },
        [ botAmount, topAmount ],
    );


    return {
        onNewBotAmount,
        onNewTopAmount,
    };
}
