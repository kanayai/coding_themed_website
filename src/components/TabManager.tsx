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
    activateTab: (tabId: string) => void,
    isInitialLoad: boolean
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

  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
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
    navigate(tab.path);
  }, [openTabs, navigate]);

  const removeTab = useCallback((tabId: string) => {
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      if (newTabs.length === 0) {
        setActiveTabId(null);
        // Do not navigate, App.tsx will display the black background
        return [];
      }

      if (activeTabId === tabId) {
        const closedTabIndex = prevTabs.findIndex(tab => tab.id === tabId);
        let newActiveTab = null;

        // Prioritize the tab to the left of the closed tab
        if (closedTabIndex > 0) {
          newActiveTab = prevTabs[closedTabIndex - 1];
        } else if (newTabs[0]) {
          // If no tab to the left, activate the one that shifted into its place (the new first tab)
          newActiveTab = newTabs[0];
        } else {
          // Fallback to home if no other tabs exist, but this should be handled by newTabs.length === 0
          // If home is the only tab left (and it's now closed), then newTabs.length would be 0
          // This else block is mostly a safeguard.
          setActiveTabId(null);
          // Do not navigate, App.tsx will display the black background
          return [];
        }

        if (newActiveTab) {
          setActiveTabId(newActiveTab.id);
          navigate(newActiveTab.path);
        } else {
          // Fallback if newActiveTab is somehow null (should not happen now with newTabs.length === 0 check)
          setActiveTabId(null);
          // Do not navigate
        }
      }
      return newTabs;
    });
  }, [activeTabId, navigate]);

  const activateTab = useCallback((tabId: string) => {
    const tabToActivate = openTabs.find(tab => tab.id === tabId);
    if (tabToActivate) {
      setActiveTabId(tabToActivate.id);
      navigate(tabToActivate.path);
    }
  }, [openTabs, navigate]);

  // Effect to handle initial load and URL changes
  useEffect(() => {
    const currentPath = location.pathname;
    const tabAlreadyOpen = openTabs.find(tab => tab.path === currentPath);

    if (tabAlreadyOpen) {
      // If current path matches an open tab, just activate it if not already active
      if (activeTabId !== tabAlreadyOpen.id) {
        setActiveTabId(tabAlreadyOpen.id);
      }
    } else {
      // Current path does NOT match an open tab
      const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);

      if (matchingDefaultTab) {
        // If it's a known default tab but not open, add it and activate
        addTab(matchingDefaultTab);
      } else {
        // If it's not an open tab AND not a default tab (e.g., dynamic page, unknown URL)
        // Set activeTabId to null to show the empty state.
        if (activeTabId !== null) {
          setActiveTabId(null);
        }
      }
    }

    // Handle initial load specifically: if no tabs are open and we're on '/', add home.
    // This runs only if openTabs is empty after the above logic, meaning nothing was auto-opened.
    if (openTabs.length === 0 && currentPath === homeTab.path) {
      addTab(homeTab);
    }

  }, [location.pathname, openTabs, activeTabId, addTab, defaultTabsList, homeTab]);


  return (
    <>
      {children(openTabs, activeTabId, addTab, removeTab, activateTab, isInitialLoad)}
    </>
  );
};

export default TabManager;