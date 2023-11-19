import React, { useRef } from 'react';
import logo from '../images/logo.svg';
import '../css/Placeholder.css';
import ThemeManager, { ThemeManagerRefType } from '../components/ThemeManager';


function App() {
  let themeRef = useRef<ThemeManagerRefType>(null);

  const toggleTheme = () => {
    if (themeRef.current)
    {
      themeRef.current.toggleTheme()
    }
  }

  return (
    <ThemeManager ref={themeRef}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Site under Construction!!!
          </p>
          <span className="App-link" onClick={toggleTheme}>
            Toggle Theme
          </span>
        </header>
      </div>
    </ThemeManager>
  );
}
export default App;
