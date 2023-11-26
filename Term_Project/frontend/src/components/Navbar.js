import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Navigate to the login page or any other page you want after logout
        navigate('/');
    };

    return (
        <div className='flex-row bg-navbar items-center' style={{ height: '8vh' }}>
            <div className='pr-8 flex justify-end items-center h-full gap-20'>
                <button
                    onClick={handleLogout}
                    className="text-text rounded-lg text-lg font-bold hover:bg-customBackground transition duration-300 py-1 px-4"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
