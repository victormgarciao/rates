import { eq as areEqual } from 'lodash';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Currencies, resetAmounts, resetCurrencyCards, selectBottomCard, selectTopCard, setBottomCardCurrency, setTopCardCurrency } from '../redux/slices/currency-cards.slice';
import { IPocketsState, selectPockets, setPocketAmount } from '../redux/slices/pockets.slice';
import { setIsPocketsScreen } from '../redux/slices/screens.slice';
import { fixAvoiding0Decimals } from '../utils/fixAvoiding0Decimals/fixAvoiding0Decimals';
import { formatNumber } from '../utils/formatNumber/formatNumber';
import { replaceDotForCommaOf } from '../utils/replaceDotForCommaOf/replaceDotForCommaOf';

interface IUsePocketsResponse {
    openExchange: (a: Currencies) => (event: MouseEvent<HTMLElement>) => void,
    exchange: (e: MouseEvent<HTMLElement>) => void,
    pockets: IPocketsState,
    isExchangeDisabled: boolean,
}

export function usePockets(): IUsePocketsResponse {
    const dispatch = useDispatch();

    const topCard = useSelector(selectTopCard);
    const bottomCard = useSelector(selectBottomCard);

    const topCurrency = topCard.currency;
    const botCurrency = bottomCard.currency;

    const topCardAmount = topCard.amount;
    const botCardAmount = bottomCard.amount;

    const isTopCardExceeded = topCard.isExceeded;
    const isBotCardExceeded = bottomCard.isExceeded;

    const pockets = useSelector(selectPockets);

    const topPocketAmount = pockets[topCurrency].amount;
    const botPocketAmount = pockets[botCurrency].amount;

    const [ isExchangeDisabled, setIsExchangeDisabled ] = useState(true);

    useEffect(() => {
        setIsExchangeDisabled(false);

        if (Number(topCardAmount) === 0 || topCardAmount === '') {
            setIsExchangeDisabled(true);
        }

        if (isBotCardExceeded || isTopCardExceeded) {
            setIsExchangeDisabled(true);
        }
    }, [ topCardAmount, isBotCardExceeded, isTopCardExceeded ])


    function openExchange(currency: Currencies): (event: MouseEvent<HTMLElement>) => void {
        return function handleOpenExchange (event: MouseEvent<HTMLElement>): void {
            event.preventDefault();
            dispatch(resetCurrencyCards());

            dispatch(setTopCardCurrency(currency));
            dispatch(setBottomCardCurrency(
                areEqual(currency, Currencies.USD) ? Currencies.EUR : Currencies.USD)
            );

            dispatch(setIsPocketsScreen(false));
        }
    };


    function exchange(event: MouseEvent<HTMLElement>): void {
        if (isExchangeDisabled) return;

        event.preventDefault();
        dispatch(resetAmounts());

        const topResult = formatNumber(topPocketAmount) + formatNumber(topCardAmount);
        const botResult = formatNumber(botPocketAmount) + formatNumber(botCardAmount);

        const fixAmount: (a: number) => string = 
            (amount) => replaceDotForCommaOf(fixAvoiding0Decimals(amount));

        dispatch(setPocketAmount({
            currency: topCurrency,
            amount: fixAmount(topResult), 
        }));
        dispatch(setPocketAmount({
            currency: botCurrency,
            amount: fixAmount(botResult),
        }));

        dispatch(setIsPocketsScreen(true));
    };


    return { openExchange, exchange, pockets, isExchangeDisabled }
};