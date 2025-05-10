import React, { useEffect, useState } from 'react';
import { fetchSectionDoc } from '../utils/firestoreHelpers';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetchSectionDoc('project');
      setProjects(data?.projects || []);
    };
    fetchProjects();
  }, []);

  return (
    <section>
      <h2>Projects</h2>
      <ul>
        {projects.map((project, idx) => (
          <li key={idx}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
            : {project.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
