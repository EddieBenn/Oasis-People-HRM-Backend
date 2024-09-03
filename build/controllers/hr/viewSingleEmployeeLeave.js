"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSingleEmployeeLeaves = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const viewSingleEmployeeLeaves = async (request, response) => {
    try {
        const employeeId = request.params.id;
        const leaves = await leave_1.default.find({ userId: employeeId });
        let finalLeaveRequests = [];
        if (leaves.length < 1) {
            return response.status(404).json({
                message: 'Leave Requests not found',
                finalLeaveRequests
            });
        }
        finalLeaveRequests = await Promise.all(leaves.map(async (leave) => {
            return {
                dateRequested: (0, helpersFunctions_1.formatDate)(leave.requestDate),
                startDate: (0, helpersFunctions_1.formatDate)(leave?.startDate),
                endDate: (0, helpersFunctions_1.formatDate)(leave?.endDate),
                totalRequestedDays: (0, helpersFunctions_1.daysBetween)(leave?.startDate, leave?.endDate),
                status: leave.status
            };
        }));
        return response.status(200).json({
            message: 'Leave Requests found',
            finalLeaveRequests
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewSingleEmployeeLeaves = viewSingleEmployeeLeaves;
