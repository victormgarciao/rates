import { cleanup, render, screen } from '@testing-library/react';
import { Header } from '../header';

describe('Header' , () => {

    afterEach(() => cleanup());

    test('Render the element and has the data-testid we passed in', () => {
        render(
            <Header dataTestid='tupi-id'>Tupitupi</Header>
        );
        const headerElement: HTMLDivElement = screen.getByTestId('tupi-id');
        expect(headerElement).toBeInTheDocument();
    });
    
    test('It has header class', () => {
        render(
            <Header dataTestid='tupi-id'>Tupitupi</Header>
        );
        const headerElement: HTMLDivElement = screen.getByTestId('tupi-id');
        expect(headerElement).toHaveClass('header');
    });
    
    test('The text between tags is on the header Heading', () => {
        render(
            <Header dataTestid='tupi-id'>Tupitupi</Header>
        );
        const headingElement: HTMLHeadingElement = screen.getByText('Tupitupi');
        expect(headingElement).toBeInTheDocument();
    });
});
