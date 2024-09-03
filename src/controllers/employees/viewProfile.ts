import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';


export const viewProfile = async(request:JwtPayload, response:Response) => {
    try{

        const userId = request.user._id;

        const user = await Employee.findOne({_id:userId})

        if(!user){
            return response.status(404).json({
                message:'User not found',
            })
        }
        return response.status(200).json({
            message: 'User found',
            user
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}