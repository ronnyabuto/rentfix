/**
 * HomePage.jsx
 * 
 * Public landing page.
 */

import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const HomePage = () => {
    const { currentUser } = useAppContext();
    const isLandlord = currentUser?.role === 'landlord';

    return (
        <div className="max-w-4xl mx-auto">
            <header className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">RentFix Property Management</h1>
                <p className="text-xl text-gray-600 mb-8">Transparent maintenance tracking for modern rentals.</p>

                <div className="flex justify-center gap-4">
                    {currentUser ? (
                        <Link to={isLandlord ? '/landlord' : '/tenant'} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login Now</button>
                    )}
                </div>
            </header>

            <section className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Snap & Report</h3>
                    <p className="text-gray-600">Take a photo of the issue and upload it instantly.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                    <p className="text-gray-600">Know exactly when your repair is scheduled.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Better Communication</h3>
                    <p className="text-gray-600">No more lost text messages or ignored calls.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
