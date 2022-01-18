import './main.css';

import { CurrencyHandler, CurrencyHandlerType } from "../../molecules/currency-handler/currency-handler";
import { Header } from "../../atoms/header/header";
import { Currencies } from '../../atoms/currency-selector/currency-selector';
import { ChangeEvent, useState } from 'react';

export function Main() {
    const [ topCurrency, setTopCurrency ] = useState(Currencies.USD);
    const [ botCurrency, setBotCurrency ] = useState(Currencies.EUR);
    const [ topAmount, setTopAmount ] = useState(0);
    const [ botAmount, setBotAmount ] = useState(0);
    const [ activeHandler, setActiveHandler ] = useState(CurrencyHandlerType.TOP);

    function onChangeTopCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        setTopCurrency(event.target.value as Currencies);
    }

    function onChangeBotCurrency(event: ChangeEvent<HTMLSelectElement>) : void {
        event.preventDefault();
        setBotCurrency(event.target.value as Currencies);
    }

    function onChangeTopAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        if (activeHandler === CurrencyHandlerType.TOP) {
            setTopAmount(Number(event.target.value));
            setBotAmount(Number(event.target.value) * 2);
        }
    }
    
    function onChangeBotAmount(event: ChangeEvent<HTMLInputElement>) : void {
        event.preventDefault();
        if (activeHandler === CurrencyHandlerType.BOTTOM) {
            setTopAmount(Number(event.target.value) * 2);
            setBotAmount(Number(event.target.value));
        }
    }

    return (
        <div className='main'>
            <Header />
            <CurrencyHandler
                defaultSelectorValue={topCurrency}
                onChangeSelector={onChangeTopCurrency}
                disabledCurrency={botCurrency}
                onChangeAmount={onChangeTopAmount}
                setActiveHandler={setActiveHandler}
                currencyHandlerType={CurrencyHandlerType.TOP}
                amountValue={topAmount}
            />
            <CurrencyHandler
                defaultSelectorValue={botCurrency}
                onChangeSelector={onChangeBotCurrency}
                disabledCurrency={topCurrency}
                onChangeAmount={onChangeBotAmount}
                setActiveHandler={setActiveHandler}
                currencyHandlerType={CurrencyHandlerType.BOTTOM}
                amountValue={botAmount}
            />
        </div>
    );
}
