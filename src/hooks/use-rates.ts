import { useSelector } from 'react-redux';
import { Currencies } from '../redux/slices/currency-selectors.slices';
import { IRates, selectRatesValues } from '../redux/slices/rates.slice';


interface IUseRatesResponse {
    rates: IRates,
}


export function useRates(): IUseRatesResponse {
    const rates = useSelector(selectRatesValues);
    console.log(rates);
    return { rates };
}
