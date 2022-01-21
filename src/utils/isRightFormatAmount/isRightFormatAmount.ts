export function isRightFormatAmount(value: string) : boolean {
    return /^[-+]?[0-9]+([\.,][0-9]*)?$/.test(value);
};
