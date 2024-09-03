"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEmployeeLeave = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const processEmployeeLeave = async (request, response) => {
    try {
        const { approvalStatus } = request.body;
        if (!approvalStatus || approvalStatus === "") {
            return response.status(400).json({
                message: "A Response is required",
            });
        }
        const leaveId = request.params.id;
        const leave = await leave_1.default.findOne({ _id: leaveId });
        if (!leave) {
            return response.status(404).json({
                message: "Leave not found",
            });
        }
        if (leave.status === "Approved" || leave.status === "Rejected") {
            return response.status(400).json({
                message: "Leave has already been processed",
            });
        }
        if (approvalStatus === "Approved") {
            await employeeModel_1.default.findOneAndUpdate({ _id: leave.userId }, { usedLeaveDays: leave.daysUsed, totalDaysLeft: leave.daysLeft });
        }
        const test = await employeeModel_1.default.findOne({ _id: leave.userId });
        await leave_1.default.findOneAndUpdate({ _id: leaveId }, { status: approvalStatus });
        const newLeave = (await leave_1.default.findOne({
            _id: leaveId,
        }));
        if (newLeave.status !== approvalStatus) {
            return response.status(400).json({
                message: "Leave not processed",
            });
        }
        return response.status(200).json({
            message: "Leave Processed",
            newLeave,
            test
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.processEmployeeLeave = processEmployeeLeave;
