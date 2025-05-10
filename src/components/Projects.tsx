import React from "react";

const projects = [
  {
    name: "Personal Portfolio Website",
    link: "https://parthav.in",
    description: "A modern, responsive website to showcase my skills and projects. Built with React and TypeScript."
  },
  {
    name: "Open Source Contribution",
    link: "https://github.com/Parthav46/some-repo",
    description: "Contributed features and bug fixes to open source projects on GitHub."
  }
];

const Projects = () => (
  <section>
    <h2>Projects</h2>
    <ul>
      {projects.map((project, idx) => (
        <li key={idx}>
          <a href={project.link} target="_blank" rel="noopener noreferrer">{project.name}</a>: {project.description}
        </li>
      ))}
    </ul>
  </section>
);

export default Projects;
