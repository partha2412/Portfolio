const dotenv = require('dotenv');
dotenv.config(); // Must run BEFORE importing app so process.env is populated

const app = require('./app');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));