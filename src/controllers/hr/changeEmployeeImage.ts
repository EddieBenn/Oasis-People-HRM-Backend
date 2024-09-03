import {Request} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';


export const changeEmployeeImage = async(request:JwtPayload, response:any) => {
    try{
        const employeeId = request.params.id;
        const employee = await Employee.findOne({_id:employeeId});

        if(!employee){
            return response.status(404).json({
                message:'employee not found',
            })
        }

        const image = request.file?.path;

        console.log(image)

        if(!image || image === ''){
            return response.status(400).json({
                message:'Please upload an image'
            })
        }

        await Employee.updateOne({_id:employeeId},{image:image});

          const updatedEmployee = await Employee.findOne({_id:employee});

        return response.status(200).json({
            message: 'employee image changed successfully',
            updatedEmployee
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}