import { Header } from '../../atoms/header/header';
import { Pocket } from '../../molecules/pocket/pocket';

import './pockets.css';
import { useSelector } from 'react-redux';
import { selectPockets, IPocket } from '../../../redux/slices/pockets.slice';
import { Currencies } from '../../../redux/slices/currency-cards.slice';

export function Pockets() {
    function getPockets(props: any) {
        const [ currency, pocket ]: [Currencies, IPocket] = props;

        return (
            <Pocket
                key={currency}
                currency={currency as Currencies}
                symbol={pocket.symbol}
                amount={pocket.amount}
            />
        );
    };


    const pockets = useSelector(selectPockets);


    return (
        <>
            <Header dataTestid='pockets-header'>Pockets</Header>
            <div className='pockets' data-testid='pockets'>
                {Object.entries(pockets).map(getPockets)}
            </div>
        </>
    );
}
