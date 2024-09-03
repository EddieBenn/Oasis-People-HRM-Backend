import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Attendance from '../../models/attendanceModel/attendance';
import { formatTimeFromISO, setHours } from '../../utilities/helpersFunctions';
import Employee from '../../models/employeeModel/employeeModel';


export const viewDailyAttendance = async(request:JwtPayload, response:Response) => {
    try{

        let today = new Date()

        const newToday = setHours(today)


        const attendance = await Attendance.find({})

        const todaysAttendance = attendance.filter((attend)=>{
            const checkInDate = new Date(attend.clockInTime)
            checkInDate.setHours(0, 0, 0, 0)
            return checkInDate.getTime() === newToday.getTime()
        
        })

        let employeesDailyAttendance:any [] = [];

        if(todaysAttendance.length < 1){
            return response.status(404).json({
                message:'No attendance available',
                employeesDailyAttendance
            })
        }

         employeesDailyAttendance = await Promise.all(todaysAttendance.map(async (attendance)=>{
            const employee = await Employee.findOne({_id:attendance.employeeId})

            return {
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
            }
        }))

        return response.status(200).json({
            message:'Todays Attendance',
            employeesDailyAttendance
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}