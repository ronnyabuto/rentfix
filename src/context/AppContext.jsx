/**
 * AppContext.jsx
 * 
 * This is the "Brain" of our application. 
 * It holds the Global State so we don't have to pass props down 10 levels.
 * 
 * What lives here:
 * 1. Current User (Tenant or Landlord)
 * 2. List of Issues (The Reports)
 * 3. List of Properties & Tenants (for the Landlord view)
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ISSUES } from '../data/mockIssues';
import { MOCK_USERS } from '../data/mockTenants';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // 1. STATE: Where we store our data
    // We update this to useLocalStorage so data persists on refresh!
    const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]); // Default to Landlord for demo
    const [issues, setIssues] = useLocalStorage('rentfix_issues', []);
    const [loading, setLoading] = useState(true);

    // 2. EFFECT: Simulate fetching data from an API
    useEffect(() => {
        // In a real app, this would be fetch('/api/issues')
        // We use setTimeout to simulate network delay (makes it feel real)
        const loadData = () => {
            setLoading(true);
            setTimeout(() => {
                // SEED DATA LOGIC:
                // If we have no issues (first run), seed with mock data.
                // If we have issues (from localStorage), keep them!
                setIssues((prev) => {
                    if (prev && prev.length > 0) return prev;
                    return MOCK_ISSUES;
                });
                setLoading(false);
            }, 500); // 0.5 second delay
        };

        loadData();
    }, []);

    // 3. ACTIONS: Functions to change state
    // (We will move complex logic to custom hooks later, but basic ones can stay here)

    const switchUser = (userId) => {
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user) setCurrentUser(user);
    };

    const addIssue = (newIssue) => {
        // Prepend the new issue to the list
        setIssues([newIssue, ...issues]);
    };

    const updateIssueStatus = (issueId, newStatus) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === issueId ? { ...issue, status: newStatus } : issue
            )
        );
    };

    // 4. EXPORT: What components can use
    const value = {
        currentUser,
        switchUser,
        issues,
        addIssue,
        updateIssueStatus,
        properties: MOCK_PROPERTIES, // Static for now
        users: MOCK_USERS,          // Static for now
        loading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook to use the context easily
// Usage: const { currentUser } = useAppContext();
export const useAppContext = () => {
    return useContext(AppContext);
};
