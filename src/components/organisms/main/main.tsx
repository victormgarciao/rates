import './main.css';

import { CurrencyCard, CurrencyCardType } from "../../molecules/currency-card/currency-card";
import { Header } from "../../atoms/header/header";
import { Currencies } from '../../atoms/currency-selector/currency-selector';
import { ChangeEvent, useState } from 'react';
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

    function onChangeTopCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        setTopCurrency(event.target.value as Currencies);
    }

    function onChangeBotCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        setBotCurrency(event.target.value as Currencies);
    }

    function isTopCardActive() : boolean {
        return activeCard === CurrencyCardType.TOP;
    }

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

    function handleNewAmountValues(newValue : number) : void {
        if (isTopCardActive()) {
            setTopAmount(replacingDotForComma('-' + newValue));
            setBotAmount(replacingDotForComma('+' + getRateCalculation(topCurrency, botCurrency, newValue)));
        } else {
            setBotAmount(replacingDotForComma('-' + newValue));
            setTopAmount(replacingDotForComma('+' + getRateCalculation(botCurrency, topCurrency, newValue)));
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

    function onChangeAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        const newValue : string = event.target.value;

        if (isNewValueOk(newValue)) {
            const newValueAsPositiveNumber = Math.abs(Number(newValue.replace(',', '.')));
    
            resetAmountValues();
            handleNewAmountValues(newValueAsPositiveNumber);
        }
    }

    function isTopCard(currencyCardType: CurrencyCardType) : boolean {
        return currencyCardType === CurrencyCardType.TOP
    }

    function handleAmountsOnSwapCard(newCurrencyCardType: CurrencyCardType) : void {
        if (isTopCard(newCurrencyCardType)) {
            setTopAmount('-' + topAmount.slice(1));
            setBotAmount('+' + botAmount.slice(1));
        } 
        else {
            setTopAmount('+' + topAmount.slice(1));
            setBotAmount('-' + botAmount.slice(1));
        }
    }

    function handleActiveCard(newCurrencyCardType : CurrencyCardType): void {
        const hasNotAmount = topAmount === '';
        const isAlreadyThisCard = activeCard === newCurrencyCardType;

        if (hasNotAmount || isAlreadyThisCard) return;

        setActiveCard(newCurrencyCardType);
        handleAmountsOnSwapCard(newCurrencyCardType);
    }

    return (
        <div className='main'>
            <Header />
            <CurrencyCard
                defaultSelectorValue={topCurrency}
                onChangeSelector={onChangeTopCurrency}
                disabledCurrency={botCurrency}
                onChangeAmount={onChangeAmount}
                currencyCardType={CurrencyCardType.TOP}
                amountValue={topAmount}
                handleActiveCard={handleActiveCard}
            />
            <CurrencyCard
                defaultSelectorValue={botCurrency}
                onChangeSelector={onChangeBotCurrency}
                disabledCurrency={topCurrency}
                onChangeAmount={onChangeAmount}
                currencyCardType={CurrencyCardType.BOTTOM}
                amountValue={botAmount}
                handleActiveCard={handleActiveCard}
            />
        </div>
    );
}
