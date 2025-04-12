const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cancer_medicine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Medicine Schema
const medicineSchema = new mongoose.Schema({
  name: String,
  type: String,
  usage: String,
  image: String,
  fdaVerified: Boolean,
  price: String,
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// API endpoint to get medicines
app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to add a medicine (for testing purposes)
app.post('/api/medicines', async (req, res) => {
  const medicine = new Medicine(req.body);
  try {
    const savedMedicine = await medicine.save();
    res.status(201).json(savedMedicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});