import { ExchangeScreen } from '../exchange-screen/exchange-screen';
import { Pockets } from '../pockets/pockets';

export function Main() {
    return (
        <div className='main' data-testid='main'>
            <ExchangeScreen />
            <Pockets />
        </div>
    );
}
