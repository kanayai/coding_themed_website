import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to set the active tab based on URL changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeTab = openTabs.find(tab => tab.path === currentPath);
    if (activeTab && activeTabId !== activeTab.id) {
      setActiveTabId(activeTab.id);
    } else if (!activeTab && openTabs.length > 0 && activeTabId !== null) {
      // If the current path doesn't match an open tab, but a tab is active,
      // it means the user navigated directly or refreshed.
      // We might want to add the current page as a tab if it's not already open.
      const defaultTabs: Tab[] = [
        { id: 'home', name: 'home.py', path: '/', language: 'python' },
        { id: 'about', name: 'about.py', path: '/about', language: 'python' },
        { id: 'blog', name: 'blog.qmd', path: '/blog', language: 'yaml' },
        { id: 'research', name: 'research.R', path: '/research', language: 'r' },
        { id: 'teaching', name: 'teaching.tex', path: '/teaching', language: 'latex' },
        { id: 'contact', name: 'contact.yaml', path: '/contact', language: 'yaml' },
      ];
      const matchingDefaultTab = defaultTabs.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        addTab(matchingDefaultTab);
      } else {
        // If no matching default tab, and somehow we're here, maybe just deactivate
        // this might happen for blog post pages, which are dynamic
        // For now, let's just make sure the activeTabId matches the URL if it's an open tab
        const tabMatchingPath = openTabs.find(tab => tab.path === currentPath);
        if (tabMatchingPath) {
          setActiveTabId(tabMatchingPath.id);
        }
      }
    } else if (openTabs.length === 0 && activeTabId === null) {
      // If no tabs are open, and we are on a known path, add it as the first tab
      const defaultTabs: Tab[] = [
        { id: 'home', name: 'home.py', path: '/', language: 'python' },
        { id: 'about', name: 'about.py', path: '/about', language: 'python' },
        { id: 'blog', name: 'blog.qmd', path: '/blog', language: 'yaml' },
        { id: 'research', name: 'research.R', path: '/research', language: 'r' },
        { id: 'teaching', name: 'teaching.tex', path: '/teaching', language: 'latex' },
        { id: 'contact', name: 'contact.yaml', path: '/contact', language: 'yaml' },
      ];
      const matchingDefaultTab = defaultTabs.find(tab => tab.path === currentPath);
      if (matchingDefaultTab) {
        addTab(matchingDefaultTab);
      }
    }
  }, [location.pathname, openTabs]); // activeTabId removed from deps to prevent infinite loop

  const addTab = (tab: Tab) => {
    const tabExists = openTabs.some(t => t.id === tab.id);
    if (!tabExists) {
      setOpenTabs(prevTabs => [...prevTabs, tab]);
    }
    setActiveTabId(tab.id);
    navigate(tab.path);
  };

  const removeTab = (tabId: string) => {
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      if (newTabs.length === 0) {
        setActiveTabId(null);
        navigate('/'); // Navigate to home if no tabs are left
      } else if (activeTabId === tabId) {
        // If the active tab is closed, activate the last tab in the new list
        const lastTab = newTabs[newTabs.length - 1];
        setActiveTabId(lastTab.id);
        navigate(lastTab.path);
      }
      return newTabs;
    });
  };

  const activateTab = (tabId: string) => {
    const tabToActivate = openTabs.find(tab => tab.id === tabId);
    if (tabToActivate) {
      setActiveTabId(tabId);
      navigate(tabToActivate.path);
    }
  };

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
