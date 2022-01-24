import { CurrencyCardType } from '../../../redux/slices/currency-cards.slice';
import { CurrencyCard } from "../../molecules/currency-handler/currency-card";
import { Header } from "../../atoms/header/header";
import { useCurrencyCards } from '../../../hooks/use-currency-cards';
import { useCurrencyCardsSelector } from '../../../hooks/use-currency-selectors';
import { useAmounts } from '../../../hooks/use-amounts';
import './main.css';

export function Main() {
    const { swapCurrencyCardActive, isTopCardActive } = useCurrencyCards();
    const { topAmount, botAmount, onNewBotAmount, onNewTopAmount } = useAmounts();
    const { topCurrency, botCurrency, onNewTopCurrency, onNewBotCurrency } = useCurrencyCardsSelector();
 
    return (
        <div className='main' data-testid='main'>
            <Header />
            <div className="cardsWrapper" data-testid='cardsWrapper'>
                <CurrencyCard
                    currencyValue={topCurrency}
                    amountValue={topAmount}
                    currencyCardType={CurrencyCardType.TOP}
                    onChangeSelector={onNewTopCurrency}
                    onChangeAmount={onNewTopAmount}
                />

                {/* This could be another Atom Component: Button  */}
                <button
                    className={`cta-transaction-direction ${isTopCardActive ? 'active' : ''}`}
                    onClick={swapCurrencyCardActive}
                >
                    <i className='fa fa-long-arrow-up' aria-hidden='true' />
                </button>

                <CurrencyCard
                    currencyValue={botCurrency}
                    amountValue={botAmount}
                    currencyCardType={CurrencyCardType.BOTTOM}
                    onChangeSelector={onNewBotCurrency}
                    onChangeAmount={onNewBotAmount}
                />
            </div>
        </div>
    );
}
