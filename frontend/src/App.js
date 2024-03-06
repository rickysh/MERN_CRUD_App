import React, { useState, useEffect } from 'react';
import DocumentForm from './components/DocumentForm';
import { ChakraProvider, Heading, Button } from '@chakra-ui/react'

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    fetch('/api/documents')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  const handleAddDocument = async (newDocument) => {
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDocument)
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments([...documents, data]);
      } else {
        console.error('Failed to add document:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setDocuments(documents.filter(document => document._id !== id));
      } else {
        console.error('Failed to delete document:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleUpdateDocument = async (updatedDocument) => {
    try {
      const response = await fetch(`/api/documents/${selectedDocument._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDocument)
      });
      if (response.ok) {
        // Update the documents list with the updated document
        setDocuments(documents.map(doc => doc._id === selectedDocument._id ? updatedDocument : doc));
        setSelectedDocument(null);
      } else {
        console.error('Failed to update document:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleSelectDocument = (document) => {
    setSelectedDocument(document);
  };

  return (
    <ChakraProvider>
      <div className="App">
        <Heading size='2xl'>MongoDB collection Documents</Heading>
        <br></br>
        <Heading size='lg'>Add New Document:</Heading>
        <br></br>
        <DocumentForm
          mode="add"
          onSubmit={handleAddDocument}
        />
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Password</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={document._id}>
                <td>{document.user}</td>
                <td>{document.password}</td>
                <td>
                  <Button colorScheme='red' onClick={() => handleDeleteDocument(document._id)}>Delete</Button>
                  <Button colorScheme='green' onClick={() => handleSelectDocument(document)}>Update</Button>
                </td>
                <td>
                  {selectedDocument && selectedDocument._id === document._id && (
                  <DocumentForm
                    mode="update"
                    documentToUpdate={selectedDocument}
                    onSubmit={handleUpdateDocument}
                  />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChakraProvider>
  );
}

export default App;
