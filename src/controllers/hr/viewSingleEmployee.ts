import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';


export const viewSingleEmployee = async(request:JwtPayload, response:Response) => {
    try{

        const employeeId = request.params.id
        const employee = await Employee.findOne({_id:employeeId})

        if(!employee){
            return response.status(404).json({
                message:'employee not found',
            })
        }
        
        return response.status(200).json({
            message: 'employee found',
            employee
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}