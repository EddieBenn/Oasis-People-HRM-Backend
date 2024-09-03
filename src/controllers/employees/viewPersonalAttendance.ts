import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Attendance from '../../models/attendanceModel/attendance';


export const viewPersonalAttendanceRecord = async(request:JwtPayload, response:Response) => {
    try{

        const userId = request.user._id;

        const attendance = await Attendance.find({employeeId:userId})

        if(attendance.length < 1){
            return response.status(404).json({
                message:'No attendance record found',
                attendance
            })
        }
        let lateDays = 0;
        let onTimeDays = 0;

         attendance.forEach((record:any) => {
            if(record.clockInStatus === 'late'){
                lateDays += 1;
            }else if(record.clockInStatus === 'on-time'){
                onTimeDays += 1;
            }
        })
        return response.status(200).json({
            message: 'attendance records found',
            attendance,
            lateDays,
            onTimeDays
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}