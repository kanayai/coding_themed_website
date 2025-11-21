import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Research from '../pages/Research';
import Teaching from '../pages/Teaching';
import Contact from '../pages/Contact';
import ResearchProjectsPage from '../pages/ResearchProjectsPage';
import PublicationsPage from '../pages/PublicationsPage';
import BlogPostPage from '../pages/BlogPostPage';
import CurrentCoursesPage from '../pages/CurrentCoursesPage';
import PastCoursesPage from '../pages/PastCoursesPage';

export interface Tab {
  id: string;
  name: string;
  path: string;
  language?: string;
}

interface TabManagerProps {
  children: (
    openTabs: Tab[],
    activeTabId: string | null,
    addTab: (tab: Tab) => void,
    removeTab: (tabId: string) => void,
    activateTab: (tabId: string) => void
  ) => ReactNode;
}

const TabManager: React.FC<TabManagerProps> = ({ children }) => {
  const homeTab: Tab = { id: 'home', name: 'home.py', path: '/', language: 'python' };
  const defaultTabsList: Tab[] = [
    homeTab,
    { id: 'about_file', name: 'about.py', path: '/about', language: 'python' },
    { id: 'blog_file', name: 'blog.qmd', path: '/blog', language: 'yaml' },
    { id: 'publications', name: 'publications.R', path: '/research/publications', language: 'r' },
    { id: 'projects', name: 'projects.R', path: '/research/projects', language: 'r' },
    { id: 'currentCourses', name: 'current_courses.tex', path: '/teaching/current-courses', language: 'latex' },
    { id: 'pastCourses', name: 'past_courses.tex', path: '/teaching/past-courses', language: 'latex' },
    { id: 'contact_file', name: 'contact.yaml', path: '/contact', language: 'yaml' },
  ];

  const [openTabs, setOpenTabs] = useState<Tab[]>([homeTab]);
  const [activeTabId, setActiveTabId] = useState<string | null>(homeTab.id);
  const navigate = useNavigate();
  const location = useLocation();

  const addTab = useCallback((tab: Tab) => {
    setOpenTabs(prevTabs => {
      const tabExists = prevTabs.some(t => t.id === tab.id);
      if (!tabExists) {
        return [...prevTabs, tab];
      }
      return prevTabs;
    });
    setActiveTabId(tab.id);
    navigate(tab.path); // Navigate immediately after adding/activating
  }, [navigate]);

  const activateTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    const tabToActivate = openTabs.find(tab => tab.id === tabId);
    if (tabToActivate && location.pathname !== tabToActivate.path) {
      navigate(tabToActivate.path); // Navigate only if path is different
    }
  }, [navigate, openTabs, location.pathname]);



  // Effect to handle URL changes (e.g., browser back/forward, direct URL)
  useEffect(() => {
    const currentPath = location.pathname;
    const tabForCurrentPath = openTabs.find(tab => tab.path === currentPath);

    if (tabForCurrentPath && activeTabId !== tabForCurrentPath.id) {
      setActiveTabId(tabForCurrentPath.id);
    } else if (!tabForCurrentPath) {
      const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        setOpenTabs(prevTabs => {
          const tabExists = prevTabs.some(t => t.id === matchingDefaultTab.id);
          return tabExists ? prevTabs : [...prevTabs, matchingDefaultTab];
        });
        setActiveTabId(matchingDefaultTab.id);
      } else if (currentPath.startsWith('/blog/')) {
        const postId = currentPath.split('/blog/')[1];
        if (postId) {
          const newTab: Tab = {
            id: `blog-${postId}`,
            name: `${postId}.qmd`,
            path: currentPath,
            language: 'qmd',
          };
          setOpenTabs(prevTabs => {
            const tabExists = prevTabs.some(t => t.id === newTab.id);
            return tabExists ? prevTabs : [...prevTabs, newTab];
          });
          setActiveTabId(newTab.id);
        }
      }
    }
  }, [location.pathname, activeTabId, defaultTabsList, openTabs]);

  return (
    <>
      {children(openTabs, activeTabId, addTab, removeTab, activateTab)}
    </>
  );
};

export default TabManager;