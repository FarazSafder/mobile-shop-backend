import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

app.use(express.json({ limit: "20kb" }))

app.use(express.urlencoded({ extended: true, limit: "20kb" }))

app.use(cookieParser())

app.use(express.static("public"))

//making base route
const API_PREFIX = process.env.API_PREFIX || "/api";
const API_VERSION = process.env.API_VERSION || "v1";
const BASE_API = `${API_PREFIX}/${API_VERSION}`;

// Routes

import companyRouter from './routes/company.routes.js'
import buyingRRouter from './routes/buyFrom.routes.js'


// Routes declaration
app.use(`${BASE_API}/company`, companyRouter)

app.use(`${BASE_API}/buying`, buyingRRouter)

export default app;