import { eq } from 'lodash';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Currencies, resetCurrencyCards, setBottomCardCurrency, setTopCardCurrency } from '../redux/slices/currency-cards.slice';
import { IPocketsState, selectPockets } from '../redux/slices/pockets.slice';

interface IUsePocketsResponse {
    openExchange: (a: Currencies) => (event: MouseEvent<HTMLElement>) => void,
    pockets: IPocketsState,
}

export function usePockets(): IUsePocketsResponse {
    const dispatch = useDispatch();

    
    const pockets = useSelector(selectPockets);


    function openExchange(currency: Currencies): (event: MouseEvent<HTMLElement>) => void {
        return function handleOpenExchange (event: MouseEvent<HTMLElement>): void {
            event.preventDefault();
            dispatch(resetCurrencyCards());

            dispatch(setTopCardCurrency(currency));
            dispatch(setBottomCardCurrency(
                eq(currency, Currencies.USD) ? Currencies.EUR : Currencies.USD)
            );
        }
    };


    return { openExchange, pockets }
};