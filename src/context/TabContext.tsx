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
        navigate(homeTab.path); // Navigate to home
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
          newActiveTab = homeTab; // Reference homeTab
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
      } else if (currentPath === homeTab.path && openTabs.length === 0) {
        // If current path is home and no tabs are open, add homeTab
        addTab(homeTab);
      } else if (currentPath !== homeTab.path) {
        // If it's not a known default tab and not the home page,
        // and if currently active tab is set but doesn't match current path, set activeTabId to null.
        const tabMatchingPath = openTabs.find(tab => tab.path === currentPath);
        if (tabMatchingPath) {
          setActiveTabId(tabMatchingPath.id);
        } else if (activeTabId !== null) {
          setActiveTabId(null);
        }
      }
    } else if (currentPath === homeTab.path && activeTabId !== homeTab.id) {
      // If we navigate back to home, and home isn't the active tab, activate it if open
      const homeIsOpen = openTabs.some(tab => tab.id === homeTab.id);
      if (homeIsOpen) {
        setActiveTabId(homeTab.id);
      } else if (openTabs.length === 0) {
        // If home is not open and no other tabs, add homeTab
        addTab(homeTab);
      }
    }
  }, [location.pathname, openTabs, activeTabId, navigate, addTab, defaultTabsList, homeTab]);

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
