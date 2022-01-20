import React from 'react';
import './App.css';
import { Main } from './components/organisms/main/main'
import { useInitApp } from './hooks/use-init-app'

function App() {
    useInitApp();

    return (
        <div className='App' data-testid='app'>
            <Main />
        </div>
    );
}

export default App;
