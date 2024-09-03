"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allEmployeeLeaveRequests = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const allEmployeeLeaveRequests = async (request, response) => {
    try {
        const employeeId = request.params.id;
        const employeeLeaveHistory = await leave_1.default.find({ userId: employeeId });
        if (employeeLeaveHistory.length < 1) {
            return response.status(404).json({
                message: "Employee has not requested for any leave yet",
            });
        }
        return response.status(200).json({
            message: "Employee Leave History Fetched",
            employeeLeaveHistory,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.allEmployeeLeaveRequests = allEmployeeLeaveRequests;
