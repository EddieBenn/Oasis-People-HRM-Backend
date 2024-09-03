"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewEmployees = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const viewEmployees = async (request, response) => {
    try {
        const allEmployees = await employeeModel_1.default.find({});
        const employeesToReturn = allEmployees.map((employee) => {
            return {
                employeeId: employee._id,
                employeeWorkId: employee.employeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                employeeIdNumber: employee.employeeId,
                department: employee.department,
                designation: employee.designation,
                contractType: employee.contractType,
                employeeType: employee.employeeType,
                email: employee.email,
                image: employee.image
            };
        });
        if (allEmployees.length < 1) {
            return response.status(404).json({
                message: 'No employees available',
                employeesToReturn
            });
        }
        return response.status(200).json({
            message: 'employees found',
            employeesToReturn
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewEmployees = viewEmployees;
