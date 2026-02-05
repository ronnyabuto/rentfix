import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ISSUES } from '../data/mockIssues';
import { MOCK_USERS } from '../data/mockTenants';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [users, setUsers] = useLocalStorage('rentfix_users', MOCK_USERS);
    const [currentUser, setCurrentUser] = useLocalStorage('rentfix_current_user', null);
    const [issues, setIssues] = useLocalStorage('rentfix_issues', []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            setTimeout(() => {
                setIssues((prev) => {
                    if (prev && prev.length > 0) return prev;
                    return MOCK_ISSUES;
                });
                setLoading(false);
            }, 500);
        };

        loadData();
    }, []);

    const signup = (email, role, name) => {
        const existing = users.find(u => u.email === email);
        if (existing) throw new Error("Email already registered");

        const newUser = {
            id: `u_${Date.now()}`,
            name: name || email.split('@')[0],
            email,
            role,
            avatar: null
        };

        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        return newUser;
    };

    const login = (email) => {
        const user = users.find(u => u.email === email);
        if (!user) throw new Error("User not found. Please sign up.");

        setCurrentUser(user);
        return user;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const switchUser = (userId) => {
        const user = users.find(u => u.id === userId);
        if (user) setCurrentUser(user);
    };

    const addIssue = (newIssue) => {
        setIssues([newIssue, ...issues]);
    };

    const updateIssueStatus = (issueId, newStatus) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === issueId ? { ...issue, status: newStatus } : issue
            )
        );
    };

    const value = {
        currentUser,
        users,
        signup,
        login,
        logout,
        switchUser,
        issues,
        addIssue,
        updateIssueStatus,
        properties: MOCK_PROPERTIES,
        loading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
