import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header, { HeaderObjectType } from '../components/Header';

describe('Header', () => {
  const headers: { [key: string]: HeaderObjectType } = {
    home: { title: 'Home', isSelected: true },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  };

  it('renders all header titles', () => {
    render(<Header headers={headers} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('calls onHeaderSelect when a header is clicked', () => {
    const onHeaderSelect = jest.fn();
    render(<Header headers={headers} onHeaderSelect={onHeaderSelect} />);
    fireEvent.click(screen.getByText('About'));
    expect(onHeaderSelect).toHaveBeenCalledWith('about');
  });

  it('applies selected class to selected header', () => {
    render(<Header headers={headers} />);
    const selected = screen.getByText('Home');
    expect(selected.className).toContain('selected');
  });
});
