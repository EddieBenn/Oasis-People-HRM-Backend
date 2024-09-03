import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Attendance from "../../models/attendanceModel/attendance";
import {
  checkClockOutTime,
  confirmCheckInCheckOut,
  setHours,
} from "../../utilities/helpersFunctions";

export const employeeClockout = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const thisDay = new Date();

    const getToday = setHours(thisDay);

    const employeeId = request.user._id;

    const checkAttendance = await Attendance.find({ employeeId });

    if (checkAttendance.length > 0) {
      const checkInsArr: any = checkAttendance.map(
        (checkIn: any) => checkIn.date
      );
      const confirmEmployeeCheckIn = confirmCheckInCheckOut(
        checkAttendance,
        getToday
      );

      if (confirmEmployeeCheckIn) {
        if (confirmEmployeeCheckIn.clockOutTime !== null) {
          return response.status(400).json({
            message: "You have already clocked out",
          });
        }

        const employeeAttendanceStatus = checkClockOutTime(getToday);

        await Attendance.updateOne(
          { _id: confirmEmployeeCheckIn._id },
          {
            $set: {
              clockOutTime: thisDay,
              clockOutStatus: employeeAttendanceStatus,
            },
          }
        );

        const attestCheckIn = await Attendance.findOne({
          _id: confirmEmployeeCheckIn._id,
        });

        if (!attestCheckIn?.clockOutTime) {
          return response.status(400).json({
            message: "Unable to clock out, try again",
          });
        }

        return response.status(200).json({
          message: "Clock-Out Successful",
          attestCheckIn,
        });
      }
    }
    return response.status(400).json({
      message: "You have not clockedIn today",
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
