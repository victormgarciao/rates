import './pocket-right.css';

interface IPocketRightProps {
    amount: string,
    symbol: string,
    isReverse: boolean,
}

export function PocketRight({ amount, symbol, isReverse }: IPocketRightProps) {
    const reverseClass = isReverse ? 'reverse' : '';

    return (
        <div className={`pocket--right ${reverseClass}`}>
            <span className='amount'>{amount}</span><span className='currency'>{symbol}</span>
        </div>
    );
};
