import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';
import Leave from '../../models/leaveModel/leave';
import { daysBetween, formatDate } from '../../utilities/helpersFunctions';


export const viewSingleEmployeeLeaves = async(request:JwtPayload, response:Response) => {
    try{

        const employeeId = request.params.id

        const leaves = await Leave.find({userId:employeeId})

        let finalLeaveRequests:any[] = [];

        if(leaves.length < 1){
            return response.status(404).json({
                message:'Leave Requests not found',
                finalLeaveRequests
            })
        }


        finalLeaveRequests = await Promise.all(leaves.map(async (leave)=>{

            return {
                dateRequested: formatDate(leave.requestDate),
                startDate: formatDate(leave?.startDate),
                endDate: formatDate(leave?.endDate),
                totalRequestedDays: daysBetween(leave?.startDate, leave?.endDate),
                status: leave.status
            }
          }))

        return response.status(200).json({
            message: 'Leave Requests found',
            finalLeaveRequests
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}