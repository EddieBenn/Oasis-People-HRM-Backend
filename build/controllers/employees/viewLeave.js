"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSingleLeave = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const viewSingleLeave = async (request, response) => {
    try {
        const leaveId = request.params.id;
        if (!leaveId) {
            return response.status(400).json({
                message: 'Invalid request'
            });
        }
        const userId = request.user._id;
        const leave = await leave_1.default.findOne({ _id: leaveId, userId: userId });
        if (!leave) {
            return response.status(404).json({
                message: 'Leave not found'
            });
        }
        return response.status(200).json({
            message: 'Leave found',
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
exports.viewSingleLeave = viewSingleLeave;
