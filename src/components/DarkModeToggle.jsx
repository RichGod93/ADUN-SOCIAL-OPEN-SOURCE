import React, { useState } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);

        // Toggle the 'dark-mode' class on the 'html' element
        document.documentElement.classList.toggle('dark-mode');
    };

    return (
        <button
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                } text-white font-bold py-2 px-4 rounded`}
            onClick={toggleDarkMode}
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
