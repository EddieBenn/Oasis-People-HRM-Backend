import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Leave from "../../models/leaveModel/leave";
import Attendance from "../../models/attendanceModel/attendance";
import { formatDate, formatTimeFromISO } from "../../utilities/helpersFunctions";

export const singleEmployeeAttendanceHistory = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const employeeId = request.params.id;

    const employeeAttendance = await Attendance.find({ employeeId });

    let finalAttendance:any[] = []

    if (employeeAttendance.length < 1) {
      return response.status(404).json({
        message: "Employee has not clocked in ever",
        finalAttendance
      });
    }

    finalAttendance = await Promise.all(employeeAttendance.map(async (attend)=>{

      return {
        date: formatDate(attend.date),
        clockInTime: formatTimeFromISO(attend?.clockInTime),
        clockInStatus: attend?.clockInStatus,
        clockOutTime: formatTimeFromISO(attend?.clockOutTime),
        clockOutStatus: attend.clockOutStatus
      }
    }))
    return response.status(200).json({
      message: "Employee Attendance History fetched",
      finalAttendance
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
