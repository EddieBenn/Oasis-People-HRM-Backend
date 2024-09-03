import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Leave from '../../models/leaveModel/leave';
import Employee from '../../models/employeeModel/employeeModel';
import { daysBetween, formatDate, formatTimeFromISO } from '../../utilities/helpersFunctions';


export const viewAllLeaveHistories = async(request:JwtPayload, response:Response) => {
    try{
        const leave = await Leave.find({})

        let finalLeaveDetails: any[] = []

        if(leave.length < 1){
            return response.status(404).json({
                message:'No leave requests found',
                finalLeaveDetails
            })
        }
        
        finalLeaveDetails = await Promise.all(leave.map(async (req)=>{
            const employee = await Employee.findOne({_id:req.userId})

            return {
                leaveId: req._id,
                reason: req.reason,
                employeeId: employee?._id,
                dateRequested: formatDate(req.requestDate),
                employeeFirstName: employee?.firstName,
                employeeLastName: employee?.lastName,
                employeeWorkId: employee?.employeeId,
                employeeDepartment: employee?.department,
                daysUsed: employee?.usedLeaveDays,
                daysLeft: employee?.totalDaysLeft,
                startDate: formatDate(req.startDate),
                endDate: formatDate(req.endDate),
                totalRequestedDays: daysBetween(req.startDate, req.endDate),
                status: req.status
            }
        }))

        return response.status(200).json({
            message: 'Leave Requests found',
            finalLeaveDetails
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}