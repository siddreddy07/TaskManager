import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import { dbconnect } from "./utils/DbConnect.js"
import Userrouter from "./routes/user.routes.js"
import taskrouter from "./routes/task.routes.js"
dotenv.config()



const PORT = process.env.PORT || 5000
const __dirname = path.resolve()
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true  
  }));


app.use('/api/auth',Userrouter)
app.use('/api',taskrouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../client/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    })

}

app.listen(PORT,()=>{
    dbconnect()
    console.log(`Server is running on port ${PORT}`)
})