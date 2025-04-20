// Import required modules
const express = require("express"); // Web framework
const mongoose = require("mongoose"); // MongoDB ORM
const bcrypt = require("bcryptjs"); // Password hashing
const bodyParser = require("body-parser"); // Parse request bodies
const cors = require("cors"); // Enable Cross-Origin Resource Sharing

// Initialize Express app
const app = express();


// Middleware
app.use(cors()); // Allow requests from different origins (for frontend)
app.use(bodyParser.json()); // Parse JSON request bodies


// Connect to MongoDB (auth_demo is our database name)
mongoose.connect('mongodb://localhost:27017/ReFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Create User Schema (blueprint for user documents)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create User model from the schema
const User = mongoose.model('User', UserSchema);

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        // Get username and password from request body
        const { username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        // Hash the password (for security)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        // For now, just return success. In a real app, you'd return a token.
        res.json({ message: 'Login successful', user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});