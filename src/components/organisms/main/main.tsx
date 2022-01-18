import './main.css';

import { CurrencyHandler } from "../../molecules/currency-handler/currency-handler";
import { Header } from "../../atoms/header/header";
import { Currencies } from '../../atoms/currency-selector/currency-selector';

export function Main() {
    return (
        <div className='main'>
            <Header />
            <CurrencyHandler />
            <CurrencyHandler defaultSelectorValue={Currencies.EUR} />
        </div>
    );
}
