import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/list");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                    Thank you for choosing me for the assessment.
                    <br />
                    I truly appreciate the opportunity.
                </p>

                <div className="mt-6">
                    <button className="bg-[#0860dd] text-white px-3 py-2 min-w-fit rounded text-lg font-medium hover:bg-blue-700 transition" onClick={handleNavigate}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
