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
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to add home tab on initial mount
  useEffect(() => {
    addTab(homeTab);
  }, []); // Empty dependency array means this runs once on mount

  const addTab = useCallback((tab: Tab) => {
    const tabExists = openTabs.some(t => t.id === tab.id);
    if (!tabExists) {
      setOpenTabs(prevTabs => [...prevTabs, tab]);
    }
    setActiveTabId(tab.id);
    navigate(tab.path);
  }, [openTabs, navigate]);

  const removeTab = useCallback((tabId: string) => {
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      if (newTabs.length === 0) {
        setActiveTabId(null);
        navigate('/'); // Navigate to home or a default empty state
        return [];
      }

      if (activeTabId === tabId) {
        const closedTabIndex = prevTabs.findIndex(tab => tab.id === tabId);
        let newActiveTab = null;

        if (closedTabIndex > 0) {
          newActiveTab = prevTabs[closedTabIndex - 1];
        } else if (newTabs[0]) {
          newActiveTab = newTabs[0];
        } else {
          // Fallback, though should be covered by newTabs.length === 0 check
          setActiveTabId(null);
          navigate('/');
          return [];
        }

        if (newActiveTab) {
          setActiveTabId(newActiveTab.id);
          navigate(newActiveTab.path);
        } else {
          // Fallback if newActiveTab is somehow null (should not happen now)
          setActiveTabId(null);
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
    } else if (!activeTab && currentPath !== '/') {
      const matchingDefaultTab = defaultTabsList.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        addTab(matchingDefaultTab);
      } else {
        // If current path is not an open tab, not '/', and not a matching default tab,
        // it means we're on a path that isn't intended to be a persistent tab (e.g., dynamic blog post)
        // or an invalid URL. In this case, we don't automatically open a tab for it.
        // The activeTabId should reflect if one of our open tabs is active.
        // if activeTabId is not null and the current path does not match any open tab, set activeTabId to null.
        const tabMatchingPath = openTabs.find(tab => tab.path === currentPath);
        if (tabMatchingPath) {
          setActiveTabId(tabMatchingPath.id);
        } else if (activeTabId !== null) { // If an active tab is set but doesn't match current path
          setActiveTabId(null);
        }
      }
    } else if (currentPath === '/' && activeTabId !== homeTab.id) {
      // If we navigate back to home, and home isn't the active tab, activate it
      const homeIsOpen = openTabs.some(tab => tab.id === homeTab.id);
      if (homeIsOpen) {
        setActiveTabId(homeTab.id);
      } else {
        // If home is not open, then ensure no tab is active
        setActiveTabId(null);
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
