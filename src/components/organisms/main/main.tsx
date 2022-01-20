import './main.css';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { CurrencyCard, CurrencyCardType } from "../../molecules/currency-handler/currency-card";
import { Header } from "../../atoms/header/header";
import { Currencies } from '../../atoms/currency-selector/currency-selector';
import { useRates } from '../../../hooks/use-rates';
import { eq as areEqual } from 'lodash';

export function Main() {
    const [ topCurrency, setTopCurrency ] = useState(Currencies.USD);
    const [ botCurrency, setBotCurrency ] = useState(Currencies.EUR);
    const [ topAmount, setTopAmount ] = useState('');
    const [ botAmount, setBotAmount ] = useState('');
    const [ activeCard, setActiveCard ] = useState(CurrencyCardType.TOP);

    const rates = useRates();

    function getRateCalculation(fromCurrency: Currencies, toCurrency: Currencies, amount: number) : string {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const times = fromRate / toRate;
        return Number((amount * times).toFixed(2)).toString(); // to avoid .00
    }

    function isTopCardActive() : boolean {
        return areEqual(activeCard, CurrencyCardType.TOP);
    }


    function replacingDotForComma(value: string) : string {
        return value.replace('.', ',');
    }

    function hasEndingDotOrComma(newValue : string) : boolean {
        return newValue.endsWith('.') || newValue.endsWith(',');
    }

    function handleEndingDot(valueWithDotOrComma : string, isTop: boolean) : void {
        if (isTop) { setTopAmount(replacingDotForComma(valueWithDotOrComma)); } 
        else { setBotAmount(replacingDotForComma(valueWithDotOrComma)); }
    }

    function resetAmountValues() : void {
        setTopAmount('');
        setBotAmount('');
    }

    function isNewValueOk(value : string, isTop: boolean) : boolean {
        const isNotValidValue : boolean = !/^[-+]?[0-9]*([\.,][0-9]*)?$/.test(value);

        if (isNotValidValue) return false;

        const isLastDigitNotANumber : boolean =
            areEqual(value, '+') || areEqual(value, '-') || areEqual(value, '.') || areEqual(value, ',');

        if (isLastDigitNotANumber) {
            resetAmountValues();
            return false;
        }

        if (hasEndingDotOrComma(value)) {
            handleEndingDot(value, isTop);
            return false;
        }

        return true;
    }

    function handleCta(event: MouseEvent<HTMLElement>) : void {
        event.preventDefault();

        if (isTopCardActive()) setActiveCard(CurrencyCardType.BOTTOM)
        else setActiveCard(CurrencyCardType.TOP);
    }

    function handleAmounts(value: string, isTop: boolean) : void {
        if (isNewValueOk(value, isTop)) {
            resetAmountValues();
            const numbered : number = Math.abs(Number(value.replace(',', '.')));

            if (isTop) {
                const otherCurrencyCalculated : string = getRateCalculation(topCurrency, botCurrency, numbered);
                setTopAmount(replacingDotForComma(isTopCardActive() ? `-${numbered}` : `+${numbered}`));
                setBotAmount(replacingDotForComma(isTopCardActive() ? `+${otherCurrencyCalculated}` : `-${otherCurrencyCalculated}`));
            } else {
                const otherCurrencyCalculated : string = getRateCalculation(botCurrency, topCurrency, numbered);
                setBotAmount(replacingDotForComma(isTopCardActive() ? `+${numbered}` : `-${numbered}`));
                setTopAmount(replacingDotForComma(isTopCardActive() ? `-${otherCurrencyCalculated}` : `+${otherCurrencyCalculated}`));
            }
        }
    }

    function onNewTopAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;
        const isTop = true;
        handleAmounts(newValue, isTop);
    }

    function onNewBotAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;
        const isTop = false;
        handleAmounts(newValue, isTop);
    }

    function isSameCurrencies(currency1: Currencies) : (a: Currencies) => boolean {
        return function checkOtherCurrency(currency2: Currencies) : boolean {
            return areEqual(currency1, currency2);
        }
    }

    function handleCurrencies( currency: Currencies, isTop: boolean): void {
        const isNewCurrencyEqualThan = isSameCurrencies(currency);
        if (isTop) {
            if (isNewCurrencyEqualThan(botCurrency)) setBotCurrency(topCurrency);
            setTopCurrency(currency);
        } else {
            if (isNewCurrencyEqualThan(topCurrency)) setTopCurrency(botCurrency);
            setBotCurrency(currency);
        }
    }

    function onNewTopCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isTop = true;
        handleCurrencies(newCurrencySelected, isTop);
    }

    function onNewBotCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isTop = false;
        handleCurrencies(newCurrencySelected, isTop);;
    }

    useEffect(() => {
        const amountToSend = isTopCardActive() ? topAmount : botAmount;
        const isAmountNotEmpty = !areEqual(amountToSend, '');
        if(isAmountNotEmpty) handleAmounts(amountToSend, isTopCardActive());
    }, [ topCurrency, botCurrency, activeCard ]);
 
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
                    className={`cta-transaction-direction ${isTopCardActive() ? 'active' : ''}`}
                    onClick={handleCta}
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
