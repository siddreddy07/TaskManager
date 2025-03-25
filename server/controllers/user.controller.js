import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generatetoken } from "../utils/Token.js"
import Task from "../models/task.model.js"



export const register = async(req,res)=>{

    try {
        
        const {name,email,password} = req.body

        if(!name || !password || !email){
            return res.status(400).json({success:false,message:'All Fields are required'})
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);

        const exisitinguser = await User.findOne({email:email})

        if(exisitinguser) return res.status(400).json({success:false,message:'User Exisits Try Login instead'})

        const newUser = new User({
            name,
            email,
            password:hashpassword
        })

        await newUser.save()

        const registeredUser = newUser.toObject()
        delete registeredUser.password
        delete registeredUser.email

        generatetoken(newUser.email,res)

        return res.status(200).json({success:true,message:'User Registered Successfully',registeredUser})

    } catch (error) {
        console.log('Error in Registration :',error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }

}

export const login = async(req,res)=>{

    try {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({success:false,message:'All Fields are required'})
    }

    const user = await User.findOne({email})

    if(!user) return res.status(400).json({success:false,message:'No User Found'})
        
    const isPassword = bcrypt.compareSync(password,user.password)

    if(isPassword){
        generatetoken(user.email,res)
        const loggedinuser = user.toObject()
        delete loggedinuser.password
        delete loggedinuser.email
        return res.status(200).json({success:true,message:'User Login Successfully',loggedinuser})
    }

    return res.status(401).json({success:false,message:'Invalid Email/Password'})
        
    } catch (error) {
        console.log('Error in Login',error)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }

}


export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const deleteAccount = async (req, res) => {
    try {
      const { userId } = req;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      if(user.tasks){
          for (const taskId of user.tasks) {
            await Task.findByIdAndDelete(taskId);
          }
      }
      await User.findByIdAndDelete(userId);
  
      res.clearCookie('token');
  
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.log('Error:', error.message);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

export const checkAuth = async(req,res)=>{

    try {
        const {userId} = req

        const user = await User.findById(userId).select('-password').populate('tasks')

        if(!user){
            return res.status(400).json({success:false,message:'Unauthorized'})
        }

        return res.status(200).json({success:true,message:'Authorized',user})
        
    } catch (error) {
        console.log('Error : ',error.message)
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }

}  
  