
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
    });
    const [users, setUsers] = useState([]); // State to hold fetched user data
    const [error, setError] = useState('');

    // Fetch users when the component is mounted
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data); // Set users from backend response
            } catch (error) {
                setError('Failed to fetch users');
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once after the first render

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            alert(response.data.message);
            // After successful registration, fetch updated list of users
            const usersResponse = await axios.get('http://localhost:5000/users');
            setUsers(usersResponse.data);
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>

            <h2>Registered Users</h2>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.date_of_birth}</td>
                                <td>{user.gender}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RegistrationForm;