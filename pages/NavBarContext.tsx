import React, { createContext, useState } from 'react';

// Create the context
export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState('');

    return (
        <NavBarContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </NavBarContext.Provider>
    );
};