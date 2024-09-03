"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeClockout = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const employeeClockout = async (request, response) => {
    try {
        const thisDay = new Date();
        const getToday = (0, helpersFunctions_1.setHours)(thisDay);
        const employeeId = request.user._id;
        const checkAttendance = await attendance_1.default.find({ employeeId });
        if (checkAttendance.length > 0) {
            const checkInsArr = checkAttendance.map((checkIn) => checkIn.date);
            const confirmEmployeeCheckIn = (0, helpersFunctions_1.confirmCheckInCheckOut)(checkAttendance, getToday);
            if (confirmEmployeeCheckIn) {
                if (confirmEmployeeCheckIn.clockOutTime !== null) {
                    return response.status(400).json({
                        message: "You have already clocked out",
                    });
                }
                const employeeAttendanceStatus = (0, helpersFunctions_1.checkClockOutTime)(getToday);
                await attendance_1.default.updateOne({ _id: confirmEmployeeCheckIn._id }, {
                    $set: {
                        clockOutTime: thisDay,
                        clockOutStatus: employeeAttendanceStatus,
                    },
                });
                const attestCheckIn = await attendance_1.default.findOne({
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
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.employeeClockout = employeeClockout;
