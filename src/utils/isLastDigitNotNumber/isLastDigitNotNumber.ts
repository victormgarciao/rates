const chars = new Set(['+', '-', '.', ',']);

export function isLastDigitNotNumber(value: string) : boolean {
    return chars.has(value);
}