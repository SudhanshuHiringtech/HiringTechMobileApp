import React, { createContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store the user object

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
