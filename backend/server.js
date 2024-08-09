const express = require("express");
const { errorHandler } = require('./middleware/errorMiddleware');
const taskRoutes=require('./routes/taskRoutes');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');  // Corrected line
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to handle requests to '/api/tasks'
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
