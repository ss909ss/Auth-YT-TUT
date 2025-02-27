import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';

import { connectDB } from './db/connectDB.js';

import authRoutes from './routes/auth.route.js';

const app = express();

dotenv.config();

const PORT = 4344;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.get('/',(req,res) => {
    res.send("Hello World!");
});

app.use("/api/auth",authRoutes);

app.listen(PORT,() => {
    connectDB();
    console.log(`http://localhost:${PORT}`);
});