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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
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
  }, [navigate]); // Removed openTabs from dependency array as it's handled by setOpenTabs(prevTabs => ...)

  const removeTab = useCallback((tabId: string) => {
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      if (newTabs.length === 0) {
        setActiveTabId(null);
        navigate(homeTab.path); // Navigate to home or a default empty state
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
          // Fallback to home if no other tabs exist (should only happen if home is the only tab left)
          newActiveTab = homeTab;
        }

        if (newActiveTab) {
          setActiveTabId(newActiveTab.id);
          navigate(newActiveTab.path);
        } else {
          // Fallback if newActiveTab is somehow null
          setActiveTabId(null);
          navigate(homeTab.path);
        }
      }
      return newTabs;
    });
  }, [activeTabId, navigate, homeTab]);

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
    const activeTabByPath = openTabs.find(tab => tab.path === currentPath);

    if (isInitialLoad) {
      const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        addTab(matchingDefaultTab);
      } else {
        // If it's initial load and path is not a default tab, add home tab
        addTab(homeTab);
      }
      setIsInitialLoad(false);
    } else {
      // Logic for subsequent URL changes (e.g., browser back/forward, direct URL entry)
      if (activeTabByPath && activeTabId !== activeTabByPath.id) {
        setActiveTabId(activeTabByPath.id);
      } else if (!activeTabByPath) {
        const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);
        if (matchingDefaultTab) {
          addTab(matchingDefaultTab);
        } else if (openTabs.length > 0 && activeTabId !== null) {
          // If the current path doesn't match an open tab, and it's not a known default tab
          // then deactivate the current active tab.
          // This handles cases like dynamic blog post pages or invalid URLs
          // The main content area will either stay on the old route or display empty.
          // No navigation needed here, just update activeTabId.
          setActiveTabId(null);
        }
      }
    }
  }, [location.pathname, isInitialLoad, openTabs, activeTabId, addTab, defaultTabsList]);


  return (
    <>
      {children(openTabs, activeTabId, addTab, removeTab, activateTab, isInitialLoad)}
    </>
  );
};

export default TabManager;