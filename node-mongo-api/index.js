// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],
  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use(express.json());

const tagRoutes = require('./routes/tagsRoutes');
app.use('/tags', tagRoutes);

const issueRoutes = require('./routes/issueRoutes');
app.use('/issues', issueRoutes);

const clinicRoutes = require('./routes/clinicRoutes');
app.use('/locations', clinicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});