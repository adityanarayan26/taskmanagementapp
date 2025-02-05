import express from 'express';
const app = express();
import cors from 'cors';
import { config } from 'dotenv';
import { Connectdb } from './utils/db.js';
import todoRoute from './routes/userRoute.js';
config()

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true
}));
// Routes
app.use('/api', todoRoute);

app.listen(3000, () => {
  console.log(`'Server is running on ${process.env.FRONTEND_URI}`);
  Connectdb();
});
