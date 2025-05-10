import React from 'react';

const experiences = [
  {
    company: 'Tech Solutions Inc.',
    role: 'Frontend Developer',
    period: '2022 - Present',
    description:
      'Developed and maintained web applications using React and TypeScript. Collaborated with designers and backend developers to deliver high-quality products.',
  },
  {
    company: 'InnovateX Labs',
    role: 'Software Engineer Intern',
    period: '2021 - 2022',
    description:
      'Worked on building RESTful APIs and integrating them with frontend applications. Improved code quality and performance.',
  },
];

const Experience = () => (
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

export default Experience;
