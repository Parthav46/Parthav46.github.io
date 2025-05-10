import React, { useEffect, useState } from 'react';
import { fetchSectionDoc } from '../utils/firestoreHelpers';

const Experience = () => {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await fetchSectionDoc('experience');
      setExperiences(data?.experiences || []);
    };
    fetchExperiences();
  }, []);

  return (
    <section>
      <h2>Work Experience</h2>
      {experiences.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: '1.5em' }}>
          <h3>
            {exp.role} @ {exp.company}
          </h3>
          <span>{exp.period}</span>
          <p>{exp.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Experience;
