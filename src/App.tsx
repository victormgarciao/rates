import React from 'react';
import './App.css';
import { useRates } from './hooks/use-rates';
import { Main } from './components/organisms/main/main'

function App() {

    const rates = useRates();
    console.log(rates);

    return (
        <div className='App' data-testid='app'>
            <Main />
        </div>
    );
}

export default App;
