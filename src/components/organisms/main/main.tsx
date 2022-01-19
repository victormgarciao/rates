import './main.css';

import { CurrencyCard, CurrencyCardType } from "../../molecules/currency-card/currency-card";
import { Header } from "../../atoms/header/header";
import { Currencies } from '../../atoms/currency-selector/currency-selector';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRatesValues } from '../../../redux/slices/rates.slice';

export function Main() {
    const [ topCurrency, setTopCurrency ] = useState(Currencies.USD);
    const [ botCurrency, setBotCurrency ] = useState(Currencies.EUR);
    const [ topAmount, setTopAmount ] = useState('');
    const [ botAmount, setBotAmount ] = useState('');
    const [ activeCard, setActiveCard ] = useState(CurrencyCardType.TOP);

    const rates = useSelector(selectRatesValues);

    function getRateCalculation(fromCurrency: Currencies, toCurrency: Currencies, amount: number) : string {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const times = fromRate / toRate;
        return (amount * times).toFixed(2);
    }

    function isTopCardActive() : boolean {
        return activeCard === CurrencyCardType.TOP;
    }

    function isSameCurrencies(currency1: Currencies) : (a: Currencies) => boolean {
        return function checkOtherCurrency(currency2: Currencies) : boolean {
            return currency1 === currency2;
        }
    }

    function handleNewCurrencySelected(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        const newCurrencySelected = event.target.value as Currencies;
        const isSameThanNewCurrency = isSameCurrencies(newCurrencySelected);

        if (isTopCardActive()) {
            if (isSameThanNewCurrency(botCurrency)) {
                setBotCurrency(topCurrency);
            }
            setTopCurrency(newCurrencySelected);
        } else {
            if (isSameThanNewCurrency(topCurrency)) {
                setTopCurrency(botCurrency);
            }
            setBotCurrency(newCurrencySelected);
        }
    }

    useEffect(() => {
        const amountToSend = isTopCardActive() ? topAmount : botAmount;
        if(amountToSend !== '') {
            handleNewAmountValues(amountToSend)
        }
    }, [topCurrency, botCurrency]);

    function replacingDotForComma(value: string) : string {
        return value.replace('.', ',');
    }

    function hasEndingDotOrComma(newValue : string) : boolean {
        return newValue.endsWith('.') || newValue.endsWith(',');
    }

    function handleEndingDot(valueWithDotOrComma : string) : void {
        if (isTopCardActive()) { setTopAmount(replacingDotForComma(valueWithDotOrComma)); } 
        else { setBotAmount(replacingDotForComma(valueWithDotOrComma)); }
    }

    function resetAmountValues() : void {
        setTopAmount('');
        setBotAmount('');
    }

    function handleNewAmountValues(newValue : string) : void {
        if (newValue === '') return;
        const newValueAsPositiveNumber = Math.abs(Number(newValue.replace(',', '.')));
        if (isTopCardActive()) {
            setTopAmount(replacingDotForComma('-' + newValueAsPositiveNumber));
            setBotAmount(
                replacingDotForComma(
                    '+' + getRateCalculation(topCurrency, botCurrency, newValueAsPositiveNumber)
                )
            );
        } else {
            setBotAmount(replacingDotForComma('-' + newValueAsPositiveNumber));
            setTopAmount(
                replacingDotForComma(
                    '+' + getRateCalculation(botCurrency, topCurrency, newValueAsPositiveNumber)
                )
            );
        }
    }

    function isNewValueOk(value : string) : boolean {
        const isNotValidValue : boolean = !/^-?[0-9]*([\.,][0-9]*)?$/.test(value);

        if (isNotValidValue) return false;

        const isLastDigitNotANumber : boolean = value === '-' || value === ',' || value === '.';

        if (isLastDigitNotANumber) {
            resetAmountValues();
            return false;
        }

        if (hasEndingDotOrComma(value)) {
            handleEndingDot(value);
            return false;
        }

        return true;
    }

    function handleNewAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;

        if (isNewValueOk(newValue)) {
            resetAmountValues();
            handleNewAmountValues(newValue);
        }
    }

    function handleActiveCard(newCurrencyCardType : CurrencyCardType): void {
        const isAlreadyThisCard = activeCard === newCurrencyCardType;
        if (isAlreadyThisCard) return;
        setActiveCard(newCurrencyCardType);
    }

    return (
        <div className='main'>
            <Header />
            <CurrencyCard
                currencyValue={topCurrency}
                amountValue={topAmount}
                currencyCardType={CurrencyCardType.TOP}
                handleActiveCard={handleActiveCard}
                onChangeSelector={handleNewCurrencySelected}
                onChangeAmount={handleNewAmount}
            />
            <CurrencyCard
                currencyValue={botCurrency}
                amountValue={botAmount}
                currencyCardType={CurrencyCardType.BOTTOM}
                handleActiveCard={handleActiveCard}
                onChangeSelector={handleNewCurrencySelected}
                onChangeAmount={handleNewAmount}
            />
        </div>
    );
}
