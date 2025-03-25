import express from "express"
import { deleteTask, getAlltasks, getTaskByid, newTask, updateTask } from "../controllers/task.controller.js"
import { authRoute } from "../middlewares/auth.middleware.js"



const router = express.Router()

router.get('/tasks/:id',authRoute,getTaskByid)
router.get('/tasks',authRoute,getAlltasks)
router.put('/tasks/:id',authRoute,updateTask)
router.post('/tasks',authRoute,newTask)
router.delete('/tasks/:id',authRoute,deleteTask)

export default router
