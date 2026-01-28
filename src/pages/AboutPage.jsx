/**
 * AboutPage.jsx
 * 
 * Explanation of the project.
 */

const AboutPage = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">About RentFix</h1>
            <p className="text-gray-600 mb-6">
                RentFix is a solution designed to bridge the communication gap between tenants and landlords.
                Often, maintenance requests get lost in text messages or emails. RentFix provides a central
                dashboard to track every issue from "Reported" to "Resolved".
            </p>

            <h2 className="text-xl font-semibold mb-4">The Team (Moringa Project)</h2>
            <ul className="space-y-2">
                <li className="flex items-center"><span className="w-24 font-bold">Kimberly:</span> Layouts & Pages</li>
                <li className="flex items-center"><span className="w-24 font-bold">Tamara:</span> UI Components</li>
                <li className="flex items-center"><span className="w-24 font-bold">Nyabuto:</span> Data & Logic</li>
                <li className="flex items-center"><span className="w-24 font-bold">Mugambi:</span> Routing & Navigation</li>
            </ul>
        </div>
    );
};

export default AboutPage;
