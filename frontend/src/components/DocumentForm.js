import React, { useState, useEffect } from 'react';

function DocumentForm({ mode, documentToUpdate, onSubmit }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    // If in update mode, populate the form fields with the values of the document to update
    useEffect(() => {
        if (mode === 'update' && documentToUpdate) {
            setUser(documentToUpdate.user);
            setPassword(documentToUpdate.password);
        }
    }, [mode, documentToUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDocument = { user, password };
        onSubmit(newDocument);
        setUser('');
        setPassword('');
    };

    return (
        <div>
            {/* <h2>{mode === 'add' ? 'Add New Document:' : 'Update Document:'}</h2> */}
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                    <label htmlFor="user">User: </label>
                    <input
                    type="text"
                    placeholder="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                    <label htmlFor="password">Password: </label>
                    <input
                    type="number"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ display: 'inline-block' }}>
                    {/* <button type="submit">{mode === 'add' ? 'Add' : 'Update'}</button> */}
                    <button type="submit">OK</button>
                </div>
            </form>
        </div>
    );
}

export default DocumentForm;
