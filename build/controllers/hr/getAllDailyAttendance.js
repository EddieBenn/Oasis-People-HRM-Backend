"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewDailyAttendance = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const viewDailyAttendance = async (request, response) => {
    try {
        let today = new Date();
        const newToday = (0, helpersFunctions_1.setHours)(today);
        const attendance = await attendance_1.default.find({});
        const todaysAttendance = attendance.filter((attend) => {
            const checkInDate = new Date(attend.clockInTime);
            checkInDate.setHours(0, 0, 0, 0);
            return checkInDate.getTime() === newToday.getTime();
        });
        let employeesDailyAttendance = [];
        if (todaysAttendance.length < 1) {
            return response.status(404).json({
                message: 'No attendance available',
                employeesDailyAttendance
            });
        }
        employeesDailyAttendance = await Promise.all(todaysAttendance.map(async (attendance) => {
            const employee = await employeeModel_1.default.findOne({ _id: attendance.employeeId });
            return {
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
            };
        }));
        return response.status(200).json({
            message: 'Todays Attendance',
            employeesDailyAttendance
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewDailyAttendance = viewDailyAttendance;
