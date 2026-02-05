import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { STATUS, PRIORITY } from '../utils/constants';

export const useMaintenanceReports = () => {
    const { issues, addIssue, updateIssueStatus, currentUser, loading } = useAppContext();

    const myIssues = useMemo(() => {
        if (!currentUser) return [];

        if (currentUser.role === 'landlord') {
            return issues; // Landlord sees everything
        } else {
            return issues.filter(issue => issue.tenantId === currentUser.id); // Tenant sees only their own
        }
    }, [issues, currentUser]);

    const stats = useMemo(() => {
        return {
            total: myIssues.length,
            pending: myIssues.filter(i => i.status === STATUS.PENDING).length,
            inProgress: myIssues.filter(i => i.status === STATUS.IN_PROGRESS).length,
            resolved: myIssues.filter(i => i.status === STATUS.COMPLETED).length,
        };
    }, [myIssues]);

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
        canEdit: currentUser?.role === 'landlord'
    };
};
