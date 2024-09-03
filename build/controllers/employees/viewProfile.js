"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewProfile = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const viewProfile = async (request, response) => {
    try {
        const userId = request.user._id;
        const user = await employeeModel_1.default.findOne({ _id: userId });
        if (!user) {
            return response.status(404).json({
                message: 'User not found',
            });
        }
        return response.status(200).json({
            message: 'User found',
            user
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewProfile = viewProfile;
