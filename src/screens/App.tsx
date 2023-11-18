import React, { useState, useEffect } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import '../css/theme.css';

const Theme = {
  LIGHT: 'light',
  DARK: 'dark'
};

function App() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  systemTheme.addEventListener('change', (ev: MediaQueryListEvent) => {
    changeTheme(ev.matches ? Theme.DARK : Theme.LIGHT)
  });
  const [theme, changeTheme] = useState(systemTheme.matches ? Theme.DARK : Theme.LIGHT);

  useEffect(() => {
    theme && localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={"App, " + theme}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Site under Construction!!!
        </p>
        <span className="App-link" onClick={() => changeTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
          Toggle Theme
        </span>
      </header>
    </div>
  );
}
export default App;
