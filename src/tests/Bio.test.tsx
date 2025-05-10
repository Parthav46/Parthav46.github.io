import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as firestoreHelpers from '../utils/firestoreHelpers';
import Bio from '../components/Bio';

jest.mock('../utils/firestoreHelpers');

describe('Bio', () => {
  it('renders about text from Firestore', async () => {
    (firestoreHelpers.fetchSectionDoc as jest.Mock).mockResolvedValue({ about: 'Test About Me' });
    render(<Bio />);
    await waitFor(() => {
      expect(screen.getByText('Test About Me')).toBeInTheDocument();
    });
  });
});
