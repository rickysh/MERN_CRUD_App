import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Button, Input, Text } from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

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
        <ChakraProvider>
            <Box>
                {/* <h2>{mode === 'add' ? 'Add New Document:' : 'Update Document:'}</h2> */}
                <form onSubmit={handleSubmit}>
                    <Box style={{ display: 'inline-block', marginRight: '10px' }}>
                        <Text htmlFor="user">User: </Text>
                        <Input
                            placeholder='user'
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </Box>
                    <Box style={{ display: 'inline-block', marginRight: '10px' }}>
                        <Text htmlFor="password">Password: </Text>
                        <NumberInput>
                            <NumberInputField
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box style={{ display: 'inline-block' }}>
                        {/* <button type="submit">{mode === 'add' ? 'Add' : 'Update'}</button> */}
                        {/* <button type="submit">OK</button> */}
                        <Button type="submit" colorScheme='blue'>OK</Button>
                    </Box>
                </form>
            </Box>
        </ChakraProvider>
    );
}

export default DocumentForm;
