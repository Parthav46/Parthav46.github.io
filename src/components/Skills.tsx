import React, { useEffect, useState } from 'react';
import { fetchSectionDoc } from '../utils/firestoreHelpers';

const Skills = () => {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await fetchSectionDoc('skill');
      setSkills(data?.skills || []);
    };
    fetchSkills();
  }, []);

  return (
    <section>
      <h2>Technical Skills</h2>
      <ul>
        {skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
