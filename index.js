const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const voiRoutes = require('./routes/VoiJeans_Routes');
const innoFashionRoutes = require('./routes/InnoFashions_Routes');
const { MasterInvoiceRoutes } = require('./routes/masterInvoice_Routes');
const { calculateDailyInterest } = require('./controllers/VoiJeans_controller');
const { TransactionRoutes } = require('./routes/Transaction_Routes');
const { notiRoute } = require('./routes/notification_Routes');
const { bankRoute } = require('./routes/AccountDetails_Routes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api', voiRoutes);
app.use('/api', innoFashionRoutes);
app.use('/api', MasterInvoiceRoutes);
app.use('/api', TransactionRoutes);
app.use('/api', notiRoute);
app.use('/api', bankRoute);


// Schedule the job to run every day at midnight
const scheduleDailyInterestCalculation = () => {
        calculateDailyInterest();
}

// Call this function to start the cron job
scheduleDailyInterestCalculation();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
