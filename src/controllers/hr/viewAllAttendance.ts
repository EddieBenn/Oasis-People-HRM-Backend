import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Attendance from '../../models/attendanceModel/attendance';
import Employee from '../../models/employeeModel/employeeModel';
import { formatDate, formatTimeFromISO } from '../../utilities/helpersFunctions';


export const allAttendanceHistories = async(request:JwtPayload, response:Response) => {
    try{
        const allAttendance = await Attendance.find({})

        if(allAttendance.length < 1){
            return response.status(404).json({
                message:'No attendance history found',
            })
        }

        allAttendance.sort((item1:any, item2:any)=> item2.date - item1.date)

        const attendanceHistory:any = await Promise.all(allAttendance.map(async (attendance)=>{
            const employee = await Employee.findOne({_id:attendance.employeeId})

            return {
                date: formatDate(attendance.date),
                attendanceId: attendance._id,
                attendanceStatus: attendance.clockInStatus,
                attendanceTime: formatTimeFromISO(attendance.clockInTime),
                employeeId: employee?._id,
                employeeFirstName: employee?.firstName,
                employeeLastName: employee?.lastName,
                employeeWorkId: employee?.employeeId,
                employeeDepartment: employee?.department,
                employeeDesignation: employee?.designation,
                employeeContractType: employee?.contractType,
                employeeWorkType: employee?.employeeType,
                checkOutTime: attendance.clockOutTime ? formatTimeFromISO(attendance.clockOutTime) : "-",
            }
        }))

        return response.status(200).json({
            message:'All time Attendance',
            attendanceHistory
        })
        

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}