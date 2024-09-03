"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAttendanceHistories = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const allAttendanceHistories = async (request, response) => {
    try {
        const allAttendance = await attendance_1.default.find({});
        if (allAttendance.length < 1) {
            return response.status(404).json({
                message: 'No attendance history found',
            });
        }
        allAttendance.sort((item1, item2) => item2.date - item1.date);
        const attendanceHistory = await Promise.all(allAttendance.map(async (attendance) => {
            const employee = await employeeModel_1.default.findOne({ _id: attendance.employeeId });
            return {
                date: (0, helpersFunctions_1.formatDate)(attendance.date),
                attendanceId: attendance._id,
                attendanceStatus: attendance.clockInStatus,
                attendanceTime: (0, helpersFunctions_1.formatTimeFromISO)(attendance.clockInTime),
                employeeId: employee?._id,
                employeeFirstName: employee?.firstName,
                employeeLastName: employee?.lastName,
                employeeWorkId: employee?.employeeId,
                employeeDepartment: employee?.department,
                employeeDesignation: employee?.designation,
                employeeContractType: employee?.contractType,
                employeeWorkType: employee?.employeeType,
                checkOutTime: attendance.clockOutTime ? (0, helpersFunctions_1.formatTimeFromISO)(attendance.clockOutTime) : "-",
            };
        }));
        return response.status(200).json({
            message: 'All time Attendance',
            attendanceHistory
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.allAttendanceHistories = allAttendanceHistories;
