"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeClockIn = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const employeeClockIn = async (request, response) => {
    try {
        const employeeId = request.user._id;
        if (!employeeId) {
            return response.status(400).json({
                message: "Login again to clock in"
            });
        }
        const today = new Date();
        const getToday = (0, helpersFunctions_1.setHours)(today);
        const checkAttendance = await attendance_1.default.find({ employeeId });
        if (checkAttendance.length > 0) {
            const checkInsArr = checkAttendance.map((checkIn) => checkIn.date);
            const confirmEmployeeCheckIn = (0, helpersFunctions_1.confirmCheckIn)(checkInsArr, getToday);
            if (confirmEmployeeCheckIn) {
                return response.status(400).json({
                    message: "You have already clocked in today"
                });
            }
            const employeeAttendanceStatus = (0, helpersFunctions_1.checkClockInTime)(today);
            const newCheckIn = await attendance_1.default.create({
                date: new Date(),
                employeeId,
                clockInTime: new Date(),
                clockInStatus: employeeAttendanceStatus,
                clockOutTime: "",
                clockOutStatus: ""
            });
            const attestCheckIn = await attendance_1.default.findOne({ _id: newCheckIn._id });
            if (!attestCheckIn) {
                return response.status(400).json({
                    message: "Unable to clock in, try again"
                });
            }
            return response.status(200).json({
                message: "Clock-In Successful",
                checkIn: attestCheckIn
            });
        }
        const employeeFirstCheckIn = await attendance_1.default.create({
            date: new Date(),
            employeeId,
            clockInTime: new Date(),
            clockInStatus: "First Time Clock-In",
            clockOutTime: "",
            clockOutStatus: ""
        });
        const confirmFirstCheckIn = await attendance_1.default.findOne({ _id: employeeFirstCheckIn._id });
        if (!confirmFirstCheckIn) {
            return response.status(400).json({
                message: "Unable to clock in, try again"
            });
        }
        return response.status(200).json({
            message: "Clock-In Successful, Welcome to your first day at work",
            confirmFirstCheckIn
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.employeeClockIn = employeeClockIn;
