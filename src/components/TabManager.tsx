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
  }, []);

  const removeTab = useCallback((tabId: string) => {
    if (tabId === 'home') {
      return; // Prevent closing the home tab
    }
    
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      setActiveTabId(prevActiveTabId => {
        if (prevActiveTabId === tabId) {
          const closedTabIndex = prevTabs.findIndex(tab => tab.id === tabId);
          if (closedTabIndex > 0) {
            return prevTabs[closedTabIndex - 1].id;
          } else if (newTabs.length > 0) {
            return newTabs[0].id;
          } else {
            return homeTab.id; // Fallback to home
          }
        }
        return prevActiveTabId;
      });

      return newTabs;
    });
  }, [homeTab]);

  const activateTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  // Effect to handle navigation when activeTabId changes
  useEffect(() => {
    const activeTab = openTabs.find(tab => tab.id === activeTabId);
    if (activeTab && location.pathname !== activeTab.path) {
      navigate(activeTab.path);
    }
  }, [activeTabId, openTabs, navigate, location.pathname]);

  // Effect to handle URL changes (e.g., browser back/forward, direct URL)
  useEffect(() => {
    const currentPath = location.pathname;
    const tabForCurrentPath = openTabs.find(tab => tab.path === currentPath);

    if (tabForCurrentPath && activeTabId !== tabForCurrentPath.id) {
      setActiveTabId(tabForCurrentPath.id);
    } else if (!tabForCurrentPath) {
      const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        addTab(matchingDefaultTab);
      } else {
        // If the URL does not correspond to a known tab, do nothing and let the user decide.
        // This avoids unexpected tab changes when closing tabs.
      }
    }
  }, [location.pathname]);

  return (
    <>
      {children(openTabs, activeTabId, addTab, removeTab, activateTab)}
    </>
  );
};

export default TabManager;