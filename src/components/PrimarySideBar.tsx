import React, { useState } from 'react'; // Import useState
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFileEarmarkCode, BsInfoCircle, BsNewspaper, BsBook, BsPen, BsEnvelope, BsFolder, BsFileEarmark, BsChevronRight, BsChevronDown } from 'react-icons/bs'; // VSCode-like icons and folder/chevron icons
import { useTab } from '../context/TabContext'; // Import useTab hook
import './PrimarySideBar.scss';

const sectionMap = {
  home: { id: 'home', name: 'home.py', path: '/', language: 'python', icon: BsFileEarmarkCode },
  about: { id: 'about', name: 'about.py', path: '/about', language: 'python', icon: BsInfoCircle },
  blog: { id: 'blog', name: 'blog.qmd', path: '/blog', language: 'yaml', icon: BsNewspaper },
  research: { id: 'research', name: 'research', isFolder: true, icon: BsFolder }, // Research as a folder
  publications: { id: 'publications', name: 'publications.R', path: '/research/publications', language: 'r', icon: BsFileEarmark },
  projects: { id: 'projects', name: 'projects.R', path: '/research/projects', language: 'r', icon: BsFileEarmark },
  teaching: { id: 'teaching', name: 'teaching.tex', path: '/teaching', language: 'latex', icon: BsPen },
  contact: { id: 'contact', name: 'contact.yaml', path: '/contact', language: 'yaml', icon: BsEnvelope },
};

// Define a type for the keys of sectionMap
type SectionId = keyof typeof sectionMap;

const PrimarySideBar: React.FC = () => {
  const { addTab, activeTabId } = useTab();
  const [isResearchOpen, setIsResearchOpen] = useState(false); // State for Research folder

  const handleSectionClick = (sectionId: SectionId) => {
    const section = sectionMap[sectionId];
    if (!section.isFolder) { // Only add tab if it's not a folder
      addTab(section);
    }
  };

  const toggleResearch = () => {
    setIsResearchOpen(prev => !prev);
  };

  const SidebarItem = ({ sectionId, label, Icon, isFolder = false, isSubItem = false }: { sectionId: SectionId, label: string, Icon: any, isFolder?: boolean, isSubItem?: boolean }) => {
    const isActive = activeTabId === sectionId;
    const itemClass = `sidebar-item ${isActive ? 'active' : ''} ${isSubItem ? 'sidebar-sub-item' : ''}`;

    if (isFolder) {
      return (
        <div className="sidebar-item-toggle" onClick={toggleResearch}>
          <div className="d-flex align-items-center">
            {isResearchOpen ? <BsChevronDown className="sidebar-arrow" /> : <BsChevronRight className="sidebar-arrow" />}
            <Icon className="sidebar-icon" />
            <span className="sidebar-item-label">{label}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={itemClass}
        onClick={() => handleSectionClick(sectionId)}
        aria-label={label}
      >
        <div className="d-flex align-items-center">
          <Icon className="sidebar-icon" />
          <span className="sidebar-item-label">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="primary-sidebar">
      <Nav className="flex-column">
        <SidebarItem sectionId="home" label="Home" Icon={sectionMap.home.icon} />
        <SidebarItem sectionId="about" label="About" Icon={sectionMap.about.icon} />
        <SidebarItem sectionId="blog" label="Blog" Icon={sectionMap.blog.icon} />
        
        <SidebarItem sectionId="research" label="Research" Icon={sectionMap.research.icon} isFolder={true} />
        {isResearchOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="publications" label="Publications" Icon={sectionMap.publications.icon} isSubItem={true} />
            <SidebarItem sectionId="projects" label="Projects" Icon={sectionMap.projects.icon} isSubItem={true} />
          </div>
        )}

        <SidebarItem sectionId="teaching" label="Teaching" Icon={sectionMap.teaching.icon} />
        <SidebarItem sectionId="contact" label="Contact" Icon={sectionMap.contact.icon} />
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
