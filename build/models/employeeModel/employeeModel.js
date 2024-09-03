"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const EmployeeSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    image: {
        type: String,
    },
    lastName: {
        type: String,
    },
    officeLocation: {
        type: String,
    },
    password: {
        type: String,
    },
    slackId: {
        type: String,
    },
    twitterId: {
        type: String,
    },
    skypeId: {
        type: String,
    },
    githubId: {
        type: String,
    },
    employeeId: {
        type: String,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    workEmail: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    maritalStatus: {
        type: String,
    },
    nationality: {
        type: String,
    },
    homeAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    district: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    employeeType: {
        type: String,
    },
    contractType: {
        type: String,
    },
    workingDays: {
        type: [String],
    },
    hireDate: {
        type: Date,
    },
    bankBranch: {
        type: String,
    },
    bankAccountNumber: {
        type: String,
    },
    accountName: {
        type: String,
    },
    isManager: {
        type: Boolean,
        default: false
    },
    leaveDaysGiven: {
        type: Number,
    },
    usedLeaveDays: {
        type: Number,
    },
    totalDaysLeft: {
        type: Number,
    },
}, {
    timestamps: true,
});
const Employee = mongoose_1.default.model('Employee', EmployeeSchema);
exports.default = Employee;
