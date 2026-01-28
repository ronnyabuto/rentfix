/**
 * Mock Users Data
 * 
 * Includes both Tenants and Landlords.
 * In a real app, this would come from an Auth Provider (like Firebase or Auth0).
 */

export const MOCK_USERS = [
    // THE LANDLORD
    {
        id: "admin1",
        fullName: "Robert Chen",
        email: "robert@rentix.com",
        role: "landlord",
        avatar: "https://i.pravatar.cc/150?u=admin1",
    },

    // THE TENANTS
    {
        id: "u1",
        fullName: "Sarah Jenkins",
        email: "sarah@example.com",
        role: "tenant",
        avatar: "https://i.pravatar.cc/150?u=u1",
        propertyId: "p1", // Lives in Skyline 402
    },
    {
        id: "u2",
        fullName: "Marcus Thorne",
        email: "marcus@example.com",
        role: "tenant",
        avatar: "https://i.pravatar.cc/150?u=u2",
        propertyId: "p2", // Lives in Garden Villas 12B
    },
    {
        id: "u3",
        fullName: "Elena Rodriguez",
        email: "elena@example.com",
        role: "tenant",
        avatar: "https://i.pravatar.cc/150?u=u3",
        propertyId: "p3", // Lives in Downtown Lofts 305
    },
    {
        id: "u4",
        fullName: "David Kim",
        email: "david@example.com",
        role: "tenant",
        avatar: "https://i.pravatar.cc/150?u=u4",
        propertyId: "p4", // Lives in Skyline 2C
    }
];
