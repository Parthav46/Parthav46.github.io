import React, { useState, useEffect, ReactNode, useImperativeHandle, forwardRef, ForwardedRef } from 'react';


const Theme = {
    LIGHT: 'light',
    DARK: 'dark'
};

export type ThemeManagerRefType = {
    theme: string,
    changeTheme: React.Dispatch<React.SetStateAction<string>>,
    toggleTheme: () => void
}

type ThemeManagerProps = {
    children: ReactNode
}

const ThemeManager = forwardRef(({children}: ThemeManagerProps, ref: ForwardedRef<ThemeManagerRefType>) => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    systemTheme.addEventListener('change', (ev: MediaQueryListEvent) => {
    changeTheme(ev.matches ? Theme.DARK : Theme.LIGHT)
    });
    const [theme, changeTheme] = useState(systemTheme.matches ? Theme.DARK : Theme.LIGHT);

    const toggleTheme = () => {
        changeTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    }

    useImperativeHandle(ref, () => ({
        theme,
        changeTheme,
        toggleTheme
    }));

    useEffect(() => {
        theme && localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className={theme}>
            {children}
        </div>
    )
});

export default ThemeManager;