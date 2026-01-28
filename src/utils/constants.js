/**
 * Constants for Rentfix Application
 * 
 * We use these constants to avoid typos. Instead of typing "In Progress" everywhere
 * (Running the risk of typing "in progress" or "Inprogress"), we import STATUS.
 * 
 * Example usage: 
 * import { STATUS } from '../utils/constants';
 * if (issue.status === STATUS.PENDING) { ... }
 */

export const PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  EMERGENCY: 'Emergency',
};

export const STATUS = {
  PENDING: 'Pending',         // Newly filed, landlord hasn't seen it
  IN_PROGRESS: 'In Progress', // Landlord acknowledged, working on it
  SCHEDULED: 'Scheduled',     // Technician coming
  COMPLETED: 'Completed',     // Fixed
  CANCELLED: 'Cancelled',     // Invalid report
};

export const CATEGORY = {
  PLUMBING: 'Plumbing',
  ELECTRICAL: 'Electrical',
  HVAC: 'HVAC',           // Heating, Ventilation, Air Conditioning
  APPLIANCE: 'Appliance',
  STRUCTURAL: 'Structural', // Walls, floors, windows
  OTHER: 'Other',
};
