import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';


export const viewEmployees = async(request:JwtPayload, response:Response) => {
    try{

        const allEmployees = await Employee.find({})

        const employeesToReturn = allEmployees.map((employee)=>{
            return {
                employeeId: employee._id,
                employeeWorkId: employee.employeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                employeeIdNumber: employee.employeeId,
                department: employee.department,
                designation: employee.designation,
                contractType: employee.contractType,
                employeeType: employee.employeeType,
                email: employee.email,
                image: employee.image
            }
        })

        if(allEmployees.length < 1){
            return response.status(404).json({
                message:'No employees available',
                employeesToReturn
            })
        }
        return response.status(200).json({
            message: 'employees found',
            employeesToReturn
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}