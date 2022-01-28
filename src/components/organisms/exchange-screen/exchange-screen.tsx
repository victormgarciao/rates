import { CurrencyCardType } from '../../../redux/slices/currency-cards.slice';
import { CurrencyCard } from "../../molecules/currency-card/currency-card";
import { Header } from "../../atoms/header/header";
import { useCurrencyCards } from '../../../hooks/use-currency-cards';
import { useCurrencyCardsSelector } from '../../../hooks/use-currency-selectors';
import { useAmounts } from '../../../hooks/use-amounts';
import './exchange-screen.css';

export function ExchangeScreen() {
    const { swapCurrencyCardActive, isTopSellCard, topCard, bottomCard } = useCurrencyCards();
    const { onNewBotAmount, onNewTopAmount } = useAmounts();
    const { onNewTopCurrency, onNewBotCurrency } = useCurrencyCardsSelector();
 
    return (
        <div className='exchange-screen' data-testid='exchange-screen'>
            <Header dataTestid='exchange-screen-header' >Rates Calculation</Header>
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
        </div>
    );
}
