import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeManager, { ThemeManagerRefType } from '../components/ThemeManager';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe('ThemeManager', () => {
  it('renders children and applies theme class', () => {
    render(
      <ThemeManager>
        <div>Theme Test</div>
      </ThemeManager>
    );
    expect(screen.getByText('Theme Test')).toBeInTheDocument();
    const body = document.querySelector('body');
    expect(body?.classList.contains('light') || body?.classList.contains('dark')).toBe(true);
  });

  it('toggles theme using ref', () => {
    const ref = createRef<ThemeManagerRefType>();
    render(
      <ThemeManager ref={ref}>
        <div>Theme Toggle Test</div>
      </ThemeManager>
    );
    const initialTheme = ref.current?.theme;
    act(() => {
      ref.current?.toggleTheme();
    });
    expect(ref.current?.theme).not.toBe(initialTheme);
  });
});
