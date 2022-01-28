import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyCardType, ICard, selectBottomCard, selectIsTopSellingCard, selectTopCard, setSellCardPosition } from "../redux/slices/currency-cards.slice";

interface IUseActiveCardResponse {
    swapCurrencyCardActive: (e: MouseEvent<HTMLElement>) => void,
    isTopSellCard: boolean,
    topCard: ICard,
    bottomCard: ICard,
}


export function useCurrencyCards() : IUseActiveCardResponse {
    const dispatch = useDispatch();

    const isTopSellCard: boolean = useSelector(selectIsTopSellingCard);

    const topCard = useSelector(selectTopCard);
    const bottomCard = useSelector(selectBottomCard);


    function swapCurrencyCardActive(event: MouseEvent<HTMLElement>) : void {
        event.preventDefault();

        if (isTopSellCard) dispatch(setSellCardPosition(CurrencyCardType.BOTTOM));
        else dispatch(setSellCardPosition(CurrencyCardType.TOP));
    }


    return {
        swapCurrencyCardActive,
        isTopSellCard,
        topCard,
        bottomCard,
    };
}
