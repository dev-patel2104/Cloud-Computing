import React from 'react';
import { NavLink } from 'react-router-dom';

function navbar() {
    return (
        <div className='flex-row bg-black items-center' style={{ height: '8vh' }}>
            <div className=' pl-16 flex justify-start items-center h-full gap-20'>
                <NavLink to="/" className="text-white rounded-lg text-lg font-bold hover:bg-highlight transition duration-300 py-1 px-4">
                    About
                </NavLink>
                <NavLink to="/education" className="text-white rounded-lg text-lg font-bold hover:bg-highlight transition duration-300 py-1 px-4">
                    Education and Certification
                </NavLink>
                <NavLink to="/work" className="text-white rounded-lg text-lg font-bold hover:bg-highlight transition duration-300 py-1 px-4">
                    Work
                </NavLink>
                <NavLink to="/projects" className="text-white rounded-lg text-lg font-bold hover:bg-highlight transition duration-300 py-1 px-4">
                    Projects
                </NavLink>
                <NavLink to="/contact" className="text-white rounded-lg text-lg font-bold hover:bg-highlight transition duration-300 py-1 px-4">
                    Get in touch
                </NavLink>
            </div>
        </div>
    );
}

export default navbar;