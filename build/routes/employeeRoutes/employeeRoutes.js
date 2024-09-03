"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middlewares/authorization");
const employeeClockIn_1 = require("../../controllers/employees/employeeClockIn");
const employeeClockout_1 = require("../../controllers/employees/employeeClockout");
const employeeRequestLeave_1 = require("../../controllers/employees/employeeRequestLeave");
const viewLeave_1 = require("../../controllers/employees/viewLeave");
const viewLeaveHistory_1 = require("../../controllers/employees/viewLeaveHistory");
const viewPersonalAttendance_1 = require("../../controllers/employees/viewPersonalAttendance");
const viewProfile_1 = require("../../controllers/employees/viewProfile");
const router = express_1.default.Router();
router.post('/clock-in', authorization_1.employeeAuthoriser, employeeClockIn_1.employeeClockIn);
router.put('/clock-out', authorization_1.employeeAuthoriser, employeeClockout_1.employeeClockout);
router.post('/request-leave', authorization_1.employeeAuthoriser, employeeRequestLeave_1.employeeRequestLeave);
router.get('/view-leave/:id', authorization_1.employeeAuthoriser, viewLeave_1.viewSingleLeave);
router.get('/view-leave-history', authorization_1.employeeAuthoriser, viewLeaveHistory_1.viewLeaveHistory);
router.get('/view-attendance', authorization_1.employeeAuthoriser, viewPersonalAttendance_1.viewPersonalAttendanceRecord);
router.get('/view-profile', authorization_1.employeeAuthoriser, viewProfile_1.viewProfile);
exports.default = router;
