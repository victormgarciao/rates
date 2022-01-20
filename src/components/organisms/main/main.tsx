import './main.css';

import { CurrencyCard } from "../../molecules/currency-handler/currency-card";
import { Header } from "../../atoms/header/header";
import { useCurrencyCards } from '../../../hooks/use-currency-cards';
import { useCurrencyCardsSelector } from '../../../hooks/use-currency-selectors';
import { useAmounts } from '../../../hooks/use-amounts';
import { CurrencyCardType } from '../../../redux/slices/currency-cards.slice';

export function Main() {
    const { swapCurrencyCardActive, isTopCardActive } = useCurrencyCards();
    const { topAmount, botAmount, onNewBotAmount, onNewTopAmount } = useAmounts();
    const { topCurrency, botCurrency, onNewTopCurrency, onNewBotCurrency } = useCurrencyCardsSelector();
 
    return (
        <div className='main'>
            <Header />
            <div className="cardsWrapper">
                <CurrencyCard
                    currencyValue={topCurrency}
                    amountValue={topAmount}
                    currencyCardType={CurrencyCardType.TOP}
                    onChangeSelector={onNewTopCurrency}
                    onChangeAmount={onNewTopAmount}
                />
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
