import React from "react";
import "../css/Header.css";

export type HeaderObjectType = {
  title: String;
  isSelected?: Boolean;
};

type HeaderProps = {
  headers: { [key: string]: HeaderObjectType };
  onHeaderSelect?: (key: string) => void;
};

function Header({ headers, onHeaderSelect }: HeaderProps) {
  return (
    <>
      <div className="HeaderFill"></div>
      <header className="Header">
        {Object.entries(headers).map(([key, value]) => (
          <span
            key={key}
            className={value.isSelected && "selected"}
            onClick={() => onHeaderSelect && onHeaderSelect(key)}
          >
            {value.title}
          </span>
        ))}
      </header>
    </>
  );
}

export default Header;
