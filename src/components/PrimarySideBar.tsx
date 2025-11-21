import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFileEarmarkCode, BsInfoCircle, BsNewspaper, BsBook, BsPen, BsEnvelope } from 'react-icons/bs'; // VSCode-like icons
import { useTab } from '../context/TabContext'; // Import useTab hook
import './PrimarySideBar.scss';

const sectionMap = {
  home: { id: 'home', name: 'home.py', path: '/', language: 'python', icon: BsFileEarmarkCode },
  about: { id: 'about', name: 'about.py', path: '/about', language: 'python', icon: BsInfoCircle },
  blog: { id: 'blog', name: 'blog.qmd', path: '/blog', language: 'yaml', icon: BsNewspaper },
  research: { id: 'research', name: 'research.R', path: '/research', language: 'r', icon: BsBook },
  // Publications and Projects are sub-sections of Research, so they might not need direct tabs
  // If they do, they'll need their own unique IDs and paths. For now, Research will open research.R
  teaching: { id: 'teaching', name: 'teaching.tex', path: '/teaching', language: 'latex', icon: BsPen },
  contact: { id: 'contact', name: 'contact.yaml', path: '/contact', language: 'yaml', icon: BsEnvelope },
};

const PrimarySideBar: React.FC = () => {
  const { addTab, activeTabId } = useTab();

  const handleSectionClick = (sectionId: keyof typeof sectionMap) => {
    const section = sectionMap[sectionId];
    addTab(section);
  };

  const SidebarItem = ({ sectionId, label, Icon }: { sectionId: keyof typeof sectionMap, label: string, Icon: any }) => (
    <div
      className={`sidebar-item ${activeTabId === sectionId ? 'active' : ''}`}
      onClick={() => handleSectionClick(sectionId)}
      aria-label={label}
    >
      <div className="d-flex align-items-center">
        <Icon className="sidebar-icon" />
        <span className="sidebar-item-label">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="primary-sidebar">
      <Nav className="flex-column">
        <SidebarItem sectionId="home" label="Home" Icon={sectionMap.home.icon} />
        <SidebarItem sectionId="about" label="About" Icon={sectionMap.about.icon} />
        <SidebarItem sectionId="blog" label="Blog" Icon={sectionMap.blog.icon} />
        <SidebarItem sectionId="research" label="Research" Icon={sectionMap.research.icon} />
        <SidebarItem sectionId="teaching" label="Teaching" Icon={sectionMap.teaching.icon} />
        <SidebarItem sectionId="contact" label="Contact" Icon={sectionMap.contact.icon} />
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
