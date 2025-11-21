import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Tab {
  id: string;
  name: string; // e.g., 'home.py', 'about.py'
  path: string;
  language?: string; // e.g., 'python', 'r', 'latex', 'yaml'
}

interface TabContextType {
  openTabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  activateTab: (tabId: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
  const [activeTabId, setActiveTabId] = useState<string | null>('home');
  const navigate = useNavigate();
  const location = useLocation();

  const addTab = useCallback((tab: Tab) => {
    const tabExists = openTabs.some(t => t.id === tab.id);
    if (!tabExists) {
      setOpenTabs(prevTabs => [...prevTabs, tab]);
    }
    setActiveTabId(tab.id);
    navigate(tab.path);
  }, [openTabs, navigate]);

  const removeTab = useCallback((tabId: string) => {
    if (tabId === 'home') {
      return; // Prevent closing the home tab
    }
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      if (activeTabId === tabId) {
        // If the active tab is closed, determine which tab to activate next
        const closedTabIndex = prevTabs.findIndex(tab => tab.id === tabId);
        const newActiveTab = newTabs[closedTabIndex - 1] || newTabs[closedTabIndex];
        if (newActiveTab) {
          setActiveTabId(newActiveTab.id);
          navigate(newActiveTab.path);
        } else {
          // This case should ideally not be hit since 'home' is always present
          setActiveTabId('home');
          navigate('/');
        }
      }
      return newTabs;
    });
  }, [activeTabId, navigate]);

  const activateTab = useCallback((tabId: string) => {
    const tabToActivate = openTabs.find(tab => tab.id === tabId);
    if (tabToActivate) {
      setActiveTabId(tabId);
      navigate(tabToActivate.path);
    }
  }, [openTabs, navigate]);

  // Effect to set the active tab based on URL changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeTab = openTabs.find(tab => tab.path === currentPath);
    if (activeTab && activeTabId !== activeTab.id) {
      setActiveTabId(activeTab.id);
    } else if (!activeTab) {
      // If the current path doesn't match an open tab, check if it's a known default tab
      const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        addTab(matchingDefaultTab);
      } else if (currentPath !== '/') {
        // If it's not a known default tab and not the home page,
        // and if currently active tab is not home, navigate to home.
        // This handles cases like dynamic blog post pages or unknown URLs.
        if (activeTabId !== 'home') {
          setActiveTabId('home');
          navigate('/');
        }
      }
    }
  }, [location.pathname, openTabs, activeTabId, navigate, addTab, defaultTabsList]);

  return (
    <TabContext.Provider value={{ openTabs, activeTabId, addTab, removeTab, activateTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
