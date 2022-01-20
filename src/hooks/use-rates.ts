import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRates, selectRatesValues, setRates } from "../redux/slices/rates.slice";


async function getRatesRequest(): Promise<IRates> {
    return axios
        .get('https://openexchangerates.org/api/latest.json?app_id=a9caea7b55244051b167a83287ef31bd')
        .then((rateRequest : AxiosResponse): IRates => rateRequest.data.rates);
}

export function useRates(): IRates {
    const rates = useSelector(selectRatesValues);
    const dispatch = useDispatch();

    console.log(rates);

    function dispatchSetRates(rates: IRates) : void {
        dispatch(setRates(rates));
    }

    function setRatesToStore() : void {
        getRatesRequest().then(dispatchSetRates);
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

    return rates;
}
