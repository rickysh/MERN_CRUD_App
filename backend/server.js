const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.kuewrfz.mongodb.net/full_stack_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define schema and model for MongoDB collection
const documentSchema = new mongoose.Schema({
    user: String,
    password: Number
});
const Document = mongoose.model('full_stack_col_1', documentSchema);

// Define route to fetch all documents
app.get('/api/documents', async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Define route to ADD a new document
app.post('/api/documents', async (req, res) => {
    try {
        const { user, password } = req.body;
        const newDocument = new Document({ user, password });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Define route to DELETE a new document
app.delete('/api/documents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Document.findByIdAndDelete(id);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Define route to UPDATE a document
app.put('/api/documents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user, password } = req.body;
        const updatedDocument = await Document.findByIdAndUpdate(id, { user, password }, { new: true });
        res.json(updatedDocument);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
