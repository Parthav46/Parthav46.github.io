import React, { useEffect, useState } from 'react';
import ThemeManager from '../components/ThemeManager';
import Header, { HeaderObjectType } from '../components/Header';
import { default as PApp } from './Placeholder';
import Bio from '../components/Bio';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';

function App() {
  const sectionOrder = ['bio', 'skills', 'experience', 'projects'];
  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    bio: React.useRef<HTMLDivElement>(null),
    skills: React.useRef<HTMLDivElement>(null),
    experience: React.useRef<HTMLDivElement>(null),
    projects: React.useRef<HTMLDivElement>(null),
  };
  const [components, updateComponent] = useState<{
    [key: string]: HeaderObjectType;
  }>({
    bio: { title: 'Bio' },
    skills: { title: 'Skills' },
    experience: { title: 'Experience' },
    projects: { title: 'Projects' },
  });
  const [selectedSection, setSelectedSection] = useState<string>('bio');

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionOrder.map(key => {
        const ref = sectionRefs[key].current;
        return ref ? Math.abs(ref.getBoundingClientRect().top - 70) : Infinity;
      });
      const minOffset = Math.min(...offsets);
      const idx = offsets.indexOf(minOffset);
      const active = sectionOrder[idx];
      if (active && active !== selectedSection) {
        focusSection(active, false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [selectedSection]);

  const focusSection = (id: string, scrollTo: boolean = true): void => {
    let updatedComponent: { [key: string]: HeaderObjectType } = {};
    Object.entries(components).forEach(([key, value]) => {
      let isSelected = key === id;
      updatedComponent[key] = { ...value, isSelected: isSelected };
    });
    updateComponent(updatedComponent);
    setSelectedSection(id);
    if (scrollTo && sectionRefs[id]?.current) {
      sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {process.env.NODE_ENV === 'production' && <PApp />}
      {process.env.NODE_ENV !== 'production' && (
        <ThemeManager>
          <Header headers={components} onHeaderSelect={focusSection} />
          <main
            style={{
              marginTop: 60,
              padding: 24,
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div ref={sectionRefs.bio} id="bio" style={{ minHeight: '100vh', scrollMarginTop: 70 }}>
              <Bio />
            </div>
            <div
              ref={sectionRefs.skills}
              id="skills"
              style={{ minHeight: '100vh', scrollMarginTop: 70 }}
            >
              <Skills />
            </div>
            <div
              ref={sectionRefs.experience}
              id="experience"
              style={{ minHeight: '100vh', scrollMarginTop: 70 }}
            >
              <Experience />
            </div>
            <div
              ref={sectionRefs.projects}
              id="projects"
              style={{ minHeight: '100vh', scrollMarginTop: 70 }}
            >
              <Projects />
            </div>
          </main>
        </ThemeManager>
      )}
    </>
  );
}

export default App;
