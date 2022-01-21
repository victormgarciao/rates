import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { IRates, setRates } from '../redux/slices/rates.slice';


async function getRatesRequest(): Promise<IRates> {
    return axios
        .get('https://freecurrencyapi.net/api/v2/latest?apikey=5ca83ea0-79e5-11ec-8c3d-57529e73566c')
        .then((rateRequest : AxiosResponse): IRates => rateRequest.data.data);
}


const mockRates = {
    'EUR': 0.88154,
    'GBP': 0.73355,
};


export function useInitApp(): void {
    const dispatch = useDispatch();


    function dispatchSetRates(rates: IRates) : void {
        const ratesWithDolarRate = { ...rates, USD: 1 };
        // console.log(ratesWithDolarRate);
        dispatch(setRates(ratesWithDolarRate));
    }


    function setRatesToStore() : void {
        // console.log('YOU HAVE CALLED THE API');
        // getRatesRequest().then(dispatchSetRates); // I AM MOCKING VALUE TO NOT GET THE LIMIT CALLS OF THE API
        dispatchSetRates(mockRates);
    }


    useEffect(() => {
        setRatesToStore();
        const intervalId = setInterval(
            () => setRatesToStore(),
            10000,
        );

        return function cleanup() {
            clearInterval(intervalId);
        };

    }, []);
}
