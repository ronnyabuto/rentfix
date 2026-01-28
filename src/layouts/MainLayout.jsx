/**
 * MainLayout.jsx
 * 
 * The wrapper for our application pages.
 * Includes the Navigation Bar (top) and Footer (bottom).
 */

import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Outlet renders the child page (e.g. HomePage, AboutPage) */}
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Rentfix Property Management</p>
            </footer>
        </div>
    );
};

export default MainLayout;
