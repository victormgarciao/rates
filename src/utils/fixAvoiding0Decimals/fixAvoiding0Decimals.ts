export function fixAvoiding0Decimals(value : number) : string {
    return Number(value.toFixed(2)).toString();
}
