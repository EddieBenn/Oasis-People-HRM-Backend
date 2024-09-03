import mongoose, { Schema } from "mongoose";

export interface IAttendance {
  _id: string;
  date: Date;
  employeeId: string;
  clockInTime: Date;
  clockOutTime: Date;
  clockInStatus: string;
  clockOutStatus: string;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    date: {
      type: Date,
    },
    employeeId: {
      type: String,
    },
    clockInTime: {
      type: Date,
    },
    clockOutTime: {
      type: Date,
      required: false,
    },
    clockInStatus: {
        type: String,
    },
    clockOutStatus: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema)

export default Attendance
