import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header id="header" className="sticky top-0 z-50 shadow-md opacity-90 w-full">
            <div className="w-full mx-auto px-6 py-3 flex justify-between items-center">

                {/* Logo / Title */}
                <h2 className="text-xl text-gray-800 m-0">MY PRODUCTS</h2>

                {/* Navigation Links */}
                <nav className="flex justify-between">
                    <ul>
                        <li>
                            <NavLink
                                to="/list"
                                className={({ isActive }) =>
                                    isActive ? "bg-blue-500 font-bold no-underline text-white px-4 py-2 rounded min-w-fit" : "text-gray-700 bg-blue-500 text-white px-4 py-2 rounded min-w-fit"
                                }
                            >
                                List View
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/card"
                                className={({ isActive }) =>
                                    isActive ? "font-bold no-underline bg-[#0860dd] text-white px-4 py-2 rounded min-w-fit" : "bg-[#0860dd] text-white px-4 py-2 rounded min-w-fit"
                                }
                            >
                                Card View
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
