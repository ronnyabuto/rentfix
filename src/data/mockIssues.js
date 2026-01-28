/**
 * Mock Issues Data
 * 
 * The core data for the application.
 * Note how we use the constants to avoid "magic strings".
 */

import { PRIORITY, STATUS, CATEGORY } from '../utils/constants';

export const MOCK_ISSUES = [
    {
        id: "r1",
        title: "Kitchen faucet leaking significantlly",
        description: "Water is pooling under the cabinet since yesterday evening. I've tried tightening it but it keeps dripping.",
        category: CATEGORY.PLUMBING,
        prioriy: PRIORITY.HIGH,
        status: STATUS.SCHEDULED,
        tenantId: "u1", // Tamara
        propertyId: "p1", // Skyline 402
        createdAt: "2023-09-20T10:30:00Z",
        photos: [
            "https://images.unsplash.com/photo-1585250003058-2e0fbf972740?q=80&w=300&auto=format&fit=crop",
        ],
        updates: [
            {
                id: "up1",
                status: STATUS.PENDING,
                message: "Report submitted by tenant",
                timestamp: "2023-09-20T10:30:00Z",
                actorId: "u1"
            },
            {
                id: "up2",
                status: STATUS.SCHEDULED,
                message: "Technician assigned for Sept 25th",
                timestamp: "2023-09-21T14:00:00Z",
                actorId: "admin1"
            }
        ]
    },
    {
        id: "r2",
        title: "AC thermostat unresponsive",
        description: "The display is showing an error code E-41 and won't turn on the cooling.",
        category: CATEGORY.HVAC,
        priority: PRIORITY.MEDIUM,
        status: STATUS.IN_PROGRESS,
        tenantId: "u2", // Nyabuto
        propertyId: "p2", // Garden Villas 12B
        createdAt: "2023-09-18T09:00:00Z",
        photos: [
            "https://images.unsplash.com/photo-1574359418378-bda50b2848c4?q=80&w=300&auto=format&fit=crop"
        ],
        updates: [
            {
                id: "up3",
                status: STATUS.PENDING,
                message: "Report submitted",
                timestamp: "2023-09-18T09:00:00Z",
                actorId: "u2"
            }
        ]
    },
    {
        id: "r3",
        title: "Loose hallway floorboard",
        description: "Near the bedroom entrance, it's a tripping hazard.",
        category: CATEGORY.STRUCTURAL,
        priority: PRIORITY.LOW,
        status: STATUS.PENDING,
        tenantId: "u3", // Mugambi
        propertyId: "p3", // Downtown Lofts 305
        createdAt: "2023-09-22T16:20:00Z",
        photos: [], // No photos
        updates: [
            {
                id: "up4",
                message: "Report submitted",
                timestamp: "2023-09-22T16:20:00Z",
                actorId: "u3"
            }
        ]
    },
    {
        id: "r4",
        title: "Smoke detector chirping",
        description: "Intermittent chirping likely due to low battery, but it's on a high ceiling.",
        category: CATEGORY.OTHER,
        priority: PRIORITY.HIGH,
        status: STATUS.IN_PROGRESS, // "Parts Ordered" in concept, mapped to In Progress
        tenantId: "u4", // David Kim
        propertyId: "p4", // Skyline 2C
        createdAt: "2023-09-22T08:15:00Z",
        photos: [],
        updates: [
            {
                id: "up5",
                status: STATUS.IN_PROGRESS,
                message: "New batteries ordered",
                timestamp: "2023-09-22T10:00:00Z",
                actorId: "admin1"
            }
        ]
    }
];
