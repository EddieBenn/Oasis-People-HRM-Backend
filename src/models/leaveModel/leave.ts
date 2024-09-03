import mongoose, { Schema } from "mongoose";

export interface ILeave {
  _id: string;
  userId: string;
  requestDate: Date;
  startDate: Date;
  reason: string;
  endDate: Date;
  status: string;
  totalDays: number;
  daysUsed: number;
  daysLeft: number;
  HrId: string
}

const LeaveSchema = new Schema<ILeave>(
  {
    userId: {
      type: String,
    },
    requestDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
        type: String,
    },
    reason: {
      type: String,
  },
    totalDays: {
        type: Number,
    },
    daysUsed: {
        type: Number,
    },
    daysLeft: {
        type: Number,
    },
    HrId: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model<ILeave>('Leave', LeaveSchema)

export default Leave
