import React, { useState, useEffect } from 'react';
import DocumentForm from './components/DocumentForm'; 

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

  const handleUpdateDocument = async (id) => {
    try {
      const response = await fetch(`/api/documents/${selectedDocument._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedDocument)
      });
      if (response.ok) {
        // Update the documents list with the updated document
        setDocuments(documents.map(doc => doc._id === selectedDocument._id ? selectedDocument : doc));
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
    <div className="App">
      <h1>MongoDB collection Documents</h1>
      <DocumentForm onAddDocument={handleAddDocument} />
      <ul>
        {documents.map((document, index) => (
          <li key={document._id}>
            <p>
              <b>User: </b>{document.user}  <b>Password: </b>{document.password}
              <button style={{ marginLeft: '10px' }} onClick={() => handleDeleteDocument(document._id)}>Delete</button>
              <button style={{ marginLeft: '10px' }} onClick={() => handleSelectDocument(document)}>Update</button>
            </p>
            {selectedDocument && selectedDocument._id === document._id &&(
              <div>
                <h2>Update Document:</h2>
                <input
                  type="text"
                  value={selectedDocument.user}
                  onChange={(e) => setSelectedDocument({ ...selectedDocument, user: e.target.value })}
                />
                <input
                  type="number"
                  value={selectedDocument.password}
                  onChange={(e) => setSelectedDocument({ ...selectedDocument, password: e.target.value })}
                />
                <button onClick={handleUpdateDocument}>Save</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
