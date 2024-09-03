"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewLeaveHistory = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const viewLeaveHistory = async (request, response) => {
    try {
        const userId = request.user._id;
        const leave = await leave_1.default.find({ userId: userId });
        if (leave.length < 1) {
            return response.status(404).json({
                message: 'No leave request',
                leave
            });
        }
        return response.status(200).json({
            message: 'Leave requests found',
            leave
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewLeaveHistory = viewLeaveHistory;
