import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo / Title */}
                <h1 className="text-xl font-semibold text-gray-800">My Products</h1>

                {/* Navigation Links */}
                <nav className="flex gap-6 justify-between">
                    <Link
                        to="/list"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        List View
                    </Link>

                    <Link
                        to="/card"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Card View
                    </Link>
                </nav>
            </div>
        </header>
    );
}
