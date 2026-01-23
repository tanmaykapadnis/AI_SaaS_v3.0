import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { auth } from "./middleware/auth.js";

import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
// FIX: Changed path to './configs/cloudinary.js' to match file structure
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'


const app = express()

await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// dotenv.config()

app.get('/', (req, res)=>res.send('Server is Live!'))

app.use(requireAuth())
app.use(auth);

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running in port', PORT);
    
})