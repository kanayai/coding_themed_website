import React, { useState } from 'react'; // Import useState
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFileEarmarkCode, BsInfoCircle, BsNewspaper, BsBook, BsPen, BsEnvelope, BsFolder, BsFileEarmark, BsChevronRight, BsChevronDown } from 'react-icons/bs'; // VSCode-like icons and folder/chevron icons
import { useTab } from '../context/TabContext'; // Import useTab hook
import './PrimarySideBar.scss';

const sectionMap = {
  home: { id: 'home', name: 'Home', isFolder: true, icon: BsFolder },
  home_file: { id: 'home_file', name: 'home.py', path: '/', language: 'python', icon: BsFileEarmarkCode },
  about: { id: 'about', name: 'About', isFolder: true, icon: BsFolder },
  about_file: { id: 'about_file', name: 'about.py', path: '/about', language: 'python', icon: BsInfoCircle },
  blog: { id: 'blog', name: 'Blog', isFolder: true, icon: BsFolder },
  blog_file: { id: 'blog_file', name: 'blog.qmd', path: '/blog', language: 'yaml', icon: BsNewspaper },
  research: { id: 'research', name: 'Research', isFolder: true, icon: BsFolder }, // Research as a folder
  publications: { id: 'publications', name: 'publications.R', path: '/research/publications', language: 'r', icon: BsFileEarmark },
  projects: { id: 'projects', name: 'projects.R', path: '/research/projects', language: 'r', icon: BsFileEarmark },
  teaching: { id: 'teaching', name: 'Teaching', isFolder: true, icon: BsFolder }, // Teaching as a folder
  currentCourses: { id: 'currentCourses', name: 'current_courses.tex', path: '/teaching/current-courses', language: 'latex', icon: BsFileEarmark },
  pastCourses: { id: 'pastCourses', name: 'past_courses.tex', path: '/teaching/past-courses', language: 'latex', icon: BsFileEarmark },
  contact: { id: 'contact', name: 'Contact', isFolder: true, icon: BsFolder },
  contact_file: { id: 'contact_file', name: 'contact.yaml', path: '/contact', language: 'yaml', icon: BsEnvelope },
};

// Define a type for the keys of sectionMap
type SectionId = keyof typeof sectionMap;

const PrimarySideBar: React.FC = () => {
  const { addTab, activeTabId } = useTab();
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isTeachingOpen, setIsTeachingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleSectionClick = (sectionId: SectionId) => {
    const section = sectionMap[sectionId];
    if (!section.isFolder) { // Only add tab if it's not a folder
      addTab(section);
    }
  };

  const toggleFolder = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'home':
        setIsHomeOpen(prev => !prev);
        break;
      case 'about':
        setIsAboutOpen(prev => !prev);
        break;
      case 'blog':
        setIsBlogOpen(prev => !prev);
        break;
      case 'research':
        setIsResearchOpen(prev => !prev);
        break;
      case 'teaching':
        setIsTeachingOpen(prev => !prev);
        break;
      case 'contact':
        setIsContactOpen(prev => !prev);
        break;
      default:
        break;
    }
  };

  const SidebarItem = ({ sectionId, label, Icon, isFolder = false, isSubItem = false, isOpen }: { sectionId: SectionId, label: string, Icon: any, isFolder?: boolean, isSubItem?: boolean, isOpen?: boolean }) => {
    const isActive = activeTabId === sectionId;
    const itemClass = `sidebar-item ${isActive ? 'active' : ''} ${isSubItem ? 'sidebar-sub-item' : ''}`;

    if (isFolder) {
      return (
        <div className="sidebar-item-toggle" onClick={() => toggleFolder(sectionId)}>
          <div className="d-flex align-items-center">
            {isOpen ? <BsChevronDown className="sidebar-arrow" /> : <BsChevronRight className="sidebar-arrow" />}
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
        <SidebarItem sectionId="home" label="Home" Icon={sectionMap.home.icon} isFolder={true} isOpen={isHomeOpen} />
        {isHomeOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="home_file" label="home.py" Icon={sectionMap.home_file.icon} isSubItem={true} />
          </div>
        )}

        <SidebarItem sectionId="about" label="About" Icon={sectionMap.about.icon} isFolder={true} isOpen={isAboutOpen} />
        {isAboutOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="about_file" label="about.py" Icon={sectionMap.about_file.icon} isSubItem={true} />
          </div>
        )}

        <SidebarItem sectionId="blog" label="Blog" Icon={sectionMap.blog.icon} isFolder={true} isOpen={isBlogOpen} />
        {isBlogOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="blog_file" label="blog.qmd" Icon={sectionMap.blog_file.icon} isSubItem={true} />
          </div>
        )}
        
        <SidebarItem sectionId="research" label="Research" Icon={sectionMap.research.icon} isFolder={true} isOpen={isResearchOpen} />
        {isResearchOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="publications" label="Publications" Icon={sectionMap.publications.icon} isSubItem={true} />
            <SidebarItem sectionId="projects" label="Projects" Icon={sectionMap.projects.icon} isSubItem={true} />
          </div>
        )}

        <SidebarItem sectionId="teaching" label="Teaching" Icon={sectionMap.teaching.icon} isFolder={true} isOpen={isTeachingOpen} />
        {isTeachingOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="currentCourses" label="Current Courses" Icon={sectionMap.currentCourses.icon} isSubItem={true} />
            <SidebarItem sectionId="pastCourses" label="Past Courses" Icon={sectionMap.pastCourses.icon} isSubItem={true} />
          </div>
        )}

        <SidebarItem sectionId="contact" label="Contact" Icon={sectionMap.contact.icon} isFolder={true} isOpen={isContactOpen} />
        {isContactOpen && (
          <div className="sidebar-submenu">
            <SidebarItem sectionId="contact_file" label="contact.yaml" Icon={sectionMap.contact_file.icon} isSubItem={true} />
          </div>
        )}
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
