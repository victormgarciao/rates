import axios from "axios";
import { useEffect, useState } from "react";

interface IRates {
    [key: string]: number;
}

function getRates(): Promise<IRates> {
    return axios
        .get('https://openexchangerates.org/api/latest.json?app_id=a9caea7b55244051b167a83287ef31bd')
        .then((rateRequest) => rateRequest.data.rates);
}

export function useRates(): IRates | null {
    const [ rates, setRates ] = useState<IRates | null>(null);

    useEffect(() => {
        getRates().then(setRates);
        const intervalId = setInterval(
            () => {
                getRates().then(setRates);
            },
            10000,
        );

        return function cleanup() {
            clearInterval(intervalId);
        };

    }, []);

    return rates;
}
