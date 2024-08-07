import React, { useEffect, useState } from 'react'
import { auth } from '../../utils/firebase/firebase';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;