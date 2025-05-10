import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as firestoreHelpers from '../utils/firestoreHelpers';
import Experience from '../components/Experience';

jest.mock('../utils/firestoreHelpers');

describe('Experience', () => {
  it('renders experiences from Firestore', async () => {
    (firestoreHelpers.fetchSectionDoc as jest.Mock).mockResolvedValue({ experiences: [
      { company: 'Test Co', role: 'Dev', period: '2020', description: 'Did stuff' }
    ] });
    render(<Experience />);
    await waitFor(() => {
      expect(screen.getByText(/Dev @ Test Co/)).toBeInTheDocument();
      expect(screen.getByText('2020')).toBeInTheDocument();
      expect(screen.getByText('Did stuff')).toBeInTheDocument();
    });
  });
});
