import { eq as areEqual } from 'lodash';
import { PocketTitle } from '../../atoms/pocket-left/pocket-left';
import { PocketRight } from '../../atoms/pocket-right/pocket-right';
import { usePockets } from '../../../hooks/use-pockets';
import { Currencies, Symbols } from '../../../redux/slices/currency-cards.slice';

import './pocket.css';

interface IPocketProps {
    currency: Currencies,
    symbol: Symbols,
    amount: string,
}

export function Pocket(props: IPocketProps) {
    const {
        currency,
        symbol,
        amount,
    } = props;

    const { openExchange } = usePockets();

    const isGBP = areEqual(currency, Currencies.GBP);

    return (
        <div
            className={`pocket ${currency}`}
            key={currency}
            onClick={openExchange(currency)}
        >
            <PocketTitle>{currency}</PocketTitle>
            <PocketRight 
                amount={amount}
                symbol={symbol}
                isReverse={isGBP}
            />
        </div>
    );
}
