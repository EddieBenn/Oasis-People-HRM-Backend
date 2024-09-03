"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegister = void 0;
const hrModel_1 = __importDefault(require("../../models/hrModel/hrModel"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const emailNotification_1 = require("../../utilities/emailNotification");
const adminRegister = async (request, response) => {
    try {
        const { firstName, lastName, email, phone } = request.body;
        if (!firstName || !lastName || !email || !phone) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }
        const findAdmin = await hrModel_1.default.findOne({ email });
        if (findAdmin) {
            return response.status(400).json({
                message: "HR already exists"
            });
        }
        const newPassword = (0, helpersFunctions_1.generatePassword)(lastName);
        const hashedPassword = await (0, helpersFunctions_1.hashPassword)(newPassword);
        const employeeWorkEmail = (0, helpersFunctions_1.generateWorkEmail)(request.body.firstName, request.body.lastName);
        await hrModel_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            workEmail: employeeWorkEmail,
            password: hashedPassword,
            isManager: true,
            designation: "HR"
        });
        const checkAdmin = await hrModel_1.default.findOne({ email });
        if (!checkAdmin) {
            return response.status(400).json({
                message: "Unable to create, try again later"
            });
        }
        await (0, emailNotification_1.sendMail)(email, newPassword, employeeWorkEmail);
        return response.status(200).json({
            message: "Admin Registered",
            admin: {
                firstName: checkAdmin.firstName,
                lastName: checkAdmin.lastName,
                email: checkAdmin.email,
                workEmail: checkAdmin.workEmail,
                phone: checkAdmin.phone,
                designation: checkAdmin.designation
            }
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.adminRegister = adminRegister;
