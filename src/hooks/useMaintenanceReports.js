/**
 * useMaintenanceReports.js
 * 
 * CUSTOM HOOK - ASSIGNMENT REQUIREMENT
 * 
 * Why this exists:
 * Components like "TenantDashboard" and "LandlordDashboard" need different views of the same data.
 * Instead of rewriting filter logic in every component, we abstract it here.
 * 
 * This follows the "Separation of Concerns" principle.
 * - Components: Handle UI (how it looks)
 * - Hooks: Handle Logic (how it works)
 */

import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { STATUS, PRIORITY } from '../utils/constants';

export const useMaintenanceReports = () => {
    const { issues, addIssue, updateIssueStatus, currentUser, loading } = useAppContext();

    // FILTER LOGIC
    // We use useMemo so we don't recalculate this on every single render unless dependencies change

    // 1. Get issues relevant to the current user
    const myIssues = useMemo(() => {
        if (!currentUser) return [];

        if (currentUser.role === 'landlord') {
            return issues; // Landlord sees everything
        } else {
            return issues.filter(issue => issue.tenantId === currentUser.id); // Tenant sees only their own
        }
    }, [issues, currentUser]);

    // 2. Stats Calculation (for the dashboard cards)
    const stats = useMemo(() => {
        return {
            total: myIssues.length,
            pending: myIssues.filter(i => i.status === STATUS.PENDING).length,
            inProgress: myIssues.filter(i => i.status === STATUS.IN_PROGRESS).length,
            resolved: myIssues.filter(i => i.status === STATUS.COMPLETED).length,
        };
    }, [myIssues]);

    // 3. Helper to create a new report
    const createReport = (courseData) => {
        // We can add validation logic here before sending to Context
        const newReport = {
            ...courseData,
            id: `new_${Date.now()}`,
            status: STATUS.PENDING,
            createdAt: new Date().toISOString(),
            tenantId: currentUser.id,
            updates: [{
                id: `up_${Date.now()}`,
                status: STATUS.PENDING,
                message: "Report submitted",
                timestamp: new Date().toISOString(),
                actorId: currentUser.id
            }]
        };
        addIssue(newReport);
        return newReport;
    };

    // 4. Helper to get issues by status (for tabs)
    const getIssuesByStatus = (statusStr) => {
        return myIssues.filter(i => i.status === statusStr);
    };

    return {
        reports: myIssues,
        stats,
        loading,
        createReport,
        updateStatus: updateIssueStatus,
        getIssuesByStatus,
        // We verify if the user is allowed to perform actions
        canEdit: currentUser?.role === 'landlord'
    };
};
