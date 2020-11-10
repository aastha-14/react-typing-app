import './App.css';
import './bootstrap.min.css';
import { useState } from 'react';
import Typing from './components/Typing';
import Keyboard from './components/Keyboard';
function App() {
  const [typing, setTyping] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [display, setDisplay] = useState(true);
  return (
    <div className="App">
      <h1>Typing Insanity</h1>
      <header className="App-header">
        {typing
          ? <>
            <Typing />
            <button
              type="button"
              className='btn btn-danger disabled btn-lg'
              onClick={
                () => {
                  setTyping(false);
                  setDisplay(true);
                }
              }>Return
              </button>
          </>
          : display
            ? <>
              <h3>Test your typing speed now!</h3>
              <div className="modal-footer">
                <button
                  type="button"
                  className='btn btn-danger disabled btn-lg'
                  onClick={
                    () => {
                      setTyping(true);
                      setDisplay(false);
                    }
                  }>Start
                  </button>
                <button
                  type="button"
                  className='btn btn-info disabled btn-lg'
                  onClick={
                    () => {
                      setVirtual(true);
                      setDisplay(false);
                    }
                  }>Use Virtual Keyboard
                </button>
              </div>
            </>
            : <></>}
        {
          virtual
          && <>
            <Keyboard />
            <button
              type="button"
              className='btn btn-info disabled btn-lg'
              onClick={
                () => {
                  setVirtual(false);
                  setDisplay(true);
                }
              }>Return
              </button>
          </>
        }
      </header>
    </div>
  );
}

export default App;
