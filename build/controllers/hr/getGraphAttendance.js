"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphAttendance = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const moment_1 = __importDefault(require("moment"));
const graphAttendance = async (request, response) => {
    try {
        const today = (0, moment_1.default)();
        const dayOfWeek = today.isoWeekday();
        let startOfWeek;
        let endOfWeek;
        if (dayOfWeek > 5) {
            // Weekend, fetch previous week's data
            startOfWeek = today.clone().subtract(1, 'weeks').startOf('isoWeek').isoWeekday(1);
            endOfWeek = startOfWeek.clone().add(4, 'days');
        }
        else {
            // Weekday, fetch current week's data up to today
            startOfWeek = today.clone().startOf('isoWeek').isoWeekday(1);
            endOfWeek = today.clone();
        }
        const attendanceData = await attendance_1.default.find({
            date: {
                $gte: startOfWeek.toDate(),
                $lte: endOfWeek.toDate()
            }
        });
        const result = attendanceData.reduce((acc, item) => {
            const day = (0, moment_1.default)(item.date).format('dddd'); // Get the day name
            if (!acc[day]) {
                acc[day] = {
                    late_comers: 0,
                    early_comers: 0
                };
            }
            const clockInTime = (0, moment_1.default)(item.clockInTime);
            const expectedClockInTime = (0, moment_1.default)(item.date).hour(9).minute(0).second(0); // Assuming 9:00 AM is the expected clock-in time
            if (clockInTime.isBefore(expectedClockInTime)) {
                acc[day].early_comers++;
            }
            else {
                acc[day].late_comers++;
            }
            return acc;
        }, {});
        // Ensure all days of the week are present in the result
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        daysOfWeek.forEach(day => {
            if (!result[day]) {
                result[day] = {
                    late_comers: 0,
                    early_comers: 0
                };
            }
        });
        let attendanceExtractor = Object.values(result);
        const lateComersArray = [];
        const earlyComersArray = [];
        attendanceExtractor.forEach(record => {
            lateComersArray.push(record.late_comers);
            earlyComersArray.push(record.early_comers);
        });
        let earlyNum = earlyComersArray.reduce((a, b) => a + b, 0);
        let lateNum = lateComersArray.reduce((a, b) => a + b, 0);
        return response.status(200).json({
            message: 'Graph Attendance data',
            lateComersArray,
            earlyComersArray,
            earlyNum,
            lateNum
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
};
exports.graphAttendance = graphAttendance;
