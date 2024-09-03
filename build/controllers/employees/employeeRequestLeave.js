"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRequestLeave = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const hrModel_1 = __importDefault(require("../../models/hrModel/hrModel"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const employeeRequestLeave = async (request, response) => {
    try {
        const { startDate, endDate, reason } = request.body;
        if (!startDate || !endDate || !reason) {
            return response.status(400).json({
                message: 'All details are required.'
            });
        }
        const validate = (0, helpersFunctions_1.leaveDateChecker)(startDate, endDate);
        if (validate === 'error 1') {
            return response.status(400).json({
                message: "Invalid date format.",
            });
        }
        if (validate === 'error 2') {
            return response.status(400).json({
                message: "Start date cannot be in the past.",
            });
        }
        if (validate === 'error 3') {
            return response.status(400).json({
                message: "End date cannot be in the past.",
            });
        }
        if (validate === 'error 4') {
            return response.status(400).json({
                message: "Start date cannot be after end date.",
            });
        }
        if (validate === 'error 5') {
            return response.status(400).json({
                message: "Start date and end date cannot be the same.",
            });
        }
        const employeeId = request.user._id;
        if (!employeeId) {
            return response.status(400).json({
                message: "Login again to request leave",
            });
        }
        const employee = await employeeModel_1.default.findOne({ _id: employeeId });
        if (employee.usedLeaveDays === employee.leaveDaysGiven ||
            employee.totalDaysLeft === 0) {
            return response.status(400).json({
                message: "You have used all your leave days for the year, please reach out to The HR if you need more days",
            });
        }
        // Check if the start date is at least 3 days from the current date
        const currentDate = new Date();
        const startLeaveDate = new Date(startDate);
        const endLeaveDate = new Date(endDate);
        const threeDaysNotice = new Date();
        threeDaysNotice.setDate(currentDate.getDate() + 3);
        if (startLeaveDate < threeDaysNotice) {
            return response.status(400).json({
                message: "You must give at least 3 days notice for leave requests",
            });
        }
        // Check if the end date is greater than the start date
        if (endLeaveDate <= startLeaveDate) {
            return response.status(400).json({
                message: "End date must be greater than the start date"
            });
        }
        // Check if the total leave duration exceeds 21 days
        const totalLeaveDays = (endLeaveDate.getTime() - startLeaveDate.getTime()) / (1000 * 3600 * 24) +
            1;
        if (totalLeaveDays > 21) {
            return response.status(400).json({
                message: "Leave request should not exceed 21 days",
            });
        }
        // Check if the requested leave days exceed the remaining leave days
        if (totalLeaveDays > employee.totalDaysLeft) {
            return response.status(400).json({
                message: `You only have ${employee.totalDaysLeft} leave days left`,
            });
        }
        const humanResources = await hrModel_1.default.findOne({});
        const HrId = humanResources._id;
        const newLeaveRequest = await leave_1.default.create({
            userId: employeeId,
            requestDate: new Date(),
            startDate: startLeaveDate,
            endDate: endLeaveDate,
            reason,
            status: "Pending",
            totalDays: totalLeaveDays,
            daysUsed: employee.usedLeaveDays + totalLeaveDays,
            daysLeft: employee.totalDaysLeft - totalLeaveDays,
            HrId,
        });
        const confirmLeaveRequest = await leave_1.default.findOne({ _id: newLeaveRequest._id });
        if (!confirmLeaveRequest) {
            return response.status(400).json({
                message: "Leave request not submitted, try again",
            });
        }
        return response.status(200).json({
            message: "Leave request submitted successfully",
            leaveRequest: newLeaveRequest,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.employeeRequestLeave = employeeRequestLeave;
