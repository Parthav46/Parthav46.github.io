import React, { useEffect, useState } from 'react';
import ThemeManager from '../components/ThemeManager';
import Header, { HeaderObjectType } from '../components/Header';

function App ()
{
    const [components, updateComponent] = useState<{[key: string]: HeaderObjectType}>({
        'bio': { title: 'Bio' },
        'skills': { title: 'Skills' },
        'experience': { title: 'Experience' },
        'projects': { title: 'Projects' }
    });

    useEffect(() => {
        focusSection('bio')
    }, []);

    const focusSection = (id: string): void => {
        let updatedComponent: {[key: string]: HeaderObjectType} = {};
        Object.entries(components).forEach(([key, value]) => {
            let isSelected = key === id;
            updatedComponent[key] = { ...value, isSelected: isSelected };
        });
        updateComponent(updatedComponent);
    }

    return (
        <ThemeManager>
            <Header headers={components} onHeaderSelect={focusSection} />
        </ThemeManager>
    )
}

export default App;