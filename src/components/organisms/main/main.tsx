import { ExchangeScreen } from '../exchange-screen/exchange-screen';
import { Pockets } from '../pockets/pockets';

import './main.css';
import { useSelector } from 'react-redux';
import { selectIsPocketScreen } from '../../../redux/slices/screens.slice';

export function Main() {
    const isPocketsScreen = useSelector(selectIsPocketScreen);
    return (
        <div className='main' data-testid='main'>
            { isPocketsScreen ? <Pockets /> : <ExchangeScreen />}
        </div>
    );
}
