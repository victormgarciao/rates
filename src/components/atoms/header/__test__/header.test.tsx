import { cleanup, render, screen } from '@testing-library/react';
import { Header } from '../header';

describe('Header' , () => {

    afterEach(() => cleanup());

    test('Render the element', () => {
        render(
            <Header />
        );
        const headerElement: HTMLDivElement = screen.getByTestId('header');
        expect(headerElement).toBeInTheDocument();
    });
    
    test('It has header class', () => {
        render(
            <Header />
        );
        const headerElement: HTMLDivElement = screen.getByTestId('header');
        expect(headerElement).toHaveClass('header');
    });
    
    test('It has header Heading', () => {
        render(
            <Header />
        );
        const headingElement: HTMLHeadingElement = screen.getByText('Rates Calculation');
        expect(headingElement).toBeInTheDocument();
    });
});
