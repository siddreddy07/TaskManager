import mongoose from "mongoose";

const TaskScehma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String
    }
},{timestamps:true})

const Task = mongoose.model('Task', TaskScehma);

export default Task;