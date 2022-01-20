import { useSelector } from 'react-redux';
import { Currencies } from '../redux/slices/currency-selectors.slices';
import { IRates, selectRatesValues } from '../redux/slices/rates.slice';


interface IUseRatesResponse {
    rates: IRates,
    getRateCalculation: (a: Currencies, b: Currencies, d: number) => string
}


export function useRates(): IUseRatesResponse {
    const rates = useSelector(selectRatesValues);
    console.log(rates);
    
    function getRateCalculation(fromCurrency: Currencies, toCurrency: Currencies, amount: number) : string {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const times = fromRate / toRate;
        return Number((amount * times).toFixed(2)).toString(); // to avoid .00
    }

    return { rates, getRateCalculation };
}
