import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import apiClient, { authApiClient } from '../../main/services/client';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profile from API
    const fetchUserProfile = useCallback(async () => {
        // Disabled for now as endpoint /api/auth/me is not confirmed
        setLoading(false);
        return;
    }, []);

    // Initialize auth on mount
    useEffect(() => {
        // Try to restore from sessionStorage first
        const storedUser = sessionStorage.getItem('user');

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setLoading(false);
            } catch (e) {
                console.error('[AuthContext] Failed to parse stored user:', e);
                fetchUserProfile();
            }
        } else {
            fetchUserProfile();
        }
    }, [fetchUserProfile]);

    // Login function
    const login = useCallback(async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            // Real API call using authApiClient
            console.log('[AuthContext] Real login attempt for:', credentials.userId);
            const response = await authApiClient.post('/api/auth/login', credentials);

            if (response.data.success) {
                const { token, user: userData } = response.data.data;

                // Standardize user object
                // Pattern for codes: XX000000 for Regions, XXYY0000 for ST
                const mappedUser = {
                    ...userData,
                    userId: userData.userId,
                    name: userData.userName,
                    role: userData.userGroup === 'region' ? 'Region' : (userData.userGroup === 'st' ? 'ST' : 'SS'),
                    offices: {
                        // If region user, stOfficeCode is the region code (e.g. 12000000)
                        // If ST/SS user, first 2 digits + 000000 is the region code
                        regionCode: userData.stOfficeCode ? (userData.stOfficeCode.substring(0, 2) + '000000') : '',
                        stCode: userData.stOfficeCode,
                        ssCode: userData.ssOfficeCode
                    }
                };

                setUser(mappedUser);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(mappedUser));
                console.log('[AuthContext] Login success!');
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('[AuthContext] Login failed:', err);
            const errMsg = err.response?.data?.message || err.message;
            setError(errMsg);
            throw new Error(errMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout function
    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        console.log('[AuthContext] User logged out');
    }, []);

    // Helper functions
    const hasRole = useCallback((role) => {
        return user?.role === role;
    }, [user]);

    const getOfficeCode = useCallback((type) => {
        if (!user?.offices) return null;

        switch (type.toLowerCase()) {
            case 'region':
                return user.offices.regionCode;
            case 'st':
                return user.offices.stCode;
            case 'ss':
                return user.offices.ssCode;
            default:
                return null;
        }
    }, [user]);

    const isAuthenticated = !!user;

    const value = {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        hasRole,
        getOfficeCode,
        refetchUser: fetchUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
