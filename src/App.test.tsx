import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store/store'

describe('App' , () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	test('renders root', () => {
		const linkElement = screen.getByTestId('app');
		expect(linkElement).toBeInTheDocument();
	});

	test('renders main', () => {
	  const linkElement = screen.getByTestId('main');
	  expect(linkElement).toBeInTheDocument();
	});
});
