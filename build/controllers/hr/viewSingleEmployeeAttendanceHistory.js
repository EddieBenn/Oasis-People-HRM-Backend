"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleEmployeeAttendanceHistory = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const singleEmployeeAttendanceHistory = async (request, response) => {
    try {
        const employeeId = request.params.id;
        const employeeAttendance = await attendance_1.default.find({ employeeId });
        let finalAttendance = [];
        if (employeeAttendance.length < 1) {
            return response.status(404).json({
                message: "Employee has not clocked in ever",
                finalAttendance
            });
        }
        finalAttendance = await Promise.all(employeeAttendance.map(async (attend) => {
            return {
                date: (0, helpersFunctions_1.formatDate)(attend.date),
                clockInTime: (0, helpersFunctions_1.formatTimeFromISO)(attend?.clockInTime),
                clockInStatus: attend?.clockInStatus,
                clockOutTime: (0, helpersFunctions_1.formatTimeFromISO)(attend?.clockOutTime),
                clockOutStatus: attend.clockOutStatus
            };
        }));
        return response.status(200).json({
            message: "Employee Attendance History fetched",
            finalAttendance
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.singleEmployeeAttendanceHistory = singleEmployeeAttendanceHistory;
