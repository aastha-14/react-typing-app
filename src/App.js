import './App.css';
import './bootstrap.min.css';
import { useState } from 'react';
import Typing from './components/Typing';

function App() {
  const [typing, setTyping] = useState(false);
  return (
    <div className="App">
      <h1>Typing Insanity</h1>
      <header className="App-header">
        {typing
          ? <><Typing /></>
          : <button className='btn btn-danger disabled btn-lg' onClick={
            () => setTyping(true)
          }>Start</button>}
      </header>
    </div>
  );
}

export default App;
