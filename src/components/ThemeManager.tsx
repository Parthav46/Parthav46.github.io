import React, {
  useState,
  useEffect,
  ReactNode,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
} from "react";
import "../css/theme.css";

const Theme = {
  LIGHT: "light",
  DARK: "dark",
};

export type ThemeManagerRefType = {
  theme: string;
  changeTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
};

type ThemeManagerProps = {
  children: ReactNode;
  className?: String;
};

const ThemeManager = forwardRef(
  (
    { children, className = "" }: ThemeManagerProps,
    ref: ForwardedRef<ThemeManagerRefType>,
  ) => {
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
      let body = document.querySelector("body");
      body?.setAttribute("class", "");
      body?.classList.add(theme);
    }, [theme]);

    return (
      <div className={["base", theme, className.split(" ")].join(" ").trim()}>
        {children}
      </div>
    );
  },
);

export default ThemeManager;
