"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSingleEmployee = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const viewSingleEmployee = async (request, response) => {
    try {
        const employeeId = request.params.id;
        const employee = await employeeModel_1.default.findOne({ _id: employeeId });
        if (!employee) {
            return response.status(404).json({
                message: 'employee not found',
            });
        }
        return response.status(200).json({
            message: 'employee found',
            employee
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewSingleEmployee = viewSingleEmployee;
