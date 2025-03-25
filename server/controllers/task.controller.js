import Task from "../models/task.model.js";
import User from "../models/user.model.js";


export const newTask = async(req,res)=>{

    try {
        
    const {title,description} = req.body;

    const {userId} = req
    console.log(userId)

    if(!title || !description){
        return res.status(400).json({success:false,message:'All Fields are required'})
    }

    const newTask = new Task({
        title,
        description
    })
    await newTask.save()

    const user = await User.findByIdAndUpdate(userId,
        {$push:{tasks:newTask._id}},
        {new:true}
    )

    if(!user){
        return res.status(404).json({success:false,message:'User not found'})
    }

    return res.status(201).json({success:true,message:'Task Created Successfullt',newTask})
}

    catch (error) {
        console.log('Error :',error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }

}


export const updateTask = async(req,res)=>{

    try {

        const {userId} = req

        const {id} = req.params

        const {title,description} = req.body
        if(!title || !description){
            return res.status(400).json({success:false,message:'All Fields are required'})
        }

        const updatetask = await Task.findByIdAndUpdate(id,{title,description},{new:true})
        console.log(updatetask)
        if(!updatetask){
            return res.status(400).json({success:false,message:'No Task Found'})
        }

        return res.status(201).json({success:true,message:'Task Updated Successfully',updatetask})

    } catch (error) {
        console.log("Error : ",error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }

}


export const deleteTask = async(req,res)=>{
    try {

        const {id} = req.params

        const {userId} = req

        if(!id){
            return res.status(400).json({success:false,message:'Unable to delete task'})
        }

        const deletetask = await Task.findByIdAndDelete(id)
        if(!deletetask){
            return res.status(400).json({success:false,message:'No Task Found'})
        }

        const user = await User.findByIdAndUpdate(userId,{$pull:{tasks:id}},{new:true}).select('-password')

        if(!user){
            return res.status(400).json({success:false,message:'Not Authorized to delete task'})
        }

        return res.status(201).json({success:true,message:'Task Deleted Successfully'})


    } catch (error) {
        console.log("Error : ",error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
}


export const getAlltasks = async(req,res)=>{

    try {
        const {userId} = req

        const user = await User.findOne({_id:userId}).select('-password').populate('tasks')

        if(!user){
            return res.status(400).json({success:false,message:'No User Found'})
        }
        return res.status(201).json({success:true,message:'Tasks Retrieved Successfully',user:user})

    }
    catch(error){
        console.log("Error : ",error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }

}


export const getTaskByid = async(req,res)=>{

    try {
        const {id} = req.params

        const task = await Task.findById(id)
        if(!task){
            return res.status(400).json({success:false,message:'No Task Found'})
        }

        return res.status(200).json({success:true,task})
        
    } catch (error) {
        console.log("Error : ",error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
}