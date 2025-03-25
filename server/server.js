import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbconnect } from "./utils/DbConnect.js"
import Userrouter from "./routes/user.routes.js"
import taskrouter from "./routes/task.routes.js"
dotenv.config()



const PORT = process.env.PORT || 5000
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true  
  }));


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/api/auth',Userrouter)
app.use('/api',taskrouter)

app.listen(PORT,()=>{
    dbconnect()
    console.log(`Server is running on port ${PORT}`)
})