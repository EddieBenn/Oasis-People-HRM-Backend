"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEmployeeImage = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const changeEmployeeImage = async (request, response) => {
    try {
        const employeeId = request.params.id;
        const employee = await employeeModel_1.default.findOne({ _id: employeeId });
        if (!employee) {
            return response.status(404).json({
                message: 'employee not found',
            });
        }
        const image = request.file?.path;
        console.log(image);
        if (!image || image === '') {
            return response.status(400).json({
                message: 'Please upload an image'
            });
        }
        await employeeModel_1.default.updateOne({ _id: employeeId }, { image: image });
        const updatedEmployee = await employeeModel_1.default.findOne({ _id: employee });
        return response.status(200).json({
            message: 'employee image changed successfully',
            updatedEmployee
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.changeEmployeeImage = changeEmployeeImage;
