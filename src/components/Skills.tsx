import React from 'react';

const skills = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React.js',
  'Node.js',
  'HTML5 & CSS3',
  'Git & GitHub',
  'REST APIs',
  'SQL & NoSQL Databases',
];

const Skills = () => (
  <section>
    <h2>Technical Skills</h2>
    <ul>
      {skills.map(skill => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </section>
);

export default Skills;
