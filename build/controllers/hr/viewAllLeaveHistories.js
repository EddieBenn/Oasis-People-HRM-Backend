"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllLeaveHistories = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const viewAllLeaveHistories = async (request, response) => {
    try {
        const leave = await leave_1.default.find({});
        let finalLeaveDetails = [];
        if (leave.length < 1) {
            return response.status(404).json({
                message: 'No leave requests found',
                finalLeaveDetails
            });
        }
        finalLeaveDetails = await Promise.all(leave.map(async (req) => {
            const employee = await employeeModel_1.default.findOne({ _id: req.userId });
            return {
                leaveId: req._id,
                reason: req.reason,
                employeeId: employee?._id,
                dateRequested: (0, helpersFunctions_1.formatDate)(req.requestDate),
                employeeFirstName: employee?.firstName,
                employeeLastName: employee?.lastName,
                employeeWorkId: employee?.employeeId,
                employeeDepartment: employee?.department,
                daysUsed: employee?.usedLeaveDays,
                daysLeft: employee?.totalDaysLeft,
                startDate: (0, helpersFunctions_1.formatDate)(req.startDate),
                endDate: (0, helpersFunctions_1.formatDate)(req.endDate),
                totalRequestedDays: (0, helpersFunctions_1.daysBetween)(req.startDate, req.endDate),
                status: req.status
            };
        }));
        return response.status(200).json({
            message: 'Leave Requests found',
            finalLeaveDetails
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewAllLeaveHistories = viewAllLeaveHistories;
