import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../utils/firebase/firebase";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value  // Correctly update the value without using an array
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            // Handle successful login here (e.g., redirect to dashboard)
        } catch (error) {
            alert(error.message); // Show error message to the user
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
