import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as firestoreHelpers from '../utils/firestoreHelpers';
import Projects from '../components/Projects';

jest.mock('../utils/firestoreHelpers');

describe('Projects', () => {
  it('renders projects from Firestore', async () => {
    (firestoreHelpers.fetchSectionDoc as jest.Mock).mockResolvedValue({ projects: [
      { name: 'Test Project', link: 'https://test.com', description: 'A test project' }
    ] });
    render(<Projects />);
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText(/A test project/)).toBeInTheDocument();
    });
  });
});
