import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Leave, { ILeave } from "../../models/leaveModel/leave";
import Employee from "../../models/employeeModel/employeeModel";

export const processEmployeeLeave = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const { approvalStatus } = request.body;

    if (!approvalStatus || approvalStatus === "") {
      return response.status(400).json({
        message: "A Response is required",
      });
    }

    const leaveId = request.params.id;

    const leave = await Leave.findOne({ _id: leaveId });

    if (!leave) {
      return response.status(404).json({
        message: "Leave not found",
      });
    }

    if(leave.status === "Approved" || leave.status === "Rejected") {
      return response.status(400).json({
        message: "Leave has already been processed",
      });
    }
    
    if (approvalStatus === "Approved") {
      await Employee.findOneAndUpdate(
        { _id: leave.userId },
        { usedLeaveDays: leave.daysUsed, totalDaysLeft: leave.daysLeft }
      );
    }

    const test = await Employee.findOne({ _id: leave.userId });
    await Leave.findOneAndUpdate({ _id: leaveId }, { status: approvalStatus });

    const newLeave: ILeave = (await Leave.findOne({
      _id: leaveId,
    })) as unknown as ILeave;

    if (newLeave.status !== approvalStatus) {
      return response.status(400).json({
        message: "Leave not processed",
      });
    }

    return response.status(200).json({
      message: "Leave Processed",
      newLeave,
      test
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
