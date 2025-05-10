import { fetchSectionDoc } from '../utils/firestoreHelpers';
import { getDoc, doc } from 'firebase/firestore';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => 'mockApp'),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => 'mockDb'),
  getDoc: jest.fn(),
  doc: jest.fn(() => 'mockDocRef'),
}));

describe('fetchSectionDoc', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns data if doc exists', async () => {
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => true, data: () => ({ foo: 'bar' }) });
    const data = await fetchSectionDoc('bio');
    expect(data).toEqual({ foo: 'bar' });
    expect(doc).toHaveBeenCalled();
    expect(getDoc).toHaveBeenCalled();
  });

  it('returns null if doc does not exist', async () => {
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });
    const data = await fetchSectionDoc('bio');
    expect(data).toBeNull();
  });
});
