"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrAuthoriser = exports.employeeAuthoriser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employeeModel_1 = __importDefault(require("../models/employeeModel/employeeModel"));
const hrModel_1 = __importDefault(require("../models/hrModel/hrModel"));
const employeeAuthoriser = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const employee = await employeeModel_1.default.findOne({ _id: decode._id });
        if (employee === null) {
            return response.status(400).json({
                status: `error`,
                message: `Login again`
            });
        }
        if (employee.isManager) {
            return response.status(400).json({
                status: `error`,
                message: `You are not allowed to access this resource. Only Employees`
            });
        }
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired' || error.message === 'invalid signature') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.employeeAuthoriser = employeeAuthoriser;
const hrAuthoriser = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const admin = await hrModel_1.default.findOne({ _id: decode._id });
        if (admin === null) {
            return response.status(400).json({
                status: `error`,
                message: `Login again`
            });
        }
        if (!admin.isManager) {
            return response.status(400).json({
                status: `error`,
                message: `You are not allowed to access this resource. Contact the admin`
            });
        }
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired' || error.message === 'invalid signature') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.hrAuthoriser = hrAuthoriser;
