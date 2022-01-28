import './header.css';

export function Header({ children, dataTestid }: { children: string, dataTestid: string }) {
    return (
        <div className='header' data-testid={dataTestid}>
            <h1>{children}</h1>
        </div>
    );
}
