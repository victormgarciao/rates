import { eq as areEqual} from "lodash";

export function isLastDigitNotNumber(value: string) : boolean {
    return( 
        areEqual(value, '+')
        || areEqual(value, '-')
        || areEqual(value, '.')
        || areEqual(value, ',')
    );
};
