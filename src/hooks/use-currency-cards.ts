import { useDispatch, useSelector } from "react-redux";
import { CurrencyCardType, selectActiveCard, selectIsTopActiveCard, setActiveCard } from "../redux/slices/currency-cards.slice";
import { eq as areEqual } from "lodash";
import { MouseEvent } from "react";

interface IUseActiveCardResponse {
    activeCard: CurrencyCardType,
    swapCurrencyCardActive: (e: MouseEvent<HTMLElement>) => void,
    isTopCardActive: boolean,
}

export function useCurrencyCards() : IUseActiveCardResponse {
    const dispatch = useDispatch();
    const activeCard = useSelector(selectActiveCard);
    const isTopCardActive = useSelector(selectIsTopActiveCard);

    function dispatchSetActiveCard (currencyCardType: CurrencyCardType): void {
        dispatch(setActiveCard(currencyCardType))
    }

    function swapCurrencyCardActive(event: MouseEvent<HTMLElement>) : void {
        event.preventDefault();

        if (isTopCardActive) dispatchSetActiveCard(CurrencyCardType.BOTTOM)
        else dispatchSetActiveCard(CurrencyCardType.TOP);
    }

    return {
        activeCard,
        swapCurrencyCardActive,
        isTopCardActive,
    };
}
