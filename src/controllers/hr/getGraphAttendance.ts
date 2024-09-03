import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Attendance from '../../models/attendanceModel/attendance';
import moment from 'moment';


export const graphAttendance = async (request: JwtPayload, response: Response) => {
  try {
      const today = moment();
      const dayOfWeek = today.isoWeekday();

      let startOfWeek: moment.Moment;
      let endOfWeek: moment.Moment;

      if (dayOfWeek > 5) {
          // Weekend, fetch previous week's data
          startOfWeek = today.clone().subtract(1, 'weeks').startOf('isoWeek').isoWeekday(1);
          endOfWeek = startOfWeek.clone().add(4, 'days');
      } else {
          // Weekday, fetch current week's data up to today
          startOfWeek = today.clone().startOf('isoWeek').isoWeekday(1);
          endOfWeek = today.clone();
      }

      const attendanceData = await Attendance.find({
          date: {
              $gte: startOfWeek.toDate(),
              $lte: endOfWeek.toDate()
          }
      });

      const result = attendanceData.reduce((acc: Record<string, { late_comers: number; early_comers: number }>, item) => {
          const day = moment(item.date).format('dddd'); // Get the day name
          if (!acc[day]) {
              acc[day] = {
                  late_comers: 0,
                  early_comers: 0
              };
          }

          const clockInTime = moment(item.clockInTime);
          const expectedClockInTime = moment(item.date).hour(9).minute(0).second(0); // Assuming 9:00 AM is the expected clock-in time

          if (clockInTime.isBefore(expectedClockInTime)) {
              acc[day].early_comers++;
          } else {
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

      const lateComersArray: number[] = [];
      const earlyComersArray: number[] = [];

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
  } catch (error: any) {
      response.status(500).json({ message: error.message });
  }
};