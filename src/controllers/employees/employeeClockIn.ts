import {Response} from "express";
import { JwtPayload } from "jsonwebtoken";
import Attendance from "../../models/attendanceModel/attendance";
import { checkClockInTime, confirmCheckIn, setHours } from "../../utilities/helpersFunctions";

export const employeeClockIn = async(request:JwtPayload, response:Response) => {
    try {

        const employeeId = request.user._id;
        
        if(!employeeId){
            return response.status(400).json({
                message: "Login again to clock in"
            });
        }

        const today = new Date();

        const getToday = setHours(today)

        const checkAttendance = await Attendance.find({employeeId});

        if(checkAttendance.length > 0){
           const checkInsArr:any = checkAttendance.map((checkIn:any) => checkIn.date)
           const confirmEmployeeCheckIn = confirmCheckIn(checkInsArr, getToday)
           if(confirmEmployeeCheckIn){
               return response.status(400).json({
                   message: "You have already clocked in today"
               })
           }
              const employeeAttendanceStatus = checkClockInTime(today);
         const newCheckIn =  await Attendance.create({
            date: new Date(),
            employeeId,
            clockInTime: new Date(),
            clockInStatus: employeeAttendanceStatus,
            clockOutTime: "",
            clockOutStatus: ""
        })
        const attestCheckIn = await Attendance.findOne({_id:newCheckIn._id});

        if(!attestCheckIn){
            return response.status(400).json({
                message: "Unable to clock in, try again"
            });
        }
        return response.status(200).json({
            message: "Clock-In Successful",
            checkIn: attestCheckIn
        });
        }

       const employeeFirstCheckIn = await Attendance.create({
            date: new Date(),
            employeeId,
            clockInTime: new Date(),
            clockInStatus: "First Time Clock-In",
            clockOutTime: "",
            clockOutStatus: ""
        })

        const confirmFirstCheckIn = await Attendance.findOne({_id:employeeFirstCheckIn._id});

        if(!confirmFirstCheckIn){
            return response.status(400).json({
                message: "Unable to clock in, try again"
            });
        }
        return response.status(200).json({
            message: "Clock-In Successful, Welcome to your first day at work",
            confirmFirstCheckIn
        });
    } catch (error:any) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
}
