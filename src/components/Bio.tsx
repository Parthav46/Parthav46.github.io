import React, { useEffect, useState } from 'react';
import { fetchSectionDoc } from '../utils/firestoreHelpers';

const Bio = () => {
  const [about, setAbout] = useState('');

  useEffect(() => {
    const fetchBio = async () => {
      const data = await fetchSectionDoc('bio');
      setAbout(data?.about || '');
    };
    fetchBio();
  }, []);

  return (
    <section>
      <h2>About Me</h2>
      <p>{about}</p>
    </section>
  );
};

export default Bio;
