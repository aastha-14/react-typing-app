import './App.css';
import './bootstrap.min.css';
import { useState } from 'react';
import Typing from './components/Typing';
// import VirtualKeyboard from 'react-virtual-keyboard';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import Keyboard1 from './components/Keyboard';
function App() {
  const [typing, setTyping] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [display, setDisplay] = useState(true);
  return (
    <div className="App">
      <h1>Typing Insanity</h1>
      <header className="App-header">
        {typing
          ? <><Typing /></>
          : display ? <>
            <button className='btn btn-danger disabled btn-lg' onClick={
              () => { setTyping(true); setDisplay(false); }
            }>Start</button>
            <button className='btn btn-danger disabled btn-lg' onClick={
              () => { setVirtual(true); setDisplay(false); }
            }>Use Virtual Keyboard</button></> : <></>}
        {
          virtual && <><Keyboard1 /> </>
        }
      </header>
    </div>
  );
}

export default App;
