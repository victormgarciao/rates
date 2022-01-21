import { eq as areEqual} from "lodash";

export function isAmountNotNumber(value: string) : boolean {
    return( 
        areEqual(value, '+')
        || areEqual(value, '-')
        || areEqual(value, '.')
        || areEqual(value, ',')
    );
};
