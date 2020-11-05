import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { words } from './utils/words';
import useKeyPress from './hooks/useKeyPress';
const initialWords = words();

function App() {
  const [leftPadding, setLeftPadding] = useState(new Array(20).fill(' ').join(''));
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  useKeyPress(key => { console.log(key); });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
