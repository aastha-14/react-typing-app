import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { words } from './utils/words';
import { currentTime } from './utils/time';
import useKeyPress from './hooks/useKeyPress';

const initialWords = words();

function App() {
  const [leftPadding, setLeftPadding] = useState(new Array(20).fill(' ').join(''));
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  useKeyPress(key => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (!startTime) {
      setStartTime(currentTime());
    }
    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
      setCurrentChar(incomingChars.charAt(0));
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + words();
      }
      setIncomingChars(updatedIncomingChars);
      if (incomingChars.charAt(0) === ' ') {
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 6000.0;
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3>WPM: {wpm}</h3>
      </header>
    </div>
  );
}

export default App;
