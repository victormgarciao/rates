import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyCardType, selectActiveCard, selectIsTopActiveCard, setActiveCard } from "../redux/slices/currency-cards.slice";

interface IUseActiveCardResponse {
    activeCard: CurrencyCardType,
    swapCurrencyCardActive: (e: MouseEvent<HTMLElement>) => void,
    isTopCardActive: boolean,
}


export function useCurrencyCards() : IUseActiveCardResponse {
    const dispatch = useDispatch();

    const activeCard = useSelector(selectActiveCard);
    const isTopCardActive = useSelector(selectIsTopActiveCard);


    function swapCurrencyCardActive(event: MouseEvent<HTMLElement>) : void {
        event.preventDefault();

        if (isTopCardActive) dispatch(setActiveCard(CurrencyCardType.BOTTOM));
        else dispatch(setActiveCard(CurrencyCardType.TOP));
    }


    return {
        activeCard,
        swapCurrencyCardActive,
        isTopCardActive,
    };
}
