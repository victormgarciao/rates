import React from 'react';
import './App.css';
import { useRates } from './hooks/use-rates';

function App() {

  const rates = useRates();
  console.log(rates);

  return (
    <div className="App" data-testid="app">
      <header className="App-header" data-testid="app-header">
        THIS IS HEADER
      </header>
      <div className="main" data-testid="main">
        THIS IS MAIN
      </div>
    </div>
  );
}

export default App;
