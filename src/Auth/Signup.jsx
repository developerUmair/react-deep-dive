import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value  // Corrected here
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);  // Corrected here
            alert('User created successfully');
        } catch (error) {
            alert(error.message);  // Use error.message for better readability
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
