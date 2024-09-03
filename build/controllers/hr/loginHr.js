"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const hrModel_1 = __importDefault(require("../../models/hrModel/hrModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email.includes('@oasis.com')) {
            return response.status(400).json({
                message: "Invalid work email, use your work email please"
            });
        }
        if (!email || !password) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }
        const findAdmin = await hrModel_1.default.findOne({ workEmail: email });
        const findEmployee = await employeeModel_1.default.findOne({ workEmail: email });
        if (!findAdmin && !findEmployee) {
            return response.status(400).json({
                message: `${email} does not exist`
            });
        }
        if (findAdmin) {
            const validatePassword = await bcryptjs_1.default.compare(password, findAdmin.password);
            if (!validatePassword) {
                return response.status(401).send({
                    message: "Password is Incorect"
                });
            }
            const tokenData = {
                _id: findAdmin._id,
                email: findAdmin.email,
            };
            const token = await (0, helpersFunctions_1.tokenGenerator)(tokenData);
            return response.status(200).json({
                status: "success",
                message: "Login Successful",
                user: {
                    firstName: findAdmin.firstName,
                    lastName: findAdmin.lastName,
                    email: findAdmin.email,
                    phone: findAdmin.phone,
                    designation: findAdmin.designation,
                    isManager: findAdmin.isManager
                },
                token,
            });
        }
        if (findEmployee) {
            const validatePassword = await bcryptjs_1.default.compare(password, findEmployee.password);
            if (!validatePassword) {
                return response.status(401).send({
                    message: "Password is Incorect"
                });
            }
            const tokenData = {
                _id: findEmployee._id,
                email: findEmployee.email,
            };
            const token = await (0, helpersFunctions_1.tokenGenerator)(tokenData);
            return response.status(200).json({
                status: "success",
                message: "Login Successful",
                user: findEmployee,
                token,
            });
        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.login = login;
