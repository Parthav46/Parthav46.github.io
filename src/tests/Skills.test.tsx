import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as firestoreHelpers from '../utils/firestoreHelpers';
import Skills from '../components/Skills';

jest.mock('../utils/firestoreHelpers');

describe('Skills', () => {
  it('renders skills from Firestore', async () => {
    (firestoreHelpers.fetchSectionDoc as jest.Mock).mockResolvedValue({ skills: ['JavaScript', 'TypeScript'] });
    render(<Skills />);
    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });
});
