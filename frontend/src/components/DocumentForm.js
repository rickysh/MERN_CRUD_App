import React, { useState } from 'react';

function DocumentForm({ onAddDocument }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddDocument({ user, password });
        setUser('');
        setPassword('');
    };

    return (
        <div>
            <h2>Add New Document:</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="user">User: </label>
                    <input
                    type="text"
                    placeholder="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="passord">Password: </label>
                    <input
                    type="number"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default DocumentForm;
