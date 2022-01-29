import { CurrencyCardType } from '../../../redux/slices/currency-cards.slice';
import { CurrencyCard } from "../../molecules/currency-card/currency-card";
import { Header } from "../../atoms/header/header";
import { useCurrencyCards } from '../../../hooks/use-currency-cards';
import { useCurrencyCardsSelector } from '../../../hooks/use-currency-selectors';
import { useAmounts } from '../../../hooks/use-amounts';
import './exchange-screen.css';
import { usePockets } from '../../../hooks/use-pockets';

export function ExchangeScreen() {
    const { swapCurrencyCardActive, isTopSellCard, topCard, bottomCard } = useCurrencyCards();
    const { onNewBotAmount, onNewTopAmount, openPocketScreen } = useAmounts();
    const { onNewTopCurrency, onNewBotCurrency } = useCurrencyCardsSelector();
    const { exchange, isExchangeDisabled } = usePockets();

    const sellOrBuy: [ string, string ] = isTopSellCard ? ['Sell', 'to'] : ['Buy', 'from'];
 
    return (
        <div className='exchange-screen' data-testid='exchange-screen'>
            <Header dataTestid='exchange-screen-header' >Rates Calculation</Header>
            <p className='back-link' onClick={openPocketScreen}>Back</p>
            <div className="cardsWrapper" data-testid='cardsWrapper'>
                <CurrencyCard
                    currencyValue={topCard.currency}
                    amountValue={topCard.amount}
                    isExceeded={topCard.isExceeded}
                    currencyCardType={CurrencyCardType.TOP}
                    onChangeSelector={onNewTopCurrency}
                    onChangeAmount={onNewTopAmount}
                />

                {/* This could be another Atom Component: Button  */}
                <button
                    className={`cta-transaction-direction ${isTopSellCard ? 'active' : ''}`}
                    onClick={swapCurrencyCardActive}
                    data-testid='cta-swap-currencies'
                >
                    <i className='fa fa-long-arrow-up' aria-hidden='true' />
                </button>

                <CurrencyCard
                    currencyValue={bottomCard.currency}
                    amountValue={bottomCard.amount}
                    isExceeded={bottomCard.isExceeded}
                    currencyCardType={CurrencyCardType.BOTTOM}
                    onChangeSelector={onNewBotCurrency}
                    onChangeAmount={onNewBotAmount}
                />
            </div>
            <button className='cta-exchange' onClick={exchange} disabled={isExchangeDisabled}>
                <span>{`${sellOrBuy[0]} ${topCard.currency} ${sellOrBuy[1]} ${bottomCard.currency}`}</span>
            </button>
        </div>
    );
}
