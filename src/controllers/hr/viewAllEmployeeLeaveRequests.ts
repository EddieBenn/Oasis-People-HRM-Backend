import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Leave from "../../models/leaveModel/leave";

export const allEmployeeLeaveRequests = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const employeeId = request.params.id;

    const employeeLeaveHistory = await Leave.find({ userId: employeeId });

    if (employeeLeaveHistory.length < 1) {
      return response.status(404).json({
        message: "Employee has not requested for any leave yet",
      });
    }

    return response.status(200).json({
      message: "Employee Leave History Fetched",
      employeeLeaveHistory,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
